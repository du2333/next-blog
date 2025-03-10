"use client";

import { signup } from "@/lib/auth";
import { useActionState, startTransition } from "react";
import { Mail, KeyRound } from "lucide-react";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

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
        <Mail className="w-4 h-4" />
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
        <div>
          <p className="text-error">Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error} className="text-error">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary"
      >
        Sign Up
      </button>
    </form>
  );
}
