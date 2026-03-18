import logo from "../../assets/images/logo.png";

function Terms() {
  return (
    <div className="p-5 md:p-8">
      <div className="flex justify-end mt-5 md:mt-3">
        <img src={logo} className="h-18 md:h-20" />
      </div>
      <div className="mt-5">
        <h1 className="mb-4 text-lg lg:text-2xl font-bold">
          General Terms & Disclamers
        </h1>
        <ul className="list-[lower-roman] ml-5 text-xs sm:text-sm space-y-1">
          <li className="">
            SAMTL will only process investments upon receipt of cleared funds
            and complete documentation.
          </li>
          <li>
            In accordance with the Money Laundering (Prevention and Prohibition)
            Act, 2022, and relevant SEC regulations, SAMTL reserves the right to
            obtain all required documentation before processing any refund where
            Client chooses to cancel an investment after depositing funds but
            prior to completing documentation.
          </li>
          <li>
            SAMTL shall not be liable for any delay, malfunction, or error due
            to eletronic or communication network failures.
          </li>
          <li>
            Withdrawal requests will be processed within 24-48 hours. SAMTL is
            not liable for delays caused by banks.
          </li>
          <li>
            SAMTL will not accept or process fund receipts or withdrawals
            involving third-party accounts.
          </li>
          <li>
            Clients are solely responsible for the security of their online
            password.
          </li>
          <li>
            SAMTL will not make reasonable efforts to maintain system availabily
            but does not guarantee uniterrupted service orsecurity from hackers.
          </li>
        </ul>

        <h1 className="mb-4 mt-5 text-lg lg:text-xl font-bold">
          Statement Request and Applicable Charges
        </h1>
        <ul className="list-[lower-roman] ml-5 text-xs sm:text-sm space-y-1">
          <li>
            Customers may request ad-hoc account statements, whethe in physical
            or electronic form. Such requests shall attract the applicable
            charges set out in SAMTL's Schedule of Charges(as amended from time
            to time), and I/We hereby authorize SAMTL to debit such charges
            directly from my/our account.
          </li>
          <li>
            SAMTL shall not be liable for any delays or interruptions in the
            delivery of statements arising from circumstances beyond its
            reasonable control.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Terms;
