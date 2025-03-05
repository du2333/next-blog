import { LayoutDashboard, FileText, LogOut } from "lucide-react";
import Link from "next/link";

export default function NavPanel() {
  return (
    <ul className="menu bg-base-200 rounded-box w-16 md:w-56 h-full flex flex-col">
      <li>
        <Link href="/admin" className="menu-active p-4">
          <LayoutDashboard className="w-5 h-5" />
          <span className="hidden md:inline">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link href="/admin/posts" className="p-4">
          <FileText className="w-5 h-5" />
          <span className="hidden md:inline">Posts</span>
        </Link>
      </li>
      <li className="mt-auto">
        <a>
          <LogOut className="w-5 h-5" />
          <span className="hidden md:inline">Logout</span>
        </a>
      </li>
    </ul>
  );
}
