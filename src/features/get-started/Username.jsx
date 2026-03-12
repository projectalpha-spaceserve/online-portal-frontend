import Btn from "../../components/Btn";
import GoBackBtn from "../../components/GoBackBtn";

function Username() {
  return (
    <div>
      <div className="mb-5">
        <GoBackBtn />
      </div>

      <div className="rounded-2xl border border-brand-150 p-10 ">
        <h1 className="font-semibold text-lg">Personalized your username</h1>
        <p className="text-xs mb-4 pt-1">Change your username for easy login</p>
        <form className="space-y-5 ">
          <div className="">
            <label className="text-xs font-medium text-brand-850">
              Current Username
            </label>
            <input
              type="text"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            />
          </div>
          <div className="">
            <label className="text-xs font-medium text-brand-850">
              New username
            </label>
            <input
              type="text"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            />
          </div>

          <div className="flex gap-5 items-center justify-end pt-5">
            <Btn>Submit</Btn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Username;
