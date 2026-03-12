import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Aside from "../../components/Aside";
import GoBackBtn from "../../components/GoBackBtn";
import { useKycStatus } from "./kyc/useKycStatus";
import { COMPLETED_STATUS, isStepCompleted } from "../../constants/helper";

const steps = [
  {
    title: "Personal Details",
    path: "personal",
    key: "biodata",
  },
  {
    title: "Next Of Kin Details",
    path: "next-of-kin",
    key: "next_of_kin",
  },
  {
    title: "Bank Details",
    path: "bank",
    key: "bank",
  },
  {
    title: "Upload Documents",
    path: "documents",
    key: "identity_document",
  },
];

function Kyc() {
  const { isKycStatus, kycStatus } = useKycStatus();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isKycStatus || !kycStatus) return;

    const firstIncompleteStep = steps.find(
      (step) => !isStepCompleted(step.key, kycStatus[step.key]),
    );

    // If everything completed → go back
    if (!firstIncompleteStep) {
      navigate("/get-started", { replace: true });
      return;
    }

    const currentPath = location.pathname.split("/").pop();

    // If user enters /kyc directly
    if (currentPath === "kyc") {
      navigate(firstIncompleteStep.path, { replace: true });
      return;
    }

    const currentStep = steps.find((s) => s.path === currentPath);

    // If not on the correct step → move them
    if (currentStep?.path !== firstIncompleteStep.path) {
      navigate(firstIncompleteStep.path, { replace: true });
    }
  }, [kycStatus, isKycStatus, navigate, location.pathname]);

  return (
    <div>
      <div className="mb-5">
        <GoBackBtn />
      </div>

      <h1 className="font-semibold">Welcome,</h1>
      <p className="text-sm mb-4">
        Just a few more steps to achieving your financial success.
      </p>

      <div className="w-full h-full flex flex-col gap-5 md:gap-0 md:flex-row bg-white rounded-[2rem] border border-brand-150">
        {!isKycStatus && (
          <Aside
            data={steps}
            basePath="/get-started/kyc"
            kycStatus={kycStatus}
          />
        )}

        <div className="w-full py-6 md:py-10 px-5 md:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Kyc;
