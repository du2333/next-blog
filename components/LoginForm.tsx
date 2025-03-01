"use client";

import { login } from "@/lib/auth";
import { useActionState } from "react";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="floating-label">
        <span>Email</span>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@doe.com"
          className="input input-md"
        />
      </label>
      {state?.errors?.email && (
        <p className="text-error">{state.errors.email}</p>
      )}
      <label className="floating-label">
        <span>Password</span>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="input input-md"
        />
      </label>
      {state?.errors?.password && (
        <p className="text-error">Password Must: {state.errors.password}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary text-base-content"
      >
        Login
      </button>
    </form>
  );
}
