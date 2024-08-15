import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Ebcalc`.
 */
export type EbcalcProps = SliceComponentProps<Content.EbcalcSlice>;

/**
 * Component for "Ebcalc" Slices.
 */
const Ebcalc = ({ slice }: EbcalcProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for ebcalc (variation: {slice.variation}) Slices
    </section>
  );
};

export default Ebcalc;
