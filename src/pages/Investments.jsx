import { HiDocumentDuplicate, HiMiniPlus } from "react-icons/hi2";
import InfoCard from "../components/InfoCard";
import Card from "../components/Card";

function Investments() {
  return (
    <div>
      <div className="flex justify-between items-center gap-5 mt-5">
        <p>Show Balance</p>
        <div className="flex gap-5 items-center">
          <button className="bg-brand-400 text-white py-2 px-2.5 text-xs rounded-md flex items-center gap-1">
            <HiMiniPlus size={25} /> Fund Account
          </button>
          <button className="border border-brand-400 text-brand-400 py-2 px-2.5 text-xs rounded-md flex items-center gap-1">
            <HiMiniPlus size={25} /> Request Statement
          </button>
          <button className="bg-brand-400 text-white py-2 px-2.5 text-xs rounded-md flex items-center gap-1">
            <HiMiniPlus size={25} /> Portfolio Summary
          </button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          <div className="border-2 border-brand-700 rounded-2xl flex flex-col items-center justify-center">
            <span className="bg-brand-700 text-white p-2 rounded-full">
              <HiMiniPlus size={25} />
            </span>
            <p className="pt-2 text-brand-700">Start New Investment</p>
          </div>
          <InfoCard title="Net Worth" nairaAmount="0.00" />
          <Card title="Total Returns">
            <div className="flex items-center gap-2">
              <p className="text-xs">
                Retirement Account: <br /> 130112980001
              </p>
              <HiDocumentDuplicate />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">₦0.00</h2>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Investments;
