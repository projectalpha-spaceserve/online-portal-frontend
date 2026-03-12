function FormBtn({ children, ...rest }) {
  return (
    <button
      type="submit"
      {...rest}
      className="w-full text-sm font-semibold p-2 mt-5 rounded-md border-none bg-gradient-to-r from-[#D25355] to-[#A62325] text-white flex items-center justify-center cursor-pointer"
    >
      {children}
    </button>
  );
}

export default FormBtn;
