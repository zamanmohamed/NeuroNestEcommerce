import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContentPage from "@/components/ContentPage";

const SECTIONS = [
  "introduction",
  "services",
  "userAccounts",
  "eligibility",
  "subscriptions",
  "subscriptionChanges",
  "refunds",
  "userContent",
  "prohibitedActivities",
  "storeOwnerResponsibilities",
  "platformAvailability",
  "thirdPartyServices",
  "intellectualProperty",
  "privacy",
  "accountTermination",
  "disclaimers",
  "limitationOfLiability",
  "indemnification",
  "changes",
  "governingLaw",
  "contact",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "termsPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContentPage namespace="termsPage" sectionKeys={SECTIONS} />;
}
