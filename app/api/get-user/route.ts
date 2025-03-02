import { getUserFromSession } from "@/lib/session";
import { NextResponse, NextRequest } from "next/server";

// 由于middleware是属于edge runtime, 所以不能直接调用getUserFromSession. 所以我需要创建一个api来获取用户信息
export async function GET(request: NextRequest) {
  const user = await getUserFromSession(request.cookies);
  return NextResponse.json(user);
}
