import Typography from "@/components/Typography";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ko" }];
}

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="flex items-center justify-center h-screen">
      <Typography type="strong_01" tag="h2">
        {t("common.welcome")}
      </Typography>
    </div>
  );
}
