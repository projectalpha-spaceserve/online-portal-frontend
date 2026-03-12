import {
  HiLockClosed,
  HiMiniPencilSquare,
  HiMiniUser,
  HiMiniUsers,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import SideTab from "../components/SideTab";
import { useNok } from "../features/get-started/kyc/useNok";
import ChangePassword from "../features/profile/ChangePassword";
import NextOfKin from "../features/profile/NextOfKin";
import Personal from "../features/profile/Personal";
import Questions from "../features/profile/Questions";
import Signature from "../features/profile/Signature";

function Profile() {
  const { nok } = useNok();
  const tabItems = [
    {
      label: "Personal Details",
      content: <Personal />,
      icon: <HiMiniUser size={20} />,
    },
    ...(nok
      ? [
          {
            label: "Next of Kin",
            content: <NextOfKin />,
            icon: <HiMiniUsers size={20} />,
          },
        ]
      : []),
    {
      label: "Change Password",
      content: <ChangePassword />,
      icon: <HiLockClosed size={20} />,
    },
    {
      label: "Security Questions",
      content: <Questions />,
      icon: <HiOutlineShieldCheck size={20} />,
    },
    // {
    //   label: "Bank",
    //   content: <Bank />,
    //   icon: <HiBuildingLibrary size={20} />,
    // },
    {
      label: "Signature",
      content: <Signature />,
      icon: <HiMiniPencilSquare size={20} />,
    },
  ];

  return (
    <section>
      <div className="container-w">
        <SideTab tabs={tabItems} />
      </div>
    </section>
  );
}

export default Profile;
