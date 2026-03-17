import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import InvestmentCard from "../../components/InvestmentCard";
import Modal from "../../components/Modal";
import TabLine from "../../components/TabLine";
import { formatAmount } from "../../constants/helper";
import MutualStatement from "../portfolio/MutualStatement";
import { useActiveMutuals } from "../portfolio/useActiveMutuals";
import Investments from "./Investments";
import Products from "./Products";

const tabItems = [
  { label: "Mutual Funds Product", name: "products", content: <Products /> },
  {
    label: "Active Investments",
    name: "investments",
    content: <Investments />,
  },
];

function Mutuals() {
  const { activeMutuals } = useActiveMutuals();
  const [modalType, setModalType] = useState(null);

  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const activeIndex = tabItems.findIndex((t) => t.name === tab);

  const currentIndex = activeIndex === -1 ? 1 : activeIndex;

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
          onClick={() => setModalType("statement")}
        />
      </div>

      <div className="mt-8">
        <TabLine tabs={tabItems} activeIndex={currentIndex} />
      </div>

      {modalType && (
        <Modal onClose={() => setModalType(null)}>
          <MutualStatement onClose={() => setModalType(null)} />
        </Modal>
      )}
    </div>
  );
}

export default Mutuals;
