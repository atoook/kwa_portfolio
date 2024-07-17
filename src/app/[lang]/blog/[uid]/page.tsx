import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import ContentBody from "@/components/ContentBody";

import { getLocales } from "@/utils/getLocales";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type Params = { uid: string; lang: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid, { lang: params.lang })
    .catch(() => notFound());

  const locales = await getLocales(page, client);

  return (
    <>
      <Header lang={params.lang}>
        <LanguageSwitcher locales={locales} />
      </Header>
      <ContentBody page={page} />
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
    .getByUID("blog_post", params.uid, { lang: params.lang })
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post", {
    predicates: [prismic.filter.not("my.page.uid", "homepage")],
    lang: "*",
  });

  return pages.map((page) => {
    return { uid: page.uid, lang: page.lang };
  });
}
