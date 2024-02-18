import { v4 as uuidv4 } from 'uuid';

export const ItinerarySteps = ({ itinerary }: { itinerary: string[] }) => {
  return (
    <div className="flex flex-col text-start p-10">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {itinerary.map((step, idx) => (
          <li className={`mb-10 ms-6`} key={uuidv4()}>
            <span className="absolute flex items-center justify-center w-6 h-6 bg-black rounded-full -start-3 ring-8 ring-black">
              ⚡️
            </span>
            <span className="mb-1 text-4xl text-white">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
