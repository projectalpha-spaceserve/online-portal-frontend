import logo from "../../assets/images/logo.png";
function CustomerConsent() {
  return (
    <div className="p-5 md:p-8">
      <div className="flex justify-end mt-5 md:mt-3">
        <img src={logo} className="h-18 md:h-20" />
      </div>
      <div className="mt-5">
        <h1 className="mb-4 text-lg lg:text-2xl font-bold">
          Customer's Consent Agreement
        </h1>
        <p className="mb-5 text-xs sm:text-sm">
          Where transaction requests, instructions, or service communications
          are sent by email or other approved electronic means, you agree that
          SAMTL may rely on such communications subject to its internal review
          and control processes. You hereby indemnify and hold SAMTL harmless
          against losses, liabilities, damages, claims, costs, or expenses,
          including legal fees, arising from or connected with acting on such
          electronic instructions, whether such instructions are genuine,
          mistaken, incomplete, fraudulent, or unauthorized.
        </p>

        <p className="text-xs sm:text-sm">
          This indemnity shall remain binding on you, your personal
          representatives, successors, and assigns, and shall be governed by the
          laws of the Federal Republic of Nigeria.
        </p>
      </div>
    </div>
  );
}

export default CustomerConsent;
