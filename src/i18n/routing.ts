import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
});

// 기존 next js에서 제공하는 Link, redirect, usePathname, useRouter를 대체합니다.
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
