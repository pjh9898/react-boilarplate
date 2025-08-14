"use client";

import { Link, usePathname } from "@/i18n/routing";
import Typography from "../../components/Typography";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations();

  const NAV_ITEMS = [
    { name: t("home.title"), href: "/" },
    { name: t("tailwind.title"), href: "/tailwind" },
    { name: t("emotion.title"), href: "/emotion" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
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
