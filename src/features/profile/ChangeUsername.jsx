function ChangeUsername() {
  return (
    <div>
      <form className="space-y-5">
        <div className="">
          <label className="text-xs">Enter Password:</label>
          <input
            type="text"
            className="border border-brand-75 block py-2 px-5 w-full rounded-md mt-1"
          />
        </div>
        <div className="">
          <label className="text-xs">Current Username:</label>
          <input
            type="text"
            className="border border-brand-75 block py-2 px-5 w-full rounded-md mt-1"
          />
        </div>
        <div className="">
          <label className="text-xs">New Username:</label>
          <input
            type="text"
            className="border border-brand-75 block py-2 px-5 w-full rounded-md mt-1"
          />
        </div>
        <div className="flex gap-5 items-center justify-end pt-5">
          <button className="bg-brand-400 text-white py-2 px-5 rounded-md">
            Submit
          </button>
          <button className="border border-brand-400 text-brand-400 py-2 px-5 rounded-md">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangeUsername;
