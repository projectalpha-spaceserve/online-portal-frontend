import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Otp from "./features/auth/Otp";
import ResetPassword from "./features/auth/ResetPassword";
import UpdatePassword from "./features/auth/UpdatePassword";
import VerifyToken from "./features/auth/VerifyToken";
import Invest from "./features/get-started/Invest";
import Kyc from "./features/get-started/Kyc";
import BankDetails from "./features/get-started/kyc/BankDetails";
import NextOfKin from "./features/get-started/kyc/NextOfKin";
import PersonalDetails from "./features/get-started/kyc/PersonalDetails";
import UploadDocuments from "./features/get-started/kyc/UploadDocuments";
import SecurityQuestion from "./features/get-started/SecurityQuestion";
import Username from "./features/get-started/Username";
import Mutuals from "./features/mutual/Mutuals";
import ExistingRegister from "./features/register/ExistingRegister";
import ExistingVerifyOtp from "./features/register/ExistingVerifyOtp";
import NewRegister from "./features/register/NewRegister";
import NewVerifyOtp from "./features/register/NewVerifyOtp";
import Trustee from "./features/trustee/Trustee";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Portfolio from "./pages/Portfolio";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Started from "./pages/Started";
import Stocks from "./pages/Stocks";
import Support from "./pages/Support";
import ProtectedRoute from "./ui/ProtectedRoute";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="login-verify-otp" element={<Otp />} />
          <Route path="verify-email" element={<ResetPassword />} />
          <Route path="verify-otp" element={<VerifyToken />} />
          <Route path="password-reset" element={<UpdatePassword />} />

          <Route path="register" element={<Register />} />
          <Route path="new-customer-otp" element={<NewVerifyOtp />} />
          <Route path="new-customer-register" element={<NewRegister />} />
          <Route path="existing-customer-otp" element={<ExistingVerifyOtp />} />
          <Route
            path="existing-customer-register"
            element={<ExistingRegister />}
          />

          <Route path="*" element={<PageNotFound />} />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="get-started" element={<Started />} />
            <Route path="products" element={<Products />} />
            <Route path="profile" element={<Profile />} />
            <Route path="Portfolio" element={<Portfolio />} />
            <Route path="support" element={<Support />} />
            <Route path="trustees" element={<Trustee />} />
            <Route path="mutual-funds" element={<Mutuals />} />
            <Route path="stocks" element={<Stocks />} />

            {/* <Route path="get-started/kyc/*" element={<Kyc />} /> */}
            <Route path="get-started/kyc" element={<Kyc />}>
              <Route path="personal" element={<PersonalDetails />} />
              <Route path="next-of-kin" element={<NextOfKin />} />
              <Route path="bank" element={<BankDetails />} />
              <Route path="documents" element={<UploadDocuments />} />
            </Route>
            <Route
              path="get-started/security-question"
              element={<SecurityQuestion />}
            />
            <Route path="get-started/username" element={<Username />} />
            <Route path="get-started/invest" element={<Invest />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "14px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f4f4fb",
            color: "#374151",
          },
        }}
      />
      <ReactQueryDevtools
        position="right"
        buttonPosition="bottom-left"
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}

export default App;
