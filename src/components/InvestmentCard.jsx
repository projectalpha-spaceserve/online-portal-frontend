import line from "../assets/icons/line.svg";
import pattern from "../assets/images/pattern.png";

function InvestmentCard({
  title,
  nairaAmount,
  usdAmount,
  bgColor = "bg-brand-700",
  textColor = "text-white",
  btnText,
  btnTextColor,
  onClick,
}) {
  return (
    <div
      className={`${bgColor} ${textColor} px-5 py-8 rounded-2xl h-45`}
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:flex-row items-start gap-2 md:items-center justify-between pb-2 md:pb-8">
        <h1 className="font-semibold text-sm md:text-lg">{title}</h1>
        <button
          onClick={onClick}
          className={`bg-white px-2 rounded-lg font-medium py-1.5 md:py-2.5 text-[10px] cursor-pointer hover:bg-brand-75 ${btnTextColor}`}
        >
          {btnText}
        </button>
      </div>

      <div className="flex items-center justify-between text-[10px] md:text-xs">
        <p>NGN</p>
        <p className="text-xs md:text-sm">{nairaAmount}</p>
      </div>

      <>
        <img src={line} alt="line" className="w-4 h-3 ml-1" />
        <div className="flex items-center justify-between text-[10px] md:text-xs">
          <p>USD</p>
          <p>{usdAmount}</p>
        </div>
      </>
    </div>
  );
}

export default InvestmentCard;
