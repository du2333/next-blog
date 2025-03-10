"use client";

import { logout } from "@/lib/auth";

export default function LogOutButton() {
  return (
    <button
      onClick={async () => {
        await logout();
      }}
      className="btn btn-error"
    >
      Logout
    </button>
  );
}
