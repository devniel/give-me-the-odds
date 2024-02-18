export const ItineraryInfo = ({
  label,
  value,
  sufix = "days",
}: {
  label: string;
  value: string;
  sufix?: string;
}) => {
  return (
    <div className="flex flex-col text-start mb-5">
      <span className="text-sm font-light text-yellow-400">{label}</span>
      <div>
        <span className="text-6xl">{value}</span>
        <span  className="text-2xl">{sufix}</span>
      </div>
    </div>
  );
};
