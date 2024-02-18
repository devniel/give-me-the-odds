export const ItineraryOdds = ({ probability }: { probability: number }) => {
  return (
    <div className="flex flex-col text-center mb-5">
      <span className="text-lg font-light text-yellow-400 mb-2">
        PROBABILITY OF SUCCESS
      </span>
      <div className="flex flex-col">
        <span className={`text-8xl text-white`}>
          {Math.floor(probability * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
};
