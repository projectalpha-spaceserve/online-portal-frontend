import Tabs from "../components/Tabs";
import MutualFunds from "../features/portfolio/MutualFunds";
import Stocks from "../features/portfolio/Stocks";
import TrustProducts from "../features/portfolio/TrustProducts";

function Portfolio() {
  const tabItems = [
    {
      label: "Trustees Products",
      content: <TrustProducts />,
    },
    {
      label: "Mutual Funds",
      content: <MutualFunds />,
    },
    {
      label: "Stocks",
      content: <Stocks />,
    },
  ];
  return (
    <section>
      <div className="container-w">
        <Tabs tabs={tabItems} />
      </div>
    </section>
  );
}

export default Portfolio;
