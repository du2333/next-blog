import { cache } from "react";
import { getCookieFromSession } from "./session";

export const getCurrentUser = cache(async () => {
  return await getCookieFromSession();
});
