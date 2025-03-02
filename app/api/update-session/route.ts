import { updateSessionExpiration } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await updateSessionExpiration(
    request.cookies
  );

  return NextResponse.json(session);
}
