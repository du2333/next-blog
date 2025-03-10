"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, House } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/posts",
    label: "Posts",
    icon: FileText,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <li>
        <Link href="/" className="p-4">
          <House className="w-5 h-5" />
          <span className="hidden md:inline">Home</span>
        </Link>
      </li>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive =
          link.href === "/admin"
            ? pathname === link.href
            : pathname.startsWith(link.href);

        return (
          <li key={link.label}>
            <Link
              href={link.href}
              className={cn("p-4", { "menu-active": isActive })}
            >
              <LinkIcon className="w-5 h-5" />
              <span className="hidden md:inline">{link.label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
}
