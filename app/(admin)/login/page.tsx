import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <LoginForm />
    </div>
  );
}
