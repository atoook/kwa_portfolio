import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex`.
 */
type ContextWithLang = {
  lang: string;
};
export type ContentIndexProps =
  SliceComponentProps<Content.ContentIndexSlice> & { context: ContextWithLang };

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
  context,
}: ContentIndexProps): Promise<JSX.Element> => {
  const { lang } = context;
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post", { lang: lang });
  const projects = await client.getAllByType("project", { lang: lang });

  const contentType = slice.primary.content_type || "Blog";

  const items = contentType === "Blog" ? blogPosts : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={contentType}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image}
      />
    </Bounded>
  );
};

export default ContentIndex;
