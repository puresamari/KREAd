import { Category, Rarity } from "./interfaces";

export const GO_BACK = -1 as const;
export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5001";
export const MIN_PRICE = 0 as const;
export const MAX_PRICE = 100000 as const;
export const INFORMATION_STEP = 0 as const;
export const WALLET_INTERACTION_STEP = 1 as const;
export const CONFIRMATION_STEP = 2 as const;
export const MINTING_COST = 5000000 as const;
export const MONEY_DECIMALS = 6 as const;
export const MINTING_COST_USD = MINTING_COST / Number("1".padEnd(MONEY_DECIMALS + 1, "0"));
export const SUCCESSFUL_MINT_REPONSE_MSG = "Character mint successful, use attached public facet to purchase" as const;
export const SELL_CHARACTER_DESCRIPTION = "Sell Character in KREAd marketplace" as const;
export const SELL_ITEM_DESCRIPTION = "Sell Item in KREAd marketplace" as const;
export const NO_SMART_WALLET_ERROR = 'no smart wallet';
export const MINT_CHARACTER_FLOW_STEPS = 3 as const;
export const BUY_FLOW_STEPS = 2 as const;
export const SELL_FLOW_STEPS = 3 as const;
export const BUY_FLOW_WIDTH = 80 as const;
export const SELL_FLOW_WIDTH = 140 as const;
export const SMALL_SCREEN_WIDTH = 0.4 as const;

export const CTP_LOG_CONFIG = {
  RETURN: false,
  CALL: true,
} as const;
export const SMALL_SCREEN_SIZE = 1600 as const;
export const MEDIUM_SCREEN_SIZE = 1780 as const;
export const LARGE_SCREEN_SIZE = 1920 as const;
export const EXTRA_LARGE_SCREEN_SIZE = 2560 as const;
export const ONE_HUNDRED_PERCENT = 100 as const;

export const UNMOUNTED = "unmounted" as const;
export const EXITED = "exited" as const;
export const ENTERED = "entered" as const;
export const EXITING = "exiting" as const;
export const MILLISECONDS = 1000 as const;

/********************** PROPERTIES *********************/
export const ORIGIN = {
  elephia: "Elephia",
  farma: "Farma",
  mount: "Mount",
  arm: "Arm",
  west: "West",
  sage: "Sage",
  mars: "Mars",
  tempet: "Tempet",
  wildlands: "Wildlands",
} as const;
export const TITLE = {
  citizen: "Citizen",
  scavenger: "Scavenger",
  bountyHunter: "Bounty Hunter",
  stateBountyHunter: "State Bounty Hunter",
  councilMember: "Council Member",
} as const;

export const CATEGORY = {
  background: "background",
  patch: "patch",
  hair: "hair",
  headPiece: "headPiece",
  mask: "mask",
  perk1: "perk1",
  perk2: "perk2",
  filter1: "filter1",
  filter2: "filter2",
  garment: "garment",
} as const;

export const RARITY = {
  common: "common",
  uncommon: "uncommon",
  rare: "rare",
  epic: "epic",
  legendary: "legendary",
} as const;

export const COLORS = ["#B1A2A2", "#7B5B7B", "#968996", "#FFFFFF", "#0000006", "#3063A5"] as const;

export const SECTION = {
  SHOP: "shop",
  INVENTORY: "inventory",
} as const;

export const METRICS_CHARACTER = [
  "sales",
  "collection size",
  "floor price",
  "avg. character price",
  "avg. character level",
  "avg. marketplace level",
];

export const METRICS_ITEM = ["sales", "collection size", "floor price", "avg. item price", "avg. item level", "avg. marketplace level"];

export const EXCLUDE_ITEMS_SHOP = [["hair", ["legendary"]]] as [[Category, Rarity[]]];

/***************************************************************************/

