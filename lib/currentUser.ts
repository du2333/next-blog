import { cache } from "react";
import { getUserFromSession } from "./session";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;
type User = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>;

function _getCurrentUser(options: {
  withFullUser: true
  redirectIfNotFound: true
}): Promise<FullUser>
function _getCurrentUser(options: {
  withFullUser: true
  redirectIfNotFound: false
}): Promise<FullUser | null>
function _getCurrentUser(options: {
  withFullUser?: false
  redirectIfNotFound: true
}): Promise<User>
function _getCurrentUser(options: {
  withFullUser?: false
  redirectIfNotFound: false
}): Promise<User | null>
async function _getCurrentUser({
  // options参数默认值
  withFullUser = false,
  redirectIfNotFound = false,
} = {}) {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    // 当redirectIfNotFound为false时，可能的使用场景：如用户头像框显示登录按钮如果用户未登录，但页面不需要跳转到登录页
    if (redirectIfNotFound) return redirect("/login");
    return null;
  }

  if (withFullUser) {
    const fullUser = await getUserFromDb(user.id);
    // This should never happen
    if (fullUser == null) throw new Error("User not found in database");
    return fullUser;
  }

  return user;
}

export const getCurrentUser = cache(_getCurrentUser);


function getUserFromDb(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}
