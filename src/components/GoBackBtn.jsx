import { HiArrowLongLeft } from "react-icons/hi2";
import { useMoveBack } from "../hooks/useMoveBack";

function GoBackBtn({ children }) {
  const moveBack = useMoveBack();

  return (
    <button
      onClick={moveBack}
      className="flex items-center gap-1 mb-2 text-sm hover:text-[#a62325] hover:font-semibold"
    >
      <HiArrowLongLeft size={20} /> {children ? children : "Go back"}
    </button>
  );
}
export default GoBackBtn;
