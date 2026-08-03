import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/admin/auth";
import { readMedia } from "@/lib/admin/storage";

const filenameSchema = z.string().regex(/^\d{13}-[a-z0-9]{6}\.(jpg|png|webp|avif)$/);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { filename } = await params;
  const parsed = filenameSchema.safeParse(filename);
  if (!parsed.success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  try {
    const media = await readMedia(parsed.data);
    if (!media) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return new NextResponse(new Uint8Array(media.data), {
      headers: {
        "Content-Type": media.mimeType,
        "Cache-Control": "private, no-store",
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
