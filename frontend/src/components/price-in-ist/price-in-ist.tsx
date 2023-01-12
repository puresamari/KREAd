import { FC } from "react";
import { text } from "../../assets";

import { color } from "../../design";
import { toTwoDecimals } from "../../util";
import { BoldLabel } from "../atoms";
import { Diamond, PriceContainer } from "./styles";

interface PriceInIstProps {
  price: number | bigint;
}

export const PriceInIst: FC<PriceInIstProps> = ({ price }) => {
  return (
    <PriceContainer>
      <Diamond />
      <BoldLabel customColor={color.black}>{text.param.istPrice(toTwoDecimals(Number(price)))}</BoldLabel>
    </PriceContainer>
  );
};
