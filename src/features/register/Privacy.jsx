import logo from "../../assets/images/logo.png";

function Privacy() {
  return (
    <div className="p-5 md:p-8">
      <div className="flex justify-end mt-5 md:mt-3">
        <img src={logo} className="h-18 md:h-20" />
      </div>
      <div className="mt-5">
        <h1 className="mb-4 text-lg lg:text-2xl font-bold">
          SAMTL Data Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm">
          In line with the Nigeria Data Protection Act 2023 (NDPA), SAMTL is
          committed to protecting your personal data and ensuring your provacy
          rights are respected. We collect and use your data to:
        </p>
        <ul className="list-[lower-roman] text-start ml-5 mt-4 text-xs sm:text-sm">
          <li>Comply with legal and regulatory requirements</li>
          <li>Respond to your enquiries and deliver agreed services</li>
          <li>Improve our products, services and customer experience</li>
          <li>
            Communicate updates, offers, or research via email, phone, or mail
          </li>
          <li>Maintain and manage our digital platforms</li>
          <li>Reach you if contact details change</li>
        </ul>
        <p className="mt-5 text-xs sm:text-sm">
          By intercting with us, you consent to the collection, processing, and
          secure storage of your data. We collect only what is necessary, do not
          sell your information, and use it only as described in our privacy
          policy.
        </p>
      </div>
    </div>
  );
}

export default Privacy;
