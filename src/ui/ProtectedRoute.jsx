import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../features/auth/useUser";
import Spinner from "../components/Spinner";
import { COMPLETED_STATUS, isKycFullyCompleted } from "../constants/helper";
import { useKycStatus } from "../features/get-started/kyc/useKycStatus";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isPending } = useUser();
  const { isKycStatus, kycStatus } = useKycStatus();

  const token = localStorage.getItem("auth_token");

  const kycCompleted = isKycFullyCompleted(kycStatus);
  const isSecurityQuestionCompleted =
    kycStatus?.security_question === COMPLETED_STATUS;

  const fullyCompleted = kycCompleted && isSecurityQuestionCompleted;
  const isOnGetStartedPage = location.pathname.startsWith("/get-started");

  useEffect(() => {
    // 🔒 Not logged in → go to login
    if (!token || (!isPending && !isAuthenticated)) {
      navigate("/login", { replace: true });
      return;
    }

    // 🚨 KYC completed but user tries to visit Get Started → send to dashboard
    if (
      isAuthenticated &&
      fullyCompleted &&
      isOnGetStartedPage &&
      !isKycStatus
    ) {
      navigate("/", { replace: true });
    }
  }, [
    token,
    isAuthenticated,
    isPending,
    fullyCompleted,
    isOnGetStartedPage,
    navigate,
    isKycStatus,
  ]);

  // ⏳ Show spinner while auth or KYC status is loading
  if ((isPending && token) || isKycStatus) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // 🔐 KYC Gate Screen (Option A)
  if (isAuthenticated && !fullyCompleted && !isOnGetStartedPage) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-xs md:text-sm mb-4">
          KYC Required!
        </div>

        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-3">
          Kindly Complete Your KYC to Continue
        </h1>

        <p className="text-gray-500 text-xs md:text-sm max-w-md mb-6">
          To access investment products and other features, you must complete
          your identity verification process.
        </p>

        <button
          onClick={() => navigate("/get-started")}
          className="bg-brand-500 text-white text-sm px-6 py-3 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
        >
          Complete KYC
        </button>
      </div>
    );
  }

  // ✅ If authenticated and allowed → render page
  if (isAuthenticated && token) return children;

  return null;
}

// export default function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { isAuthenticated, isPending } = useUser();
//   // const { isKycStatus } = useKycStatus();
//   const { isKycStatus, kycStatus } = useKycStatus();

//   const token = localStorage.getItem("auth_token");

//   const kycCompleted = isKycFullyCompleted(kycStatus);
//   const isOnGetStartedPage = location.pathname.startsWith("/get-started");

//   useEffect(() => {
//     // 🔒 Not logged in → go to login
//     if (!token || (!isPending && !isAuthenticated)) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     // Wait until KYC status is known
//     if (isKycStatus) return;

//     // 🚨 Logged in BUT KYC not complete → force Get Started
//     if (isAuthenticated && !kycCompleted && !isOnGetStartedPage) {
//       navigate("/get-started", { replace: true });
//       return;
//     }

//     // 🚨 KYC completed but user tries to visit Get Started → send to dashboard
//     if (isAuthenticated && kycCompleted && isOnGetStartedPage) {
//       navigate("/", { replace: true });
//     }
//   }, [
//     token,
//     isAuthenticated,
//     isPending,
//     kycCompleted,
//     isOnGetStartedPage,
//     navigate,
//     isKycStatus,
//   ]);

//   // ⏳ Auth loading OR KYC loading
//   if ((isPending && token) || isKycStatus) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <Spinner />
//       </div>
//     );
//   }

//   if (isAuthenticated && token) return children;

//   return null;
// }

// export default function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { isAuthenticated, isPending } = useUser();
//   const { isKycStatus, kycStatus } = useKycStatus();

//   const token = localStorage.getItem("auth_token");
//   const kycCompleted = isKycFullyCompleted(kycStatus?.data);

//   useEffect(() => {
//     if (!token || (!isPending && !isAuthenticated)) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     if (isKycStatus) return;

//     const hasRedirected = sessionStorage.getItem("kyc_redirected");

//     // 👉 Redirect ONLY ONCE after login if KYC not complete
//     if (isAuthenticated && !kycCompleted && !hasRedirected) {
//       sessionStorage.setItem("kyc_redirected", "true");
//       navigate("/get-started", { replace: true });
//     }
//   }, [token, isAuthenticated, isPending, kycCompleted, navigate, isKycStatus]);

//   if ((isPending && token) || isKycStatus) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <Spinner />
//       </div>
//     );
//   }

//   if (isAuthenticated && token) return children;

//   return null;
// }
