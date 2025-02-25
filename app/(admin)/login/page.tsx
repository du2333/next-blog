import { LoginForm } from "@/components/LoginForm";
import { logout } from "@/lib/auth";

export default async function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
      <button
        className="btn btn-error"
        onClick={async () => {
          "use server";
          await logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
