import { LogOut } from "lucide-react";
import NavLinks from "./nav-links";

export default function NavPanel() {
  return (
    <ul className="menu bg-base-200 rounded-box w-16 md:w-56 h-full flex flex-col">
      <NavLinks />
      <li className="mt-auto">
        <a className="p-4">
          <LogOut className="w-5 h-5" />
          <span className="hidden md:inline">Logout</span>
        </a>
      </li>
    </ul>
  );
}
