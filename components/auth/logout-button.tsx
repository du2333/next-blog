"use client";

import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function LogOutButton() {
  return (
    <Button
      onClick={async () => {
        await logout();
      }}
      variant="destructive"
      className="cursor-pointer"
    >
      Logout
    </Button>
  );
}
