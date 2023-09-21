/// <reference types="ses"/>
import { Character, ExtendedCharacter, Item } from "../interfaces";
import { fetchFromVStorage } from "./storage-node/fetch-from-vstorage";
import { CATEGORY } from "../constants";

export const extendCharacters = async (
  characters: Character[],
  marshaller: any,
): Promise<{
  extendedCharacters: ExtendedCharacter[];
  equippedItems: Item[];
}> => {
  const equippedCharacterItems: Item[] = [];

  const charactersWithItems: ExtendedCharacter[] = await Promise.all(
    characters.map(async (character) => {
      const result = await fetchFromVStorage(marshaller, `data/published.kread.inventory-${character.name}`);
      const frontendEquippedItems: Item[] = result.map((copyBag: [Item, bigint]) => ({
        ...copyBag[0],
        equippedTo: character.name,
        forSale: false,
      }));

      equippedCharacterItems.push(...frontendEquippedItems);
      const equipped: { [key: string]: Item | undefined } = {};
      for (const category of Object.keys(CATEGORY)) {
        equipped[category] = frontendEquippedItems.find((item: Item) => item.category === category);
      }

      return {
        nft: character,
        equippedItems: equipped,
      };
    }),
  );

  return {
    extendedCharacters: charactersWithItems,
    equippedItems: equippedCharacterItems,
  };
};
