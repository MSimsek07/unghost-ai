
"use client";
import Link from "next/link";
import { Gem, Home, PlusSquare, User, Settings, Briefcase } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard", label: "Başvurularım", icon: Briefcase },
  { href: "/dashboard/applications/new", label: "Yeni Başvuru", icon: PlusSquare },
  // { href: "/dashboard/profile", label: "Profilim", icon: User }, // Future item
  // { href: "/dashboard/settings", label: "Ayarlar", icon: Settings }, // Future item
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-sidebar sm:flex text-sidebar-foreground">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Gem className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Unghost AI</span>
          </Link>
          {navLinks.map(link => (
            <Tooltip key={link.href}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                    pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href))
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{link.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
      {/* Future: Bottom settings icon if needed
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Ayarlar</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Ayarlar</TooltipContent>
        </Tooltip>
      </nav>
      */}
    </aside>
  );
}
