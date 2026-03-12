import success from "../../assets/images/success.png";
import Btn from "../../components/Btn";

function Successs({ onClick }) {
  return (
    <div className="p-8 flex flex-col items-center">
      <img src={success} alt="Success" className="w-auto h-40 mx-auto" />
      <h1 className="text-lg text-center font-medium mb-4">
        Investment Successful!
      </h1>
      <Btn onClick={onClick}>Go Home</Btn>
    </div>
  );
}

export default Successs;
