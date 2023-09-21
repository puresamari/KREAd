import React, { createContext, FC, useEffect, useMemo, useState } from "react";
import { useAndRequireContext } from "../hooks";
import { Category, Origin, Rarity, Title } from "../interfaces";
import { useSearchParams } from "react-router-dom";
import { MAX_PRICE, MIN_PRICE } from "../constants";

interface Context {
  title: Title[];
  origin: Origin[];
  rarity: Rarity[];
  categories: Category[];
  sort: string;
  reset: boolean;
  colors: string;
  forSale: boolean;
  equippedTo: string;
  price: { min: number; max: number };
  setEquippedTo: (value: string) => void;
  setOrigin: (value: Origin[]) => void;
  setCategories: (value: Category[]) => void;
  setRarity: (value: Rarity[]) => void;
  setSort: (value: string) => void;
  setTitle: (value: Title[]) => void;
  setColors: (value: string) => void;
  setForSale: (value: boolean) => void;
  setPrice: (value: { min: number; max: number }) => void;
  onReset: () => void;
}

interface Props {
  children: React.ReactNode;
}

const ContextRef = createContext<Context | undefined>(undefined);

export const FiltersContextProvider: FC<Props> = ({ children }) => {
  const [title, setTitle] = useState<Title[]>([]);
  const [origin, setOrigin] = useState<Origin[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [price, setPrice] = useState<{
    min: number;
    max: number;
  }>({ min: MIN_PRICE, max: MAX_PRICE });
  const [rarity, setRarity] = useState<Rarity[]>([]);
  const [equippedTo, setEquippedTo] = useState<string>("");
  const [forSale, setForSale] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("");
  const [colors, setColors] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);

  const onReset = () => {
    setCategories([]);
    setOrigin([]);
    setRarity([]);
    setTitle([]);
    setSort("");
    setColors("");
    setReset(!reset);
  };

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(
      {
        categories,
        origin,
        rarity,
        sort,
        colors,
        forSale: forSale ? "true" : "false",
        equippedTo,
      },
      {
        relative: "path",
      },
    );
  }, [categories, origin, rarity, colors, equippedTo, forSale, sort]);

  const contextValue = useMemo(
    () => ({
      origin,
      title,
      rarity,
      categories,
      sort,
      reset,
      colors,
      forSale,
      equippedTo,
      price,
      setTitle,
      setEquippedTo,
      setOrigin,
      setCategories,
      setRarity,
      setSort,
      setColors,
      setForSale,
      setPrice,
      setReset,
      onReset,
    }),
    [categories, colors, equippedTo, forSale, origin, price, rarity, reset, sort, title],
  );

  return <ContextRef.Provider value={contextValue}>{children}</ContextRef.Provider>;
};

export function useFilters() {
  return useAndRequireContext(ContextRef, "useFilters");
}
