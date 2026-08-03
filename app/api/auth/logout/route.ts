import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/admin/auth";
import { rejectUntrustedRequest } from "@/lib/security";

export async function POST(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
