import { z } from "zod";
import { Role } from "@prisma/client";
import redis from "./redis";

const SESSION_DURATION_IN_SECONDS = 60 * 60;
const SESSION_COOKIE_KEY = "session-id";

export const sessionSchema = z.object({
  id: z.string(),
  role: z.nativeEnum(Role),
});

type UserSession = z.infer<typeof sessionSchema>;
export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = crypto.randomUUID();
  await redis.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_DURATION_IN_SECONDS,
  });

  setCookie(sessionId, cookies);
}

export async function updateSessionDb(user: UserSession, cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(SESSION_COOKIE_KEY)?.value;
  if (!sessionId) return;
  await redis.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_DURATION_IN_SECONDS,
  });
}

export async function updateSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">
) {
  const sessionId = cookies.get(SESSION_COOKIE_KEY)?.value;
  if (!sessionId) return null;

  const user = await getUserSessionById(sessionId);

  if (!user) return null;

  await redis.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_DURATION_IN_SECONDS,
  });

  setCookie(sessionId, cookies);
}

export async function deleteSession(cookies: Pick<Cookies, "get" | "delete">) {
  const sessionId = cookies.get(SESSION_COOKIE_KEY)?.value;
  if (!sessionId) return;

  await redis.del(`session:${sessionId}`);
  cookies.delete(SESSION_COOKIE_KEY);
}

export async function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(SESSION_COOKIE_KEY)?.value;
  if (!sessionId) return null;
  return getUserSessionById(sessionId);
}

async function getUserSessionById(sessionId: string) {
  const rawUser = await redis.get(`session:${sessionId}`);

  const { success, data: user } = sessionSchema.safeParse(rawUser);
  return success ? user : null;
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(SESSION_COOKIE_KEY, sessionId, {
    httpOnly: true,
    secure: true,
    expires: Date.now() + SESSION_DURATION_IN_SECONDS * 1000,
    sameSite: "lax",
  });
}
