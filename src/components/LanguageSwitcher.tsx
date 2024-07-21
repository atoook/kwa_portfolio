// ./src/components/LanguageSwitcher.tsx
"use client";
import { PrismicNextLink } from "@prismicio/next";
import { GrLanguage } from "react-icons/gr";

interface LanguageSwitcherProps {
  locales: {
    lang: string;
    lang_name: string;
    url: string;
  }[];
}

const localeLabels = {
  "en-us": "EN",
  "ja-jp": "JP",
};

const LanguageSwitcher = ({ locales }: LanguageSwitcherProps) => {
  const currentLocale = locales[0]?.lang_name;
  const sortedLocales = [...locales].sort((a, b) =>
    a.lang.localeCompare(b.lang_name),
  );

  return (
    <div className="flex flex-row-reverse flex-wrap gap-3 px-9">
      <ul className="flex flex-wrap gap-3">
        {sortedLocales.map((locale) => (
          <li
            key={locale.lang}
            className={`${locale.lang_name === currentLocale ? "border-b-2 border-yellow-400 font-semibold text-yellow-300" : ""}`}
          >
            <PrismicNextLink
              href={locale.url}
              locale={locale.lang}
              aria-label={`Change language to ${locale.lang_name}`}
            >
              {localeLabels[locale.lang as keyof typeof localeLabels] ||
                locale.lang}
            </PrismicNextLink>
          </li>
        ))}
      </ul>
      <span aria-hidden className="pt-1">
        <GrLanguage />
      </span>
    </div>
  );
};

export default LanguageSwitcher;
