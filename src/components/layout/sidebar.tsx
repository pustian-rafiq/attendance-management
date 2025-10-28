"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Take Attendance",
    href: "/dashboard/attendance",
    icon: ClipboardList,
  },
  {
    title: "Students",
    href: "/dashboard/students",
    icon: Users,
  },
  {
    title: "Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 xl:w-72 lg:border-r lg:bg-card">
      <div className="p-4 lg:p-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="bg-primary p-2 rounded-lg flex-shrink-0">
            <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base lg:text-lg font-bold truncate">
              Attendance
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              Management System
            </p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 px-3 lg:px-4 pb-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                  <span className="font-medium text-sm lg:text-base truncate">
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
