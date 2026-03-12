import logo from "../assets/images/logo.png";

function OnLoginPage({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen relative overflow-hidden">
      <div className="md:block hidden">
        <div className="loginBg"></div>
      </div>
      <div className="absolute right-8 top-8">
        <div className="flex justify-end items-end">
          <img src={logo} alt="SAMTL logo" className="h-20" />
        </div>
      </div>
      <div className="flex flex-col justify-center w-full h-screen py-8 px-8 md:px-10 mt-10">
        {children}
      </div>
    </div>
  );
}

export default OnLoginPage;
