import { BiSolidError } from "react-icons/bi";

export default function ErrorMessage({ errorText }) {
  return (
    <span className="text-xs text-[#a92127] bg-pink-50 flex items-center gap-1 p-1">
      <BiSolidError /> {errorText}
    </span>
  );
}
