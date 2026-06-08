import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type Locale = {
  lang: string;
  lang_name: string;
  url: string;
};

type PageFrameProps = {
  lang: string;
  locales: Locale[];
  children: ReactNode;
};

export default function PageFrame({ lang, locales, children }: PageFrameProps) {
  return (
    <>
      <Header lang={lang}>
        <LanguageSwitcher locales={locales} />
      </Header>
      {children}
      <Footer lang={lang} />
    </>
  );
}
