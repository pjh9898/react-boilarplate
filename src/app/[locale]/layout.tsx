import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Navbar } from "./Navbar";
import "@/styles/globals.css";

type Params = Promise<{ locale: never }>;

const LocaleLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) => {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="pt-16">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
