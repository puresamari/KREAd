import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { text } from "../../assets";

import { ErrorView, FormHeader, LoadingPage } from "../../components";
import { PageContainer } from "../../components/page-container";
import { ItemDetailSection } from "../../containers/detail-section";
import { useViewport } from "../../hooks";
import { routes } from "../../navigation";
import { useItem } from "../../service";
import { FormCard } from "../create-character/styles";
import { BuyForm } from "./buy-form";
import { Confirmation } from "./confirmation";
import { ContentWrapper } from "./styles";

// TODO: rename to ItemBuy
export const Buy: FC = () => {
  const { id } = useParams<"id">();
  const { width, height } = useViewport();
  const itemId = String(id);
  const { data: item, isLoading: isLoadingItem, isError: isErrorItem } = useItem(itemId);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const changeStep = (step: number): void => {
    setCurrentStep(step);
  };

  if (isLoadingItem) return <LoadingPage />;

  if (!item || isErrorItem) return <ErrorView />;

  const perStepDisplay = (): React.ReactNode => {
    switch (currentStep) {
      case 1:
        return <BuyForm item={item} changeStep={changeStep} />;
      case 2:
        return <Confirmation item={item} />;
      default:
        return <BuyForm item={item} changeStep={changeStep} />;
    }
  };

  return (
    <ContentWrapper>
      <PageContainer
        sidebarContent={
          <FormCard height={height} width={width}>
            <FormHeader currentStep={currentStep} title={text.store.buyItem} link={routes.shop} isBuyFlow />
            <>{perStepDisplay()}</>
          </FormCard>
        }
      >
        <ItemDetailSection item={item} />
      </PageContainer>
    </ContentWrapper>
  );
};
