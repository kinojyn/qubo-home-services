import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";
import { getVersions, restoreVersion } from "@/lib/admin/content";
import { z } from "zod";
import { rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const versions = await getVersions();
    return NextResponse.json(versions);
  } catch {
    return safeErrorResponse();
  }
}

export async function POST(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = z
      .object({ id: z.string().regex(/^v\d{10,20}$/) })
      .strict()
      .parse(await request.json());
    const draft = await restoreVersion(id);
    return NextResponse.json(draft);
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: "Invalid version ID." }, { status: 400 });
    return safeErrorResponse();
  }
}
