"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "features", href: "/#features" },
  { key: "howItWorks", href: "/#how-it-works" },
  { key: "pricing", href: "/#pricing" },
  { key: "consultation", href: "/#consultation" },
  { key: "contact", href: "/#contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-visible border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="NeuroNest eCommerce"
            width={150}
            height={42}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-ink"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher align="end" />
          <Link
            href="/#pricing"
            className="rounded-full bg-brand-ink px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-brand-blue"
          >
            {t("getStarted")}
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-visible border-t border-slate-200 bg-white md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 overflow-visible px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-ink"
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="mt-3 flex items-center justify-between gap-3 overflow-visible border-t border-slate-100 pt-3">
            <LanguageSwitcher align="start" />
            <Link
              href="/#pricing"
              className="rounded-full bg-brand-ink px-5 py-2 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {t("getStarted")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
