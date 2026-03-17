import { Link } from "react-router-dom";
import mutual from "../assets/images/mutual.png";
import product from "../assets/images/product.png";
import stocks from "../assets/images/stocks.png";
import DashboardSlider from "../components/DashboardSlider";
import PieChart from "../components/PieChart";
import Spinner from "../components/Spinner";
import TransactionCard from "../components/TransactionCard";
import { capitalize } from "../constants/helper";
import { useUser } from "../features/auth/useUser";
import { useProfileDashboard } from "../features/profile/useProfileDashboard";
import { useTransactions } from "../features/profile/useTransactions";
import { useState } from "react";
import Toggle from "../components/Toggle";
import Skeleton from "../components/Skeleton";
import { useQueryClient } from "@tanstack/react-query";

function Dashboard() {
  const queryClient = useQueryClient();
  const { user, isPending } = useUser();
  const { profileDashboard } = useProfileDashboard();
  const { isTransactions, transactions } = useTransactions();
  const selectedCustomerId = queryClient.getQueryData(["selectedAccount"]);

  const [showBalance, setShowBalance] = useState(
    localStorage.getItem("showBalance") !== "false",
  );

  const linkedAccounts = user?.linked_symplus_ids;
  const hasMultipleAccounts = linkedAccounts?.length > 1;

  const selectedAccount = linkedAccounts?.find(
    (acc) => acc.CUSTOMER_ID === selectedCustomerId,
  );

  const switchFirstName = selectedAccount?.CUSTOMER_NAME?.split(" ")[1];

  const displayName =
    hasMultipleAccounts && switchFirstName ? switchFirstName : user?.first_name;

  const hasTransactions = transactions?.length > 0;

  const hasBalance =
    Number(profileDashboard?.overall_balance) > 0 ||
    Number(profileDashboard?.trust_balance) > 0 ||
    Number(profileDashboard?.mutual_fund_balance) > 0;

  const showActivitySection = hasTransactions || hasBalance;

  const toggleBalance = () => {
    const newValue = !showBalance;
    setShowBalance(newValue);
    localStorage.setItem("showBalance", newValue);
  };

  const pieData = Object.entries(profileDashboard)
    .filter(([key]) => key !== "overall_balance")
    .map(([key, value]) => ({
      label: key
        .replace("_balance", "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      value,
    }));

  return (
    <div className="container-w">
      <section>
        <h1 className="pb-5 font-semibold">
          {isPending ? (
            <Skeleton className="h-6 w-40" />
          ) : (
            `Welcome, ${capitalize(displayName)}`
          )}
        </h1>
        <div className="flex items-center justify-between">
          <div className="">
            <h2 className="pb-1">Wallets</h2>
            <div className="flex gap-4 items-center">
              <p className="text-xs">Show Balance</p>
              <Toggle value={showBalance} onChange={toggleBalance} />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5">
        <div className="">
          <DashboardSlider data={profileDashboard} showBalance={showBalance} />
        </div>
      </div>

      <section className="mt-10">
        <h1 className="text-xl mb-4 font-medium">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {data.map((data, i) => (
            <Link
              to={data.url}
              key={i}
              className="border border-brand-75 rounded-2xl py-3 px-5"
            >
              <img src={data.image} alt="Icon image" className="max-h-14" />
              <p className="text-sm mt-1 text-brand-25">{data.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {showActivitySection && (
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="border border-brand-75 rounded-2xl p-8 lg:col-span-3">
            <h1 className="font-medium mb-4">Recent Activities</h1>

            {isTransactions ? (
              <Spinner />
            ) : transactions?.length === 0 ? (
              <div className="text-sm text-gray-400 text-center py-10">
                No recent activities yet
              </div>
            ) : (
              <div>
                {transactions.map((trans) => (
                  <TransactionCard key={trans.id} {...trans} />
                ))}
              </div>
            )}
          </div>

          <div className="border border-brand-75 rounded-2xl p-8 lg:col-span-2">
            <h1 className="font-medium mb-4">Asset Distribution</h1>
            <PieChart
              data={pieData}
              hasBalance={hasBalance}
              labelKey="label"
              valueKey="value"
            />
          </div>
        </section>
      )}
    </div>
  );
}

const data = [
  {
    title: "Trust Products",
    image: product,
    url: "/trustees",
  },
  {
    title: "Mutual Funds",
    image: mutual,
    url: "/mutual-funds",
  },
  {
    title: "Stocks",
    image: stocks,
    url: "/stocks",
  },
];

export default Dashboard;

{
  /* <div className="">
            <Link
              to="/"
              className="bg-brand-400 text-white text-xs flex gap-1 items-center py-1.5 pl-2 pr-3 rounded-md"
            >
              <HiMiniPlus size={20} /> Fund Account
            </Link>
          </div> */
}
