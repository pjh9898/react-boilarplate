export const locales = ["en", "ko"] as const; // 지원하는 언어

export const defaultLocale = "ko"; // 기본 언어

export function getLocaleFromPathname(pathname: string) {
  return pathname.startsWith("/en") ? "en" : "ko";
}
