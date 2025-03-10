"use server";

import { SignupFormSchema, FormState, LoginFormSchema } from "@/lib/schema";
import { createUserSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { comparePassword, hashPassword } from "./passwordHasher";
import { cookies } from "next/headers";

export async function signup(state: FormState, formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = SignupFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      input: rawData,
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
      input: rawData,
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
        input: rawData,
      };
    }
    await createUserSession(user, await cookies());
  } catch {
    return {
      errors: { email: ["Failed to create user"] },
      input: rawData,
    };
  }

  redirect("/admin");
}

export async function login(state: FormState, formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = LoginFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      input: rawData,
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
      input: rawData,
    };
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return {
      errors: { email: ["Invalid email or password"] },
      input: rawData,
    };
  }

  await createUserSession(user, await cookies());

  redirect("/admin");
}

export async function logout() {
  await deleteSession(await cookies());
  redirect("/login");
}
