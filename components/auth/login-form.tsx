"use client";

// import { login } from "@/lib/auth";
// import { startTransition, useActionState } from "react";
// import { User, KeyRound } from "lucide-react";

// export function LoginForm() {
//   const [state, action, pending] = useActionState(login, undefined);

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         startTransition(() => action(new FormData(e.currentTarget)));
//       }}
//       className="flex flex-col gap-4"
//     >
//       <label className="floating-label input">
//         <span>Email</span>
//         <User className="w-4 h-4" />
//         <input
//           id="email"
//           name="email"
//           type="email"
//           placeholder="john@doe.com"
//         />
//       </label>
//       {state?.errors?.email && (
//         <p className="text-error">{state.errors.email}</p>
//       )}
//       <label className="floating-label input">
//         <span>Password</span>
//         <KeyRound className="w-4 h-4" />
//         <input
//           id="password"
//           name="password"
//           type="password"
//           placeholder="Password"
//         />
//       </label>
//       {state?.errors?.password && (
//         <p className="text-error">Password Must: {state.errors.password}</p>
//       )}
//       <button type="submit" disabled={pending} className="btn btn-primary">
//         Login
//       </button>
//     </form>
//   );
// }

import { login } from "@/lib/auth";
import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Login to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                defaultValue={state?.input?.email}
              />
              {state?.errors?.email && (
                <p className="text-destructive">{state.errors.email}</p>
              )}
              {state?.errors?.password && (
                <p className="text-destructive">{state.errors.password}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                required
                defaultValue={state?.input?.password}
              />
            </div>
            <Button type="submit" disabled={pending} className="w-full">
              Login
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
