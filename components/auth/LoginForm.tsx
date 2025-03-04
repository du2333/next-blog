"use client";

import { login } from "@/lib/auth";
import { startTransition, useActionState } from "react";
import { User, KeyRound } from "lucide-react";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => action(new FormData(e.currentTarget)));
      }}
      className="flex flex-col gap-4"
    >
      <label className="floating-label input">
        <span>Email</span>
        <User className="w-4 h-4" />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@doe.com"
        />
      </label>
      {state?.errors?.email && (
        <p className="text-error">{state.errors.email}</p>
      )}
      <label className="floating-label input">
        <span>Password</span>
        <KeyRound className="w-4 h-4" />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
      </label>
      {state?.errors?.password && (
        <p className="text-error">Password Must: {state.errors.password}</p>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
