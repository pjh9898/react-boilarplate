"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/common/lib/utils";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations();

  const NAV_ITEMS = [
    { name: t("home.title"), href: "/" },
    { name: t("tailwind.title"), href: "/tailwind" },
    { name: t("emotion.title"), href: "/emotion" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <ul className="flex gap-4">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Button
              className={cn(
                pathname === item.href
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100"
              )}
              asChild
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
