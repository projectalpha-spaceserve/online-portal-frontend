import OnBoard from "../components/OnBoard";
import TabLine from "../components/TabLine";
import ExistingVerifyEmail from "../features/register/ExistingVerifyEmail";
import NewVerifyEmail from "../features/register/NewVerifyEmail";

function Register() {
  const tabItems = [
    {
      label: "Existing Customer",
      content: <ExistingVerifyEmail />,
    },
    {
      label: "New Customer",
      content: <NewVerifyEmail />,
    },
  ];
  return (
    <div className="">
      <OnBoard title="Get Started with SAMTL">
        <TabLine tabs={tabItems} />
      </OnBoard>
    </div>
  );
}

export default Register;
