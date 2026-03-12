import Btn from "../../components/Btn";
import BtnOutline from "../../components/BtnOutline";
import { formatProductDescription } from "../../constants/helper";

function TrustProduct({ trust, onInvest, onClose }) {
  const { title, code } = formatProductDescription(trust.PRODUCT_DESCRIPTION);

  return (
    <>
      <div className="">
        <div className="flex justify-between gap-10 items-center p-8">
          <div>
            <h1 className="font-bold text-2xl lg:text-4xl">{code}</h1>
            <p className="font-semibold text-xs md:text-sm text-brand-400">
              {title}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#A6A6A6] mt-2">Annual Yield</p>
            <h1 className="text-brand-green-100 font-medium text-sm md:text-xl">
              14%
            </h1>
          </div>
        </div>
        <div className="fundBg p-8 space-y-1 ">
          <div className="grid grid-cols-2 gap-5 md:gap-10">
            <p className="text-xs">Trustees</p>
            <h1 className="text-right text-sm font-medium">SAMTL</h1>
          </div>
          <div className="grid grid-cols-2 gap-5 md:gap-10">
            <p className="text-xs">Min. Holding Period</p>
            <h1 className="text-right text-sm font-medium">
              {trust.INVEST_TENOR_DAYS} days
            </h1>
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-8">
          <Btn onClick={onInvest}>Invest now</Btn>
          <BtnOutline onClick={onClose}>Cancel</BtnOutline>
        </div>
      </div>
    </>
  );
}

export default TrustProduct;
