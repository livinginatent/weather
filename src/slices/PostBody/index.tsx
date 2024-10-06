import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `PostBody`.
 */
export type PostBodyProps = SliceComponentProps<Content.PostBodySlice>;

/**
 * Component for "PostBody" Slices.
 */
const PostBody = ({ slice }: PostBodyProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for post_body (variation: {slice.variation}) Slices
    </section>
  );
};

export default PostBody;
