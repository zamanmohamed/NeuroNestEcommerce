"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "features", href: "#features" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "pricing", href: "#pricing" },
  { key: "consultation", href: "#consultation" },
  { key: "contact", href: "#contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="neuronest eCommerce"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            <span className="text-brand-navy">neuro</span>
            <span className="gradient-text">nest</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-purple"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <a
            href="#pricing"
            className="rounded-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink px-5 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
          >
            {t("getStarted")}
          </a>
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
          "border-t border-slate-200 bg-white md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <LanguageSwitcher />
            <a
              href="#pricing"
              className="rounded-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink px-5 py-2 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {t("getStarted")}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
