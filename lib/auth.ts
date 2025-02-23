import { SignupFormSchema, FormState, LoginFormSchema } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

// TODO: move to database
export const fakeDatabase = {
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "john@doe.com",
      password: "12345678",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane@doe.com",
      password: "12345678",
    },
    {
      id: "3",
      name: "John Smith",
      email: "john@smith.com",
      password: "12345678",
    },
  ],
};

// TODO: move to database
export async function createUser(
  name: string,
  email: string,
  password: string
) {
  fakeDatabase.users.push({
    id: (fakeDatabase.users.length + 1).toString(),
    name,
    email,
    password,
  });
  return fakeDatabase.users[fakeDatabase.users.length - 1];
}

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  // TODO: hash password

  // insert into database
  const user = await createUser(name, email, password);

  // create session
  await createSession(user.id);

  // redirect user
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

  // TODO: hash password

  // find user in database
  const user = fakeDatabase.users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return {
      errors: { email: ["Invalid email or password"] },
    };
  }

  // create session
  await createSession(user.id);

  // redirect user
  redirect("/admin");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
