import { ChartPie, FileText, LogOut } from "lucide-react";
import Link from "next/link";

export default function NavPanel() {
  return (
    <ul className="menu menu-xl bg-base-200 rounded-box w-full h-full pt-8 flex flex-col">
      <li>
        <Link href="/admin" className="menu-active">
          <ChartPie className="w-5 h-5" />
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/admin/posts">
          <FileText className="w-5 h-5" />
          Posts
        </Link>
      </li>
      <li className="mt-auto">
        <a>
          <LogOut className="w-5 h-5" />
          Logout
        </a>
      </li>
    </ul>
  );
}
