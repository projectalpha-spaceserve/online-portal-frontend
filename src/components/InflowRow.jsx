export default function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <p className="text-xs">{label}</p>
      <h1 className="font-medium text-sm text-right">{value}</h1>
    </div>
  );
}
