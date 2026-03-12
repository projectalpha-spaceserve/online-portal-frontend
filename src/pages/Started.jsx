import { HiCheckCircle } from "react-icons/hi2";
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { COMPLETED_STATUS, isKycFullyCompleted } from "../constants/helper";
import { useKycStatus } from "../features/get-started/kyc/useKycStatus";

function Started() {
  const navigate = useNavigate();
  const { isKycStatus, kycStatus } = useKycStatus();
  const isKycCompleted = isKycFullyCompleted(kycStatus);

  const isSecurityQuestionCompleted =
    kycStatus?.security_question === COMPLETED_STATUS;

  return (
    <div className="container-w">
      <h1 className="text-xl font-semibold">Welcome</h1>
      <p className="text-xs font-medium">
        Get closer to your investment goals, just complete the steps below with
        us.
      </p>

      {isKycStatus ? (
        <Spinner />
      ) : (
        <div className="mt-8 space-y-5 border border-brand-75 py-8 rounded-lg">
          <div
            role="button"
            onClick={() => navigate("/get-started/kyc/personal")}
            className={`flex items-center justify-between pb-3 px-5 border-b border-brand-75 
  ${!isKycCompleted ? "cursor-pointer hover:bg-gray-50" : "cursor-not-allowed opacity-70"}`}
          >
            <div className="flex items-center space-x-5">
              {isKycCompleted ? (
                <HiCheckCircle className="text-brand-green-100 h-10 w-10" />
              ) : (
                <div className="bg-brand-50 text-black text-center flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full">
                  <span className="font-semibold text-xs md:text-sm">1</span>
                </div>
              )}
              <div>
                <h2 className="font-medium text-sm">KYC Completion</h2>
                <p className="text-xs">Tell us more about yourself.</p>
              </div>
            </div>
            {isKycCompleted ? (
              <p className="bg-brand-green-100 text-white text-xs px-5 py-2 rounded-full">
                Completed
              </p>
            ) : (
              <IoMdArrowDropright size={23} />
            )}
          </div>

          <div
            role="button"
            onClick={
              !isSecurityQuestionCompleted
                ? () => navigate("/get-started/security-question")
                : undefined
            }
            className={`flex items-center justify-between pb-3 px-5
  ${
    !isSecurityQuestionCompleted
      ? "cursor-pointer hover:bg-gray-50"
      : "cursor-not-allowed opacity-70"
  }`}
          >
            <div className="flex items-center space-x-5">
              {isSecurityQuestionCompleted ? (
                <HiCheckCircle className="text-brand-green-100 h-10 w-10" />
              ) : (
                <div className="bg-brand-50 text-black text-center flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full">
                  <span className="font-semibold text-xs md:text-sm">2</span>
                </div>
              )}
              <div>
                <h2 className="font-medium text-sm">Security Question</h2>
                <p className="text-xs">
                  Set them up to enhance your account&apos;s two-factor
                  authentication security.
                </p>
              </div>
            </div>
            {isSecurityQuestionCompleted ? (
              <p className="hidden md:block bg-brand-green-100 text-white text-xs px-5 py-2 rounded-full">
                Completed
              </p>
            ) : (
              <IoMdArrowDropright size={23} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Started;
