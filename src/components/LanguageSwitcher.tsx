"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleChange(nextLocale: Locale) {
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-2 text-sm font-medium text-slate-700",
          "shadow-sm backdrop-blur-sm transition-all duration-200",
          "hover:border-slate-300 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/20 focus-visible:ring-offset-2",
          open && "border-slate-300 shadow-md ring-2 ring-brand-ink/10"
        )}
      >
        <Globe className="h-4 w-4 shrink-0 text-brand-ink/70" aria-hidden />
        <span>{localeLabels[locale]}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <ul
        role="listbox"
        aria-label={t("label")}
        className={cn(
          "absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-42 overflow-hidden rounded-xl",
          "border border-slate-200/80 bg-white p-1.5 shadow-xl shadow-slate-900/10",
          "origin-top transition-all duration-200 ease-out",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        {routing.locales.map((loc) => {
          const isSelected = loc === locale;

          return (
            <li key={loc} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleChange(loc)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isSelected
                    ? "bg-slate-100 font-medium text-brand-ink"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-ink"
                )}
              >
                <span>{localeLabels[loc]}</span>
                {isSelected && (
                  <Check className="h-4 w-4 shrink-0 text-brand-ink" aria-hidden />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
