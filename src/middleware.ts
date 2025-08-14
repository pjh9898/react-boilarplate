import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 로케일 없는 루트 경로 → 기본 로케일로 리다이렉트
  if (pathname === "/") {
    const defaultLocale = routing.defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  // next-intl 미들웨어 기본 처리
  return intlMiddleware(request);
}

export const config = {
  // 국제화된 경로명만 일치
  matcher: ["/", "/(ko|en)/:path*"], // "/" 경로와 "/:path*" 경로를 지원합니다.
};
