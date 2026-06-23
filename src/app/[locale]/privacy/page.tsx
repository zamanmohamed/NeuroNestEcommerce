import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContentPage from "@/components/ContentPage";

const SECTIONS = [
  "introduction",
  "collection",
  "usage",
  "payments",
  "cookies",
  "sharing",
  "internationalTransfers",
  "dataRetention",
  "security",
  "rights",
  "accountDeletion",
  "childrenPrivacy",
  "thirdPartyLinks",
  "changes",
  "contact",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContentPage namespace="privacyPage" sectionKeys={SECTIONS} />;
}
