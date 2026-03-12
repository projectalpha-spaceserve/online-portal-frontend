function Btn({ onClick, children, props }) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-[#a62325] hover:bg-[#8a1d1f] px-4 py-2 text-xs text-white cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}

export default Btn;
