"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const pathLabels: Record<string, string> = {
  admin: "Dashboard",
  posts: "Posts",
  new: "New Post",
  edit: "Edit Post",
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];
    let accumulatedPath = "";

    for (const [index, path] of paths.entries()) {
      accumulatedPath += `/${path}`;
      const label = pathLabels[path] || path.replace(/-/g, " ");

      breadcrumbs.push({
        href: accumulatedPath,
        label:
          index === 0 ? label : label.charAt(0).toUpperCase() + label.slice(1),
      });
    }

    return breadcrumbs;
  };

  const dynamicBreadcrumbs = generateBreadcrumbs();

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {dynamicBreadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href}>
            {index === dynamicBreadcrumbs.length - 1 ? (
              <span>{breadcrumb.label}</span>
            ) : (
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
