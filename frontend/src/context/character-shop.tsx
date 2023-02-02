import React, { createContext, useContext, useState, useEffect } from "react";
import { CharacterInMarket, KreadCharacterInMarket } from "../interfaces";
import { useAgoricState } from "./agoric";
import { extendCharacters } from "../service/character-actions";
import { itemArrayToObject } from "../util";
import { makeLeader, makeFollower, makeCastingSpec, iterateLatest } from "@agoric/casting";
import { LOCAL_DEVNET_RPC, STORAGE_NODE_SPEC_MARKET } from "../constants";

interface CharacterMarketContext {
  characters: CharacterInMarket[];
  notifierUpdateCount: any;
  fetched: boolean;
}
const initialState: CharacterMarketContext = {
  characters: [],
  notifierUpdateCount: undefined,
  fetched: false,
};

const Context = createContext<CharacterMarketContext | undefined>(undefined);

type ProviderProps = Omit<React.ProviderProps<CharacterMarketContext>, "value">;

export const CharacterMarketContextProvider = (props: ProviderProps): React.ReactElement => {
  const [marketState, marketDispatch] = useState(initialState);
  const agoric = useAgoricState();
  const kreadPublicFacet = agoric.contracts.characterBuilder.publicFacet; 

  useEffect(() => {
    const parseCharacterMarketUpdate = async (charactersInMarket: any) => {
      console.log("NEW CHARACTERS", charactersInMarket);
      const characters = await Promise.all(charactersInMarket.map((character: any) => formatMarketEntry(character)));
      marketDispatch((prevState) => ({ ...prevState, characters, fetched: true }));
    };
    const formatMarketEntry = async(marketEntry: KreadCharacterInMarket): Promise<CharacterInMarket> => {
      const extendedCharacter = await extendCharacters(kreadPublicFacet, [marketEntry.character]);
      const equippedItems = itemArrayToObject(extendedCharacter.equippedItems);
      const character = extendedCharacter.extendedCharacters[0].nft;
      
      return {
        id: (character.id).toString(),
        character: {...character, id: character.id.toString()},
        equippedItems,
        sell: {
          price: marketEntry.askingPrice.value
        }
      };
    };
    const watchNotifiers = async () => {
      console.count("🛍 UPDATING CHARACTER SHOP 🛍");
      // Iterate over kread's storageNode follower on local-devnet
      const leader = makeLeader(LOCAL_DEVNET_RPC);
      const castingSpec = makeCastingSpec(STORAGE_NODE_SPEC_MARKET);
      const follower = makeFollower(castingSpec, leader);
      for await (const value of iterateLatest(follower)) {
        parseCharacterMarketUpdate(value.value.character);
      }
    };
    if (kreadPublicFacet) {
      watchNotifiers().catch((err) => {
        console.error("got watchNotifiers err", err);
      });
      marketDispatch((prevState) => ({ ...prevState, fetched: true }));
      console.info("✅ LISTENING TO CHARACTER SHOP NOTIFIER");
    }
  }, [kreadPublicFacet]);
  
  return (
    <Context.Provider value={marketState}>
      {props.children}
    </Context.Provider>
  );
};

export const useCharacterMarketState = (): CharacterMarketContext => {
  const state = useContext(Context);
  if (state === undefined) {
    throw new Error("CharacterMarketState can only be called inside CharacterMarketStateProvider.");
  }
  return state;
};