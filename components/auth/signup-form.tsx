"use client";

import { signup } from "@/lib/auth";
import { useActionState } from "react";

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

// export function SignupForm() {
//   const [state, action, pending] = useActionState(signup, undefined);

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
//         <Mail className="w-4 h-4" />
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
//         <div>
//           <p className="text-error">Password must:</p>
//           <ul>
//             {state.errors.password.map((error) => (
//               <li key={error} className="text-error">
//                 {error}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <button
//         type="submit"
//         disabled={pending}
//         className="btn btn-primary"
//       >
//         Sign Up
//       </button>
//     </form>
//   );
// }

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Create an account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="grid gap-4">
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
              {state?.errors?.password && (
                <div>
                  <p className="text-destructive">Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li key={error} className="text-destructive">
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Button type="submit" disabled={pending} className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
