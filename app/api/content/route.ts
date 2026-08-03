import { NextResponse } from "next/server";
import {
  getDraft,
  updateSection,
  toggleSectionVisibility,
  reorderSections,
  publishCurrent,
} from "@/lib/admin/content";
import { getSession } from "@/lib/admin/auth";
import { z } from "zod";
import {
  containsUnsafeObjectKeys,
  rejectUntrustedRequest,
  safeErrorResponse,
} from "@/lib/security";

const identifier = z.string().regex(/^[a-zA-Z0-9_-]{1,100}$/);
const contentSchema = z
  .object({
    action: z.enum(["updateSection", "toggleVisibility", "reorder", "publish"]),
    content: z.record(z.string().max(100), z.unknown()).optional(),
    orderedIds: z.array(identifier).max(100).optional(),
    page: identifier.optional(),
    sectionId: identifier.optional(),
  })
  .strict();

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const draft = await getDraft();
  return NextResponse.json(draft);
}

export async function PATCH(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = contentSchema.parse(await request.json());
    if (containsUnsafeObjectKeys(body.content)) {
      return NextResponse.json({ error: "Invalid content update." }, { status: 400 });
    }
    const { action, page, sectionId, content, orderedIds } = body;

    switch (action) {
      case "updateSection":
        if (!page || !sectionId || !content)
          return NextResponse.json({ error: "Invalid content update." }, { status: 400 });
        return NextResponse.json(await updateSection(page as never, sectionId, content));
      case "toggleVisibility":
        if (!page || !sectionId)
          return NextResponse.json({ error: "Invalid content update." }, { status: 400 });
        return NextResponse.json(await toggleSectionVisibility(page as never, sectionId));
      case "reorder":
        if (!page || !orderedIds)
          return NextResponse.json({ error: "Invalid content update." }, { status: 400 });
        return NextResponse.json(await reorderSections(page as never, orderedIds));
      case "publish":
        return NextResponse.json(await publishCurrent());
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: "Invalid content update." }, { status: 400 });
    return safeErrorResponse();
  }
}
