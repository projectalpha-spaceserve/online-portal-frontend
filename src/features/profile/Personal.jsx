import { HiUser } from "react-icons/hi2";
import Btn from "../../components/Btn";
import ErrorMessage from "../../components/ErrorMessage";
import SearchableSelect from "../../components/SearchableSelect";
import Spinner from "../../components/Spinner";
import { useUser } from "../auth/useUser";
import { formatDateLong } from "../../constants/helper";

function Personal() {
  const { isPending, user } = useUser();

  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className="">
      <div className="space-y-3 border border-brand-75 p-3 md:p-10 rounded-2xl col-span-2">
        <div className="flex items-center justify-between md:items-start ">
          <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-start md:items-center md:w-2/3">
            <span className="bg-brand-450 p-3 md:p-5 rounded-full">
              <HiUser className="text-brand-400 text-sm md:text-xl" />
            </span>
            <div>
              <h1 className="pb-1 text-xs md:text-xl font-semibold">
                {[user?.first_name, user?.last_name].filter(Boolean).join(" ")}
              </h1>
              <p className="text-[10px] md:text-xs font-medium">
                Customer ID: {user?.symplus_id}
              </p>
            </div>
          </div>
          {/* <div className="space-y-3 border border-brand-75 p-2.5 md:p-4 rounded-md md:w-1/3">
            <div className="flex items-center justify-between gap-2 md:gap-5">
              <div className="flex items-center gap-2 md:gap-5">
                <h2 className="text-[10px] md:text-xs">BVN:</h2>
                <p className="text-[10px] md:text-xs font-medium">********</p>
              </div>
              <HiEyeSlash className="text-xs md:text-sm" />
            </div>
            <div className="flex items-center justify-between gap-2 md:gap-5">
              <div className="flex items-center gap-2 md:gap-5">
                <h2 className="text-[10px] md:text-xs">NIN:</h2>
                <p className="text-[10px] md:text-xs font-medium">********</p>
              </div>
              <HiEyeSlash className="text-xs md:text-sm" />
            </div>
          </div> */}
        </div>

        <div className="space-y-3 mt-5">
          <div className="grid grid-cols-2 border border-brand-75 mb-5 rounded-md">
            <div className="border-r border-b border-brand-75 p-4">
              <h2 className="text-xs text-brand-200">Email:</h2>
              <p className="text-xs font-medium">{user?.email}</p>
            </div>
            <div className="border-b border-brand-75 p-4">
              <h2 className="text-xs text-brand-200">Phone No:</h2>
              <p className="text-xs font-medium">{user?.phone}</p>
            </div>
            <div className="border-r border-brand-75 p-4">
              <h2 className="text-xs text-brand-200">Gender:</h2>
              <p className="text-xs font-medium capitalize">{user?.gender}</p>
            </div>
            <div className="p-4">
              <h2 className="text-xs text-brand-200">Date of Birth:</h2>
              <p className="text-xs font-medium">{formatDateLong(user?.dob)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 border border-brand-75 mb-4 gap- rounded-md">
            <div className="border-r border-b border-brand-75 p-4">
              <h2 className="text-xs text-brand-200">Nationality:</h2>
              <p className="text-xs font-medium">{user?.customer_country}</p>
            </div>
            <div className="border-b border-brand-75 p-4">
              <h2 className="text-xs text-brand-200">State of Origin:</h2>
              <p className="text-xs font-medium">{user?.state_origin}</p>
            </div>
            <div className="border-r border-brand-75 py-4 px-4">
              <h2 className="text-xs text-brand-200">Address:</h2>
              <p className="text-xs font-medium">{user?.customer_address}</p>
            </div>
            <div className="py-4 px-4">
              <h2 className="text-xs text-brand-200">City</h2>
              <p className="text-xs font-medium">{user?.customer_city}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personal;
