import React, { ReactNode } from "react";
import { createClient } from "@/prismicio";
import NavBar from "@/components/NavBar";

type Params = {
  lang: string;
  children: ReactNode;
};

export default async function Header({ lang, children }: Params) {
  const client = createClient();
  const settings = await client.getSingle("settings", { lang: lang });
  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
      <NavBar settings={settings} />
      {children}
    </header>
  );
}