export const AGORIC_LINK = "https://agoric.com/" as const;
export const KRYHA_LINK = "https://kryha.io/" as const;
export const DISCORD_LINK = "https://discord.gg/rgyeu2ux" as const;
export const TWITTER_LINK = "https://twitter.com/0xKREAd" as const;

export const MAX_CHARACTER_LENGTH = 20 as const;
export const SLIDER_TIME = 4.5 as const;
export const PAGE_SIZE = 10 as const;
export const ASSETS_PER_PAGE = 30 as const;

export const FIRST_TIME = "first_time" as const;
export const CHARACTER_PURSE_NAME = "KREA" as const;
export const ITEM_PURSE_NAME = "KREAITEM" as const;

export const EVENT_TYPE = {
  mint: "mint",
  sell: "sell",
  buy: "buy",
} as const;

export const STORAGE_NODE_SPEC_MARKET_ITEMS = ":published.kread.market-items" as const;
export const STORAGE_NODE_SPEC_MARKET_CHARACTERS = ":published.kread.market-characters" as const;

export const STORAGE_NODE_SPEC_INVENTORY = ":published.kread.inventory-" as const;

export const isDevelopmentMode = process.env.NODE_ENV === ("development" as const);

export type Section = "items" | "characters";
export const ITEM_MODE = "item" as const;
export const MAIN_MODE = "main" as const;

export const CHARACTER_SELECT_MODE = "character-select" as const;
export const CATEGORY_MODE = "category" as const;

export type InteractionMode = typeof ITEM_MODE | typeof MAIN_MODE | typeof CATEGORY_MODE | typeof CHARACTER_SELECT_MODE;
export const CHARACTER_HEIGHT = 1190.5511 as const;
export const CHARACTER_WIDTH = 841.8898 as const;

export const networkOptions = [
  { label: "local", value: "https://wallet.agoric.app/wallet/network-config" },
  { label: "emerynet", value: "https://emerynet.agoric.net/network-config" },
  { label: "mainnet", value: "https://main.agoric.net/network-config" },
] as const;
export const DEFAULT_NETWORK_CONFIG = import.meta.env.VITE_NETWORK_CONFIG || ("https://emerynet.agoric.net/network-config" as const);
export const NETWORK_CONFIG = import.meta.env.VITE_NETWORK_CONFIG || ("https://main.agoric.net/network-config" as const);

export const localBridgeHref = "http://localhost:3000/wallet/bridge.html" as const;
export const prodBridgeHref = "https://wallet.agoric.app/wallet/bridge.html" as const;
export const devBridgeHref = "https://main.wallet-app.pages.dev/wallet/bridge.html" as const;

export const bridgeHref = import.meta.env.VITE_BRIDGE_HREF || localBridgeHref;

export const walletUiHref = () => {
  const bridgeUrl = new URL(prodBridgeHref);
  return bridgeUrl ? bridgeUrl.origin + "/wallet/" : "";
};

export const IST_IDENTIFIER = "IST" as const;
export const KREAD_IDENTIFIER = "kread" as const;
export const ITEM_IDENTIFIER = "KREAdITEM" as const;
export const CHARACTER_IDENTIFIER = "KREAdCHARACTER" as const;

export const SELL_ITEM_INVITATION = "makeSellItemInvitation" as const;
export const SELL_CHARACTER_INVITATION = "makeSellCharacterInvitation" as const;

export const AGORIC_RPC = import.meta.env.VITE_RPC || ("http://127.0.0.1:26657" as const);

export const INVENTORY_CALL_FETCH_DELAY = 10000 as const;

export const PINATA_GATEWAY = import.meta.env.VITE_PINATA_GATEWAY || "https://pink-defensive-jay-557.mypinata.cloud";

// Contract errors

export const KREAD_CONTRACT_ERRORS = {
  invalidName: "Offer error Error: (a string)",
};
export const PLATFORM_RATE = 0.03;
export const ROYALTY_RATE = 0.1;
