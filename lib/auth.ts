"use server";

import { SignupFormSchema, FormState, LoginFormSchema } from "@/lib/schema";
import { createUserSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { comparePassword, hashPassword } from "./passwordHasher";
import { cookies } from "next/headers";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      errors: { email: ["Email already in use"] },
    };
  }
  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return {
        errors: { email: ["Failed to create user"] },
      };
    }
    await createUserSession(user, await cookies());
  } catch {
    return {
      errors: { email: ["Failed to create user"] },
    };
  }

  redirect("/admin");
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return {
      errors: { email: ["Invalid email or password"] },
    };
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return {
      errors: { email: ["Invalid email or password"] },
    };
  }

  await createUserSession(user, await cookies());

  redirect("/admin");
}

export async function logout() {
  await deleteSession(await cookies());
  redirect("/login");
}
