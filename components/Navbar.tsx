import Link from "next/link";
import { Search } from "lucide-react";
import ThemeController from "./ThemeController";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-200 text-base-content border-b border-base-300 shadow-sm">
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
              <Search />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
