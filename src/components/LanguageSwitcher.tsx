// ./src/components/LanguageSwitcher.tsx
"use client";
import { PrismicNextLink } from "@prismicio/next";

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

export const LanguageSwitcher = ({ locales }: LanguageSwitcherProps) => (
  <div className="flex flex-wrap gap-3">
    <span aria-hidden>🌐</span>
    <ul className="flex flex-wrap gap-3">
      {locales.map((locale) => (
        <li key={locale.lang} className="first:font-semibold">
          <PrismicNextLink
            href={locale.url}
            locale={locale.lang}
            aria-label={`Change language to ${locale.lang_name}`}
            onClick={() => {
              console.log(locale.url);
            }}
          >
            {localeLabels[locale.lang as keyof typeof localeLabels] ||
              locale.lang}
          </PrismicNextLink>
        </li>
      ))}
    </ul>
  </div>
);
