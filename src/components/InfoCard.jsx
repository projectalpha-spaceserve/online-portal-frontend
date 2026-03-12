import pattern from "../assets/images/pattern.png";
import line from "../assets/icons/line.svg";
import chip from "../assets/images/chip.png";

export default function InfoCard({
  title,
  nairaAmount,
  usdAmount,
  bgColor = "bg-brand-700",
  textColor = "text-white",
}) {
  return (
    <div
      className={`${bgColor} ${textColor} px-5 py-8 rounded-2xl h-[150px]`}
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-between pb-5">
        <h1 className="font-meduim">{title}</h1>
        <img src={chip} alt="card chip" className="w-auto h-auto" />
      </div>

      <div className="flex items-center justify-between text-xs">
        <p>NGN</p>
        <p>{nairaAmount}</p>
      </div>
      {usdAmount && (
        <>
          <img src={line} alt="line" className="w-4 h-3 ml-1" />
          <div className="flex items-center justify-between text-xs">
            <p>USD</p>
            <p>{usdAmount}</p>
          </div>
        </>
      )}
    </div>
  );
}
