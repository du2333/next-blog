import LogOutButton from "@/components/auth/LogOutButton";
import { getCurrentUser } from "@/lib/currentUser";
import ToggleButton from "@/components/auth/ToggleButton";

export default async function AdminPage() {
  const user = await getCurrentUser({ redirectIfNotFound: false });

  return (
    <section className="w-full h-screen">
      <div className="flex justify-between items-center">
        {user && (
          <h2 className="text-base-content text-lg">
            Welcome, {user.id} and {user.role}
          </h2>
        )}
        <ToggleButton />
        <LogOutButton />
      </div>
    </section>
  );
}
