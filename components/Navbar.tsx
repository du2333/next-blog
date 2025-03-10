import Link from "next/link";
import { SearchIcon, MountainIcon, MenuIcon } from "lucide-react";
import { ThemeController } from "./theme-controller";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container mx-auto flex justify-between items-center max-w-6xl px-4 md:px-6 h-16">
        <Link href="/" className="flex items-center gap-2">
          <MountainIcon className="size-6" />
          <span className="sr-only">Blog</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            Link 1
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-primary">
            Link 2
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-primary">
            Link 3
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/search">
              <SearchIcon className="size-5" />
            </Link>
          </Button>
          <ThemeController />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden cursor-pointer"
              >
                <MenuIcon className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link href="/">Link 1</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/">Link 2</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/">Link 3</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
