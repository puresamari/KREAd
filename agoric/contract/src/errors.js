export const errors = {
  noConfig: `Configuration not found, use creatorFacet.initConfig(<config>) to enable this method`,
  noNameArg: `Name argument required`,
  nameTaken: (name) =>
    `Name ${name} is already in use, please select a different name`,
  depositToSeatFailed: `Could not deposit nft into Seat`,
  depositToFacetFailed: `Could not deposit nft into userFacet`,
  character404: `Character not found`,
  inventory404: `Character inventory not found`,
  privateState404: `Character private state not found`,
  noKeyInInventory: `Could not find character key in inventory`,
  invalidInventoryKey: `Brand of Inventory Key does not match the correct Issuer`,
  inventoryKeyMismatch: `Wanted Key and Inventory Key do not match`,
  noItemsRequested: `Offer missing requested item`,
};
