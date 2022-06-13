import { FC, useMemo, useState } from "react";

import { BaseRoute, ButtonText, ErrorView, LoadingPage, PrimaryButton } from "../../components";
import { text } from "../../assets/text";
import { PageContainer } from "../../components/page-container";
import { CharacterDetailSection, ItemDetailSection } from "../../containers/detail-section";
import { Title } from "../../components/title";
import { ItemsList } from "../../containers/items-list";
import { useCharacters, useItems } from "../../service";
import { CharactersList } from "../../containers/characters-list";
import { routes } from "../../navigation";
import { useNavigate } from "react-router-dom";
import { color } from "../../design";

const ItemsInventory: FC = () => {
  const { data: items, isLoading, isError } = useItems();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>("");

  const item = useMemo(() => items?.find((item) => item.id === selectedId), [items, selectedId]);

  const equip = () => {
    // TODO: implement item equip
    console.log("TODO: implement item equip");
  };

  const sell = () => {
    if (!selectedId) return;
    navigate(`${routes.sell}/${selectedId}`);
  };

  if (isLoading) return <LoadingPage />;

  if (isError || !items || !items.length) return <ErrorView />;

  return (
    <PageContainer sidebarContent={<ItemsList onItemClick={setSelectedId} />}>
      <ItemDetailSection
        item={item || items[0]}
        actions={{ primary: { text: text.item.equip, onClick: equip }, secondary: { text: text.item.sell, onClick: sell } }}
      />
    </PageContainer>
  );
};

// TODO: uncomment when designs will be done
const CharactersInventory: FC = () => {
  const { data: characters, isLoading, isError } = useCharacters();
  const [selectedId, setSelectedId] = useState<string>("");

  const character = useMemo(() => characters?.find((character) => character.characterId === selectedId), [characters, selectedId]);

  const choose = () => {
    // TODO: implement character choose
    console.log("TODO: implement character choose");
  };

  const sell = () => {
    // TODO: implement character sell
    console.log("TODO: implement character sell");
  };

  if (isLoading) return <LoadingPage />;

  if (isError || !characters || !characters.length) return <ErrorView />;

  return (
    <PageContainer sidebarContent={<CharactersList onCharacterClick={setSelectedId} />}>
      <CharacterDetailSection
        character={character || characters[0]}
        actions={{ primary: { text: text.character.choose, onClick: choose }, secondary: { text: text.character.sell, onClick: sell } }}
      />
    </PageContainer>
  );
};

export const Inventory: FC = () => {
  const [viewItems, setViewItems] = useState(true);

  // TODO: switch between items and characters
  return (
    <BaseRoute sideNavigation={<Title title={text.navigation.inventory} />}>
      {/* TODO: remove this button and use proper switch */}
      <PrimaryButton onClick={() => setViewItems(!viewItems)}>
        <ButtonText customColor={color.white}>Switch views</ButtonText>
      </PrimaryButton>

      {viewItems ? <ItemsInventory /> : <CharactersInventory />}
    </BaseRoute>
  );
};
