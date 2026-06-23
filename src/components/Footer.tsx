"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Image
              src="/logo.png"
              alt="NeuroNest eCommerce"
              width={160}
              height={44}
              className="h-9 w-auto"
            />
            <p className="mt-4 text-sm text-slate-500">{t("tagline")}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-brand-navy">
              {t("product")}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/#features" className="hover:text-brand-ink">
                  {nav("features")}
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-brand-ink">
                  {nav("pricing")}
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-brand-ink">
                  {nav("howItWorks")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-brand-navy">
              {t("company")}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-brand-ink">
                  {t("about")}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-brand-ink">
                  {t("blog")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-ink">
                  {t("careers")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-brand-navy">
              {t("legal")}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/privacy" className="hover:text-brand-ink">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-ink">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 text-center text-sm text-slate-500">
          {t("copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
