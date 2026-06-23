import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

type ContentBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "email"; label: string; address: string };

interface ContentPageProps {
  namespace: "aboutPage" | "privacyPage" | "termsPage";
  sectionKeys?: readonly string[];
}

function SectionContent({
  blocks,
  paragraphs,
}: {
  blocks?: ContentBlock[];
  paragraphs?: string[];
}) {
  if (blocks) {
    return (
      <div className="mt-4 space-y-4">
        {blocks.map((block, index) => {
          if (block.type === "p") {
            return (
              <p key={index} className="leading-relaxed text-slate-600">
                {block.text}
              </p>
            );
          }

          if (block.type === "ul") {
            return (
              <ul
                key={index}
                className="list-disc space-y-2 pl-5 text-slate-600"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === "email") {
            return (
              <p key={index} className="leading-relaxed text-slate-600">
                <strong className="font-semibold text-brand-navy">
                  {block.label}
                </strong>{" "}
                <a
                  href={`mailto:${block.address}`}
                  className="font-medium text-brand-ink underline underline-offset-2 hover:text-brand-blue"
                >
                  {block.address}
                </a>
              </p>
            );
          }

          return null;
        })}
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {paragraphs?.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-slate-600">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default async function ContentPage({
  namespace,
  sectionKeys = [],
}: ContentPageProps) {
  const t = await getTranslations(namespace);
  const pages = await getTranslations("pages");
  const hasSections = sectionKeys.length > 0;
  const pageBlocks = !hasSections && t.has("blocks")
    ? (t.raw("blocks") as ContentBlock[])
    : undefined;
  const pageParagraphs =
    !hasSections && !pageBlocks && t.has("paragraphs")
      ? (t.raw("paragraphs") as string[])
      : undefined;

  return (
    <>
      <Header />
      <main className="pt-16">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-brand-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {pages("backToHome")}
          </Link>

          <header className="mt-8">
            <h1 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              {t("title")}
            </h1>
            {t.has("subtitle") && (
              <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
            )}
            {t.has("lastUpdated") && (
              <p className="mt-3 text-sm text-slate-500">{t("lastUpdated")}</p>
            )}
          </header>

          <div className="mt-12 space-y-10">
            {hasSections ? (
              sectionKeys.map((key) => {
                const hasBlocks = t.has(`sections.${key}.blocks`);
                const blocks = hasBlocks
                  ? (t.raw(`sections.${key}.blocks`) as ContentBlock[])
                  : undefined;
                const paragraphs = !hasBlocks
                  ? (t.raw(`sections.${key}.paragraphs`) as string[])
                  : undefined;

                return (
                  <section key={key}>
                    <h2 className="text-xl font-semibold text-brand-navy">
                      {t(`sections.${key}.title`)}
                    </h2>
                    <SectionContent blocks={blocks} paragraphs={paragraphs} />
                  </section>
                );
              })
            ) : (
              <SectionContent blocks={pageBlocks} paragraphs={pageParagraphs} />
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
