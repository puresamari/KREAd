/// <reference types="ses"/>
import { E } from "@endo/eventual-send";
import { AmountMath } from "@agoric/ertp";
import { Purses, AgoricState } from "../interfaces/agoric.interfaces";
import { mediate } from "../util";
import { CharacterBackend, ExtendedCharacterBackend, Item } from "../interfaces";
import { formatIdAsNumber, itemCategories } from "./util";
import { WalletContext } from "../context/wallet";

export const formOfferForCharacter = (purses: Purses, character: any) => ({
  want: {
    Asset: {
      pursePetname: purses.character[0].pursePetname,
      value: character,
    },
  },
  give: {
    Price: {
      pursePetname: purses.money[0].pursePetname,
      value: 10,
    },
  },
});

export const formOfferForCharacterAmount = (characterBrand: any, character: any, moneyBrand: any, price: bigint) => ({
  want: {
    Asset: AmountMath.make(characterBrand, [character]),
  },
  give: {
    Price: AmountMath.make(moneyBrand, price),
  },
});

export const extendCharacters = async (
  publicFacet: any,
  characters: CharacterBackend[]
): Promise<{ extendedCharacters: ExtendedCharacterBackend[]; equippedItems: Item[] }> => {
  const equippedCharacterItems: Item[] = [];

  const charactersWithItems: ExtendedCharacterBackend[] = await Promise.all(
    characters.map(async (character) => {
      const { items: equippedItems } = await E(publicFacet).getCharacterInventory(character.name);

      const frontendEquippedItems = mediate.items.toFront(equippedItems);

      equippedCharacterItems.push(...frontendEquippedItems);
      const equipped: { [key: string]: Item | undefined } = {};
      itemCategories.forEach((category) => {
        equipped[category] = frontendEquippedItems.find((item: Item) => item.category === category);
      });

      return {
        nft: character,
        equippedItems: equipped,
      };
    })
  );

  return { extendedCharacters: charactersWithItems, equippedItems: equippedCharacterItems };
};

export const mintNfts = async (service: AgoricState, purses: any, name: string) => {
  const {
    agoric: { walletP },
    contracts: {
      characterBuilder: { publicFacet },
    },
  } = service;

  if (!publicFacet || !walletP || !purses.money[0].pursePetname || !purses.character[0].pursePetname) {
    console.error("Could not make bid for character: undefined parameter");
    return;
  }

  const invitation = await E(publicFacet).makeMintCharacterInvitation();

  console.info("Invitation successful, sending to wallet for approval");

  const offerConfig = harden({
    id: `${Date.now()}`,
    invitation: invitation,
    proposalTemplate: {
      want: {
        Asset: {
          pursePetname: purses.character[purses.character.length - 1].pursePetname,
          value: [{ name }],
        },
      },
    },
    dappContext: true,
  });
  return E(walletP).addOffer(offerConfig);
};

export const sellCharacter = async (service: AgoricState, wallet: WalletContext, character: any, price: bigint): Promise<boolean> => {
  const {
    contracts: {
      characterBuilder: { publicFacet },
    },
    agoric: { walletP },
  } = service;

  if (!publicFacet) return false;
  const characterPurse = wallet.character[wallet.character.length - 1];
  const tokenPurse = wallet.token[wallet.token.length - 1];
  const moneyPurse = wallet.money[wallet.money.length - 1];

  if (!characterPurse || !tokenPurse || !moneyPurse) return false;

  const sellInvitation = await E(publicFacet).makeSellCharacterInvitation();
  const offer = harden({
    id: Date.now().toString(),
    invitation: sellInvitation,
    proposalTemplate: {
      want: {
        Price: {
          pursePetname: tokenPurse.pursePetname,
          value: (price),
        },
      },
      give: {
        Character: {
          pursePetname: characterPurse.pursePetname,
          value: [formatIdAsNumber(character)],
        },
      },
    },
    dappContext: true,
  });
  await E(walletP).addOffer(
    offer
  );
  return true;
};

export const buyCharacter = async (service: AgoricState, wallet: WalletContext, character: CharacterBackend, price: bigint) => {
  const {
    contracts: {
      characterBuilder: { publicFacet },
    },
    agoric: { walletP },
  } = service;

  if (!publicFacet) return;
  const characterPurse = wallet.character[wallet.character.length - 1];
  const tokenPurse = wallet.token[wallet.token.length - 1];
  const moneyPurse = wallet.money[wallet.money.length - 1];
  
  if (!characterPurse || !moneyPurse || !tokenPurse) return;

  const buyInvitation = await E(publicFacet).makeBuyCharacterInvitation();

  await E(walletP).addOffer(
    harden({
      id: Date.now().toString(),
      invitation: buyInvitation,
      proposalTemplate: {
        want: {
          Character: {
            pursePetname: characterPurse.pursePetname,
            value: [character],
          },
        },
        give: {
          Price: {
            pursePetname: tokenPurse.pursePetname,
            value: (price),
          },
        },
      },
      dappContext: true,
    })
  );

  console.info("BUY OFFER SENT");
  return true;
};