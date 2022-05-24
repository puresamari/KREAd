import { Item } from "../interfaces";
import { useQuery, UseQueryResult } from "react-query";

import { Items } from "./fake-item-data";

export const useItems = (): UseQueryResult<Item[]> => {
  return useQuery(["items"], async () => {
    //  TODO: intergrate me

    return Items;
  });
};

export const useMyItems = (): UseQueryResult<Item[]> => {
  return useQuery(["items"], async () => {
    //  TODO: intergrate me

    return Items;
  });
};
