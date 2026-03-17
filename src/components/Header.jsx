import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  HiArrowRightOnRectangle,
  HiBars3,
  HiMiniIdentification,
  HiOutlineXMark,
  HiUser,
} from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/icons/Sidebar.svg";
import logo from "../assets/images/logo.png";
import { useUser } from "../features/auth/useUser";
import { useSwitchAccounts } from "../features/profile/useSwitchAccounts";

export default function Header({ open, setOpen }) {
  const { user } = useUser();
  const { switchAccounts, isSwitchAccounts } = useSwitchAccounts();
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const linkedAccounts = user?.linked_symplus_ids;
  const hasMultipleAccounts = linkedAccounts?.length > 1;
  const selectedCustomerId =
    queryClient.getQueryData(["selectedAccount"]) ||
    linkedAccounts?.[0]?.CUSTOMER_ID;

  const pageTitle =
    location.pathname.split("/").filter(Boolean).pop() || "dashboard";

  function handleSwitchAccount(customerId) {
    switchAccounts(customerId);
  }

  const formattedTitle = pageTitle
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const APP_STORE_URL =
    "https://apps.apple.com/ng/app/samtl-mobile/id6479705391";
  const PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.samtlng.samtlmobile&hl=en";

  function handleInstallApp() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // iOS (iPhone, iPad, iPod)
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      window.open(APP_STORE_URL, "_blank");
      return;
    }

    // MacBook or macOS desktop (optional)
    if (/Macintosh/.test(ua)) {
      window.open(APP_STORE_URL, "_blank");
      return;
    }

    // Android
    if (/android/i.test(ua)) {
      window.open(PLAY_STORE_URL, "_blank");
      return;
    }

    // Fallback: default to Google Play
    window.open(PLAY_STORE_URL, "_blank");
  }

  function logout() {
    setIsOpen(false);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    queryClient.clear();
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="pb-5 bg-[#F9FAFB] px-6 sm:px-8 py-2.5 z-50 sticky top-0">
      <div className="flex items-center justify-between gap-3">
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden rounded-md"
        >
          {open ? <HiOutlineXMark size={22} /> : <HiBars3 size={22} />}
        </button>

        <div className="lg:flex items-center gap-3 hidden">
          <img src={icon} alt="menu icon" className="w-5 h-5" />
          <h1 className="font-medium text-xs">{formattedTitle}</h1>
        </div>

        {/* SWITCH USER */}
        <div className="flex items-center justify-end gap-4 md:gap-16">
          {hasMultipleAccounts && (
            <>
              {/* Desktop Select */}
              <select
                value={selectedCustomerId || ""}
                className="hidden md:block text-xs border border-brand-25 px-1 rounded-md py-2"
                onChange={(e) => handleSwitchAccount(e.target.value)}
                disabled={isSwitchAccounts}
              >
                {linkedAccounts?.map((acc) => (
                  <option key={acc.CUSTOMER_ID} value={acc.CUSTOMER_ID}>
                    {acc.CUSTOMER_ID} - {acc.CUSTOMER_NAME}
                  </option>
                ))}
              </select>

              {/* Mobile Account Dropdown */}
              <div className="relative md:hidden">
                <button
                  onClick={() => setIsMobileDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 p-2 rounded-md bg-brand-50"
                >
                  <HiMiniIdentification size={20} />
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isMobileDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isMobileDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {linkedAccounts.map((acc) => (
                      <button
                        key={acc.CUSTOMER_ID}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-gray-100"
                        onClick={() => {
                          handleSwitchAccount(acc.CUSTOMER_ID);
                          setIsMobileDropdownOpen(false);
                        }}
                      >
                        {acc.CUSTOMER_ID} - {acc.CUSTOMER_NAME}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* PROFILE */}
          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                className="hover:bg-gray-800 rounded-full cursor-pointer p-2 bg-brand-400 text-white"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <HiUser className="text-md" />
              </button>

              {isOpen && (
                <div className="absolute left-0 mt-5 bg-white shadow-lg rounded-md border border-brand-75 w-36 px-2 pb-5 pt-5 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="w-full px-3 text-left flex gap-2 items-center py-2 text-sm hover:bg-gray-100"
                  >
                    {/* HiUser */}
                    <HiUser size={20} /> Profile
                  </Link>
                  <button
                    className="w-full px-3 text-left flex gap-2 items-center py-2 text-sm hover:bg-gray-100 text-[#a62325]"
                    onClick={logout}
                  >
                    <HiArrowRightOnRectangle size={20} /> Logout
                  </button>
                </div>
              )}
            </div>
            {/* INSTALL APP BTN */}
            <button
              onClick={handleInstallApp}
              className="rounded-md py-2 px-4 bg-brand-50 text-xs hidden md:block cursor-pointer"
            >
              Install App
            </button>
          </div>
          <img src={logo} alt="SAMTL Logo" className="h-12 md:h-16" />
        </div>
      </div>
    </nav>
  );
}
