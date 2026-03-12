import pattern from "../assets/images/pattern.png";
import chip from "../assets/images/chip.png";

function Card({
  title,
  bgColor = "bg-brand-700",
  textColor = "text-white",
  children,
}) {
  return (
    <div
      className={`${bgColor} ${textColor} px-5 py-8 rounded-2xl`}
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-between pb-2">
        <h1 className="font-semibold">{title}</h1>
        <img src={chip} alt="card chip" className="w-auto h-auto" />
      </div>
      {children}
    </div>
  );
}

export default Card;
