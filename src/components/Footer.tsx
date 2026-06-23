import Image from "next/image";
import { useTranslations } from "next-intl";

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
                <a href="#features" className="hover:text-brand-ink">
                  {nav("features")}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-brand-ink">
                  {nav("pricing")}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-brand-ink">
                  {nav("howItWorks")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-brand-navy">
              {t("company")}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-brand-ink">
                  {t("about")}
                </a>
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
                <a href="#" className="hover:text-brand-ink">
                  {t("privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-ink">
                  {t("terms")}
                </a>
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
