import { useSearchParams } from "react-router-dom";
import OnBoard from "../components/OnBoard";
import TabLine from "../components/TabLine";
import ExistingVerifyEmail from "../features/register/ExistingVerifyEmail";
import NewVerifyEmail from "../features/register/NewVerifyEmail";

const tabItems = [
  {
    label: "Existing Customer",
    name: "existing",
    content: <ExistingVerifyEmail />,
  },
  {
    label: "New Customer",
    name: "new",
    content: <NewVerifyEmail />,
  },
];

function Register() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const activeIndex = tabItems.findIndex((t) => t.name === tab);

  const currentIndex = activeIndex === -1 ? 0 : activeIndex;
  return (
    <div className="">
      <OnBoard title="Get Started with SAMTL">
        <TabLine tabs={tabItems} activeIndex={currentIndex} />
      </OnBoard>
    </div>
  );
}

export default Register;
