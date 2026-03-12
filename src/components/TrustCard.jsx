function TrustCard({ trust, onClick, disabled }) {
  return (
    <div
      onClick={onClick}
      role="button"
      className={`relative max-h-50 lg:max-h-max overflow-hidden rounded-lg transition-all duration-300 
        ${
          disabled
            ? "opacity-60 cursor-not-allowed pointer-events-none"
            : "cursor-pointer hover:scale-105 hover:shadow-xs"
        }`}
    >
      <img
        src={trust.image}
        alt={trust.name}
        className="h-full w-full object-fill transition-transform duration-300 hover:scale-110"
      />

      {/* Optional subtle overlay on hover */}
      {!disabled && (
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300" />
      )}
    </div>
  );
}

export default TrustCard;

// function TrustCard({ trust, onClick, disabled }) {
//   return (
//     <div
//       onClick={onClick}
//       role="button"
//       className={`relative h-[200px] ${disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}
//     >
//       <img src={trust.image} className="h-[70%] w-full" />
//       <div className="flex gap-5 bg-brand-400 text-white py-3 px-5 rounded-2xl absolute bottom-4 right-5">
//         <div className="">
//           <p className="text-xs font-bold">14%</p>
//           <p className="text-[10px] font-medium">Annual Yield</p>
//         </div>
//         <div className="">
//           <p className="text-xs font-bold">N50,000.00</p>
//           <p className="text-[10px] font-medium">Min. Investment</p>
//         </div>
//       </div>
//     </div>
//   );
// }
