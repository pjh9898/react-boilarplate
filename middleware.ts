import { defaultLocale, locales } from "@/i18n";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // 정적 파일 및 API 제외
};
