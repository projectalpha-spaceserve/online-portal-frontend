import { useState } from "react";
import InvestmentCard from "../../components/InvestmentCard";
import TabLine from "../../components/TabLine";
import { formatAmount } from "../../constants/helper";
import { useActiveTrusts } from "../portfolio/useActiveTrusts";
import Investments from "./Investments";
import Products from "./Products";
import Modal from "../../components/Modal";
import PortfolioSummary from "../portfolio/PortfolioSummary";

const tabItems = [
  {
    label: "Trustee Product",
    content: <Products />,
  },
  {
    label: "Active Investments",
    content: <Investments />,
  },
];

function Trustee() {
  const { activeTrusts } = useActiveTrusts();
  const [modalType, setModalType] = useState(null);

  const balance = activeTrusts?.trust_balance;

  const handleCardClick = () => {
    setModalType("portfolio");
  };

  return (
    <div className="container-w">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-[40%]">
        <InvestmentCard
          title="Trust Investment"
          nairaAmount={formatAmount(balance)}
          bgColor="bg-brand-400"
          btnText="View Portfolio Summary"
          btnTextColor="text-brand-400"
          onClick={handleCardClick}
        />
      </div>

      <div className="mt-8">
        <TabLine tabs={tabItems} />
      </div>

      {modalType && (
        <Modal onClose={() => setModalType(null)}>
          {modalType === "portfolio" && (
            <PortfolioSummary onClose={() => setModalType(null)} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default Trustee;
