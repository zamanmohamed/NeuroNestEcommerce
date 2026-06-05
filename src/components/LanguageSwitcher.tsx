"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const localeLabels: Record<Locale, string> = {
  en: "English",
  si: "සිංහල",
};

export default function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale as Locale });
  }

  return (
    <div className="relative group">
      <label className="sr-only" htmlFor="language-select">
        {t("label")}
      </label>
      <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 shadow-sm transition-colors hover:border-brand-purple/40">
        <Globe className="h-4 w-4 text-brand-purple" aria-hidden />
        <select
          id="language-select"
          value={locale}
          onChange={(e) => handleChange(e.target.value)}
          className={cn(
            "cursor-pointer appearance-none bg-transparent pr-5 outline-none",
            "bg-[length:12px] bg-[right_center] bg-no-repeat",
            "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27m6 8 4 4 4-4%27/%3E%3C/svg%3E')]"
          )}
        >
          {routing.locales.map((loc) => (
            <option key={loc} value={loc}>
              {localeLabels[loc]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
