import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

import { getLocales } from "@/utils/getLocales";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type Params = { uid: string; lang: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid, { lang: params.lang })
    .catch(() => notFound());

  const locales = await getLocales(page, client);

  return (
    <>
      <Header lang={params.lang}>
        <LanguageSwitcher locales={locales} />
      </Header>
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{ lang: params.lang }}
      />
      <Footer lang={params.lang} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid, { lang: params.lang })
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "homepage")],
    lang: "*",
  });

  return pages.map((page) => ({ uid: page.uid, lang: page.lang }));
}