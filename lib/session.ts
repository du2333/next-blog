import { cookies } from "next/headers";
import { z } from "zod";
import { Role } from "@prisma/client";
import prisma from "./prisma";

const SESSION_DURATION_IN_SECONDS = 10;

export const sessionSchema = z.object({
  id: z.string(),
  role: z.nativeEnum(Role),
});

type UserSession = z.infer<typeof sessionSchema>;

export async function createUserSession(user: UserSession) {
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + SESSION_DURATION_IN_SECONDS * 1000),
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("session-id", session.id, {
    httpOnly: true,
    secure: true,
    expires: session.expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session-id")?.value;
  if (!sessionId) return;
  await prisma.session.delete({
    where: { id: sessionId },
  });
  cookieStore.delete("session-id");
}

export async function getCookieFromSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session-id")?.value;
  if (!sessionId) return null;
  return getUserSessionById(sessionId);
}

async function getUserSessionById(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });
  if (!session) return null;

  const rawUser = session.user;

  const { success, data: user } = sessionSchema.safeParse(rawUser);
  return success ? user : null;
}
