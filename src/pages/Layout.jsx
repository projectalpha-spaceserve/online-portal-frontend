import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useQueryClient } from "@tanstack/react-query";
import useAutoLogout from "../hooks/useAutoLogout";

export default function Layout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  function logout() {
    localStorage.removeItem("auth_token");
    queryClient.clear();
    navigate("/login", { replace: true });
  }

  useAutoLogout(logout, 120000);

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} />
      <main
        className={`
    flex-1 min-w-0 bg-white min-h-screen
    transition-all duration-300 ease-in-out
    ${open ? "lg:ml-58" : "lg:ml-16"}
  `}
      >
        <Header setOpen={setOpen} />
        <div className="py-8 px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
