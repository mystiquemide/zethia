"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, LayoutDashboard, Play, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/demo", label: "Demo", icon: Play },
  { href: "/proof", label: "Proof", icon: FileCheck },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold text-white tracking-tight group"
        >
          <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-violet-600 to-violet-500 shadow-lg shadow-violet-500/25">
            <Shield className="size-4 text-white" />
          </div>
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Zethia
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-violet-600/15 text-violet-300 shadow-[inset_0_1px_0_0_rgba(124,58,237,0.2)]"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                )}
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
