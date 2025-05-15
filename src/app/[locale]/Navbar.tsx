"use client";

import { Link, usePathname } from "@/i18n/routing";
import Typography from "../../components/Typography";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

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
              variant={pathname === item.href ? "default" : "outline"}
              className="cursor-pointer"
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
