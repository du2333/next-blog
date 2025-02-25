import Link from "next/link";
import { Search } from "lucide-react";
import ThemeController from "./ThemeController";

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 text-base-content">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Blog
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <ThemeController />
          </li>
          <li>
            <Link href="/search">
              <Search className="w-8 h-8" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
