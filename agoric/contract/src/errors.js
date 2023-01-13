export const errors = {
  noConfig: `Configuration not found, use creatorFacet.initConfig(<config>) to enable this method`,
  noNameArg: `Name argument required`,
  nameTaken: (name) =>
    `Name ${name} is already in use, please select a different name`,
  depositToSeatFailed: `Could not deposit nft into Seat`,
  depositToFacetFailed: `Could not deposit nft into userFacet`,
  character404: `Character not found`,
  inventory404: `Character inventory not found`,
  notifier404: `Character inventory notifier not found`,
  updateMarketError: `There was a problem updating the market`,
  privateState404: `Character private state not found`,
  noKeyInInventory: `Could not find character key in inventory`,
  invalidInventoryKey: `Brand of Inventory Key does not match the correct Issuer`,
  inventoryKeyMismatch: `Wanted Key and Inventory Key do not match`,
  noItemsRequested: `Offer missing requested item`,
  duplicateCategoryInInventory: `Inventory cannot contain multiple items of the same category`,
  seedInvalid: `Seed must be a number`,
  itemNotInMarket: `Could not find Item in market`,
  characterNotInMarket: `Could not find Character in market`,
  invalidArg: `Invalid Argument`,
};
