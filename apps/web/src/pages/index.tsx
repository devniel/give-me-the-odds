import useThunkReducer from "react-hook-thunk-reducer";
import { InputFile } from "@/components/InputFile";
import { ItineraryOdds } from "@/components/ItineraryOdds";
import { ItineraryInfo } from "@/components/ItineraryInfo";
import { MillenniumFalcon } from "@repo/core";
import { ItinerarySteps } from "@/components/ItinerarySteps";
import { soloist } from "@/fonts";
import {
  StateModel,
  reducer,
  initialState,
  sendEmpirePlans,
  restart,
} from "@/state";
import Layout from "@/components/layouts/RootLayout";
import type { GetServerSideProps } from "next";
import { v4 as uuidv4 } from "uuid";

export const getServerSideProps = (async (context) => {
  try {
    const baseURL = process.env.BASE_URL || `http://localhost:3000`;
    const res = await fetch(`${baseURL}/api/millenniumFalcon`);
    const millenniumFalcon: MillenniumFalcon = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return { props: { millenniumFalcon } };
  } catch (e) {
    console.log('error:', e)
    return { props: { millenniumFalcon: null } };
  }
}) satisfies GetServerSideProps<{
  millenniumFalcon: MillenniumFalcon | null;
}>;

export default function Home({
  millenniumFalcon,
}: {
  millenniumFalcon: MillenniumFalcon;
}) {
  const [state, dispatch] = useThunkReducer<StateModel, any>(reducer, {
    ...initialState,
    millenniumFalcon,
  });
  const handleFile = (file: File): void => {
    dispatch(sendEmpirePlans(file));
  };
  return (
    <Layout>
      <div className="w-full h-full flex items-center justify-center">
        <div className="px-4 py-5 sm:p-6 flex flex-col gap-2">
          {state.status == "loading" && (
            <h3 className="mt-2 text-6xl font-semibold uppercase">
              Analysing plans...
            </h3>
          )}
          {state.status == "idle" && (
            <div className="overflow-hidden rounded-lg shadow text-yellow-400 text-center">
              <h3 className="mt-2 text-6xl font-semibold uppercase">
                Give me the odds
              </h3>
              <p className="mt-1 mb-10 text-2xl text-white">
                Please upload the Empire plans
              </p>
              <InputFile onChange={handleFile} />
            </div>
          )}
          {state.status == "results" && state.results && (
            <div className="flex flex-col h-screen p-10">
              <div className="w-full flex justify-center items-center fixed bottom-0 p-5 left-0 bg-black z-10">
                <button
                  className="inline-flex items-center rounded-xl border-yellow-400 border-2 px-6 py-4 text-2xl text-white cursor-pointer hover:bg-yellow-400 hover:text-yellow-800"
                  onClick={() => dispatch(restart())}
                >
                  RESTART
                </button>
              </div>
              <div>
                <ItineraryOdds probability={state.results.successProbability} />
                <div className="h-1 w-full bg-yellow-400 mb-5 mt-10"></div>
                <div className="flex gap-5">
                  <ItineraryInfo
                    label="COUNTDOWN"
                    value={`${state.empire?.countdown}`}
                  />
                  <ItineraryInfo
                    label="AUTONOMY"
                    value={`${state.millenniumFalcon?.autonomy}`}
                  />
                  <ItineraryInfo
                    label="ITINERARIES"
                    sufix=""
                    value={`${state.results.itineraries.length}`}
                  />
                </div>
                <div className="h-1 w-full bg-yellow-400 mb-5"></div>
              </div>
              <div className="flex flex-col gap-5 flex-1 pb-16">
                {state.results.itineraries.length > 5 && (
                  <h1
                    className={`text-2xl font-extrabold text-yellow-700 ${soloist.className} mb-2`}
                  >
                    Itineraries examples
                  </h1>
                )}
                {state.results.itineraries.slice(0, 5).map((itinerary, idx) => (
                  <div key={uuidv4()}>
                    <h1
                      className={`text-3xl text-yellow-400 ${soloist.className}`}
                    >
                      Itinerary {idx + 1}
                    </h1>
                    <ItinerarySteps itinerary={itinerary} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
