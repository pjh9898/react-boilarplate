import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

type Params = Promise<{ locale: never }>;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params; // next js 15버전부터 Params 사용시 비동기로 변경됨

  // 클라이언트에게 모든 메시지 제공
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
