import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { ReactElement } from "react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): ReactElement => {
  return (
    <div className="max-w-prose">
      {/* <div className="prose prose-invert"></div> */}
      <PrismicRichText field={slice.primary.text} />
    </div>
  );
};

export default TextBlock;
