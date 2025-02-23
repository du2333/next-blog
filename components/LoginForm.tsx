"use client";

import { login } from "@/lib/auth";
import { useActionState } from "react";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
      {state?.errors?.password && <p>{state.errors.password}</p>}
      <button type="submit" disabled={pending}>
        Login
      </button>
    </form>
  );
}
