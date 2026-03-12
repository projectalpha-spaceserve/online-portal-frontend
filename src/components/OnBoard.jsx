import logo from "../assets/images/logo.png";

export default function OnBoard({ children, title }) {
  return (
    <div className="flex min-h-screen">
      {/* Left Image */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-[60%]">
        <div className="registerBg h-full w-full"></div>
        <h2 className="text-3xl w-2/3 absolute left-10 font-semibold mb-2 bottom-10 text-white">
          Manage your financial journey and wealth with us
        </h2>
      </div>

      {/* Right Content */}
      <div className="flex flex-col w-full md:ml-[60%] px-8 lg:px-10 py-10 relative">
        {/* Logo */}
        <div className="absolute top-6 right-10">
          <img src={logo} alt="SAMTL logo" className="h-16" />
        </div>

        {/* Centered Content */}
        <div className="flex flex-col justify-center min-h-screen max-w-md">
          <h1 className="text-xl font-medium capitalize pb-6">{title}</h1>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
