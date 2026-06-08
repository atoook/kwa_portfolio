import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

import PageFrame from "@/components/PageFrame";
import { getLocales } from "@/utils/getLocales";

type Params = Promise<{ lang: string }>;

export default async function Page({ params }: { params: Params }) {
  const { lang } = await params;
  const client = createClient();
  const page = await client.getSingle("homepage", { lang });

  const locales = await getLocales(page, client);

  return (
    <PageFrame lang={lang} locales={locales}>
      <SliceZone slices={page.data.slices} components={components} />
    </PageFrame>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  const client = createClient();
  const page = await client.getSingle("homepage", { lang });

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
