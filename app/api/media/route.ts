import { NextResponse } from "next/server";
import { z } from "zod";
import sharp from "sharp";
import { getSession } from "@/lib/admin/auth";
import { enforceRateLimit, rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";
import { deleteMedia, getMediaList, saveMedia } from "@/lib/admin/storage";

const ALLOWED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);
const MAX_SIZE = 3 * 1024 * 1024;
const MAX_PIXELS = 25_000_000;
const MAX_DIMENSION = 8_000;
const filenameSchema = z
  .object({ filename: z.string().regex(/^\d{13}-[a-z0-9]{6}\.(jpg|png|webp|avif)$/) })
  .strict();

function hasExpectedFileSignature(buffer: Buffer, mimeType: string) {
  if (mimeType === "image/jpeg")
    return buffer.length >= 3 && buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]));
  if (mimeType === "image/png")
    return (
      buffer.length >= 8 &&
      buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    );
  if (mimeType === "image/webp")
    return (
      buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  return buffer.length >= 12 && buffer.subarray(4, 12).toString("ascii").includes("ftyp");
}

async function sanitizeImage(buffer: Buffer, mimeType: string) {
  const input = sharp(buffer, {
    failOn: "warning",
    limitInputPixels: MAX_PIXELS,
    sequentialRead: true,
  });
  const metadata = await input.metadata();
  const expectedFormat = mimeType === "image/avif" ? "heif" : mimeType.split("/")[1];
  if (
    metadata.format !== expectedFormat ||
    !metadata.width ||
    !metadata.height ||
    metadata.width > MAX_DIMENSION ||
    metadata.height > MAX_DIMENSION ||
    metadata.width * metadata.height > MAX_PIXELS
  ) {
    throw new Error("Unsafe image dimensions or format.");
  }

  const normalized = sharp(buffer, {
    failOn: "warning",
    limitInputPixels: MAX_PIXELS,
    sequentialRead: true,
  }).rotate();
  const output =
    mimeType === "image/jpeg"
      ? await normalized.jpeg({ mozjpeg: true, quality: 88 }).toBuffer()
      : mimeType === "image/png"
        ? await normalized.png({ compressionLevel: 9 }).toBuffer()
        : mimeType === "image/webp"
          ? await normalized.webp({ quality: 88 }).toBuffer()
          : await normalized.avif({ effort: 4, quality: 60 }).toBuffer();

  if (output.length === 0 || output.length > MAX_SIZE) {
    throw new Error("Sanitized image is too large.");
  }
  return output;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    return NextResponse.json(await getMediaList());
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rateLimitError = await enforceRateLimit(request, {
    limit: 20,
    name: "admin-media-upload",
    windowMs: 10 * 60_000,
  });
  if (rateLimitError) return rateLimitError;

  try {
    const contentLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_SIZE + 64 * 1_024) {
      return NextResponse.json({ error: "File too large (max 3MB)" }, { status: 413 });
    }
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const extension = ALLOWED_TYPES.get(file.type);
    if (!extension) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 3MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!hasExpectedFileSignature(buffer, file.type)) {
      return NextResponse.json({ error: "Invalid image content" }, { status: 400 });
    }
    let sanitizedBuffer: Buffer;
    try {
      sanitizedBuffer = await sanitizeImage(buffer, file.type);
    } catch {
      return NextResponse.json({ error: "Invalid or unsafe image content" }, { status: 400 });
    }
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
    await saveMedia(filename, file.type, sanitizedBuffer);

    return NextResponse.json({ url: `/api/media/file/${filename}`, filename });
  } catch {
    return safeErrorResponse(500, "Upload failed.");
  }
}

export async function DELETE(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { filename } = filenameSchema.parse(await request.json());
    await deleteMedia(filename);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: "Invalid filename." }, { status: 400 });
    return safeErrorResponse(500, "Delete failed.");
  }
}
