import { getAllRoutes, useDb } from "./db/db";
import { ItinerariesGraph } from "./lib/ItinerariesGraph";
import { Empire, MillenniumFalcon } from "./models/types";

/**
 * Returns the probability of success that the Millenium Falcon reaches the destination planet
 * before the Empire destroys it, also considering the probability of being captured by bounty hunters.
 */
export const getOdds = async (
  millenniumFalcon: MillenniumFalcon,
  empire: Empire,
) => {
  const db = await useDb(millenniumFalcon.routes_db);
  const routes = await getAllRoutes(db);
  const limitDays = empire.countdown;
  const limitAutonomy = millenniumFalcon.autonomy;
  const bountyHunters = empire.bounty_hunters;
  const itinerariesGraph = new ItinerariesGraph(
    routes,
    limitDays,
    limitAutonomy,
    bountyHunters,
  );
  const summary = itinerariesGraph.getBestItinerariesSummary(
    millenniumFalcon.departure,
    millenniumFalcon.arrival,
  );
  return summary;
};

export * from "./models/types";
export * from "./models/schemas";
