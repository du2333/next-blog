"use server";

import "server-only";
import { cache } from "react";
import { verifySession } from "@/lib/session";
import { fakeDatabase } from "@/lib/auth";

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  const userId = session.userId;

  return fakeDatabase.users.find((user) => user.id === userId);
});
