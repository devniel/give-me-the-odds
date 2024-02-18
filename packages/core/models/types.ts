export type MillenniumFalcon = {
  // Autonomy of the Millennium Falcon in days.
  autonomy: number;
  // Planet where the Millennium Falcon is on day 0.
  departure: string;
  // Planet where the Millennium Falcon must be at or before countdown.
  arrival: string;
  // Path toward a SQLite database file containing the routes.
  // The path can be either absolute or relative to the location
  // of the millennium-falcon.json file itself.
  routes_db: string;
};

export type BountyHunter = {
  // Name of the planet. It cannot be null or empty.
  planet: string;
  // Day the bounty hunters are on the planet.
  // 0 represents the first day of the mission, i.e. today.
  day: number;
};

export type Empire = {
  // Number of days before the Death Star annihilates Endor
  countdown: number;
  // List of all locations where Bounty Hunter are scheduled to be present.
  bounty_hunters: BountyHunter[];
};

export type Route = {
  origin: string;
  destination: string;
  travel_time: number;
};

export type Itinerary = {
  days: number;
  plan: Route[];
};

/**
 * - wait: represents waiting for certain days in a node
 * - refuel: represents refueling in a node
 * - move: represents moving to a node
 */
export type ItineraryNodeType = "wait" | "refuel" | "move";

export type ItineraryNode = {
  type: ItineraryNodeType;
  origin: string;
  destination: string;
  cost: {
    days: number;
    fuel: number;
  };
  status?: {
    current: {
      days?: number;
      fuel?: number;
      isBountyHunter?: boolean;
      captureProbability?: number;
    };
    total: {
      days?: number;
      fuel?: number;
      captureIntents?: number;
      captureProbability: number;
    };
  };
};

export type ItinerariesSummary = {
  successProbability: number;
  itineraries: string[][];
};
