import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";
import { updateSubmissionStatus } from "@/lib/admin/quoteStorage";
import { z } from "zod";
import { rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";

const statusSchema = z
  .object({ status: z.enum(["new", "contacted", "accepted", "rejected"]) })
  .strict();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    if (!/^Q\d{10,20}$/.test(id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const body = statusSchema.parse(await request.json());
    const updated = await updateSubmissionStatus(id, body.status);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: "Invalid submission update." }, { status: 400 });
    return safeErrorResponse();
  }
}
