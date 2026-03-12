function BtnOutline({ onClick, children, props }) {
  return (
    <button
      onClick={onClick}
      className="rounded border border-[#a62325] px-4 py-2 text-xs text-[#a62325] cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}

export default BtnOutline;
