import { useState } from "react";
import InvestmentCard from "../../components/InvestmentCard";
import TabLine from "../../components/TabLine";
import { formatAmount } from "../../constants/helper";
import { useActiveMutuals } from "../portfolio/useActiveMutuals";
import Investments from "./Investments";
import Products from "./Products";
import Modal from "../../components/Modal";
import MutualStatement from "../portfolio/MutualStatement";

const tabItems = [
  {
    label: "Mutual Funds Product",
    content: <Products />,
  },
  {
    label: "Active Investments",
    content: <Investments />,
  },
];

function Mutuals() {
  const { activeMutuals } = useActiveMutuals();
  const [modalType, setModalType] = useState(null);

  const handleCardClick = () => {
    setModalType("statement");
  };

  const balance = activeMutuals?.mutual_fund_balance;

  return (
    <div className="container-w">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <InvestmentCard
          title="Mutual Funds"
          nairaAmount={formatAmount(balance)}
          bgColor="bg-brand-800"
          btnText="View Statement"
          btnTextColor="text-brand-800"
          onClick={handleCardClick}
        />
      </div>

      <div className="mt-8">
        <TabLine tabs={tabItems} />
      </div>

      {modalType && (
        <Modal onClose={() => setModalType(null)}>
          {modalType === "statement" && (
            <MutualStatement onClose={() => setModalType(null)} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default Mutuals;
