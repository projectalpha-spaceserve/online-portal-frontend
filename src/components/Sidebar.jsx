import { FaHandsHelping } from "react-icons/fa";
import { HiHome, HiMiniClock, HiUser, HiUserGroup } from "react-icons/hi2";
import { RiFundsFill, RiStockFill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { COMPLETED_STATUS, isKycFullyCompleted } from "../constants/helper";
import { useKycStatus } from "../features/get-started/kyc/useKycStatus";

const menuItems = [
  { name: "Get Started", href: "/get-started", icon: <HiMiniClock /> },
  { name: "Dashboard", href: "/", icon: <HiHome /> },
  { name: "Trustees", href: "/trustees", icon: <FaHandsHelping /> },
  { name: "Mutual Funds", href: "/mutual-funds", icon: <RiFundsFill /> },
  { name: "Stocks", href: "/stocks", icon: <RiStockFill /> },
  { name: "Profile", href: "/profile", icon: <HiUser /> },
  { name: "Support", href: "/support", icon: <HiUserGroup /> },
];

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const { kycStatus } = useKycStatus();
  const kycCompleted = isKycFullyCompleted(kycStatus);
  const isSecurityQuestionCompleted =
    kycStatus?.security_question === COMPLETED_STATUS;

  const fullyCompleted = kycCompleted && isSecurityQuestionCompleted;

  const filteredMenu = menuItems.filter((item) => {
    if (item.name === "Get Started" && fullyCompleted) return false;
    return true;
  });

  return (
    <>
      {/* 🔥 Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* 🔥 Sidebar */}
      <aside
        className={`
  fixed top-0 left-0 h-screen bg-[#F9FAFB] text-black pt-[20%] sm:pt-[14%] md:pt-[11%] lg:pt-[8%]
  transition-transform duration-300 ease-in-out z-40
  lg:translate-x-0 lg:w-50
  ${open ? "translate-x-0" : "-translate-x-full"}
`}
      >
        {/* Navigation */}
        <nav className="px-5 lg:px-3 py-4">
          <ul className="flex flex-col gap-2">
            {filteredMenu.map(({ name, href, icon }) => {
              const isActive =
                (href === "/" && location.pathname === "/") ||
                (href !== "/" && location.pathname.startsWith(href));

              return (
                <li key={name}>
                  <NavLink
                    to={href}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setOpen(false);
                      }
                    }}
                    className={`flex items-center text-center rounded p-2 gap-x-3 w-full transition-colors duration-200 ${
                      isActive
                        ? "bg-brand-400 text-white font-semibold"
                        : "hover:bg-brand-50"
                    }`}
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="text-xs">{name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
