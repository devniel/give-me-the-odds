import {
  BountyHunter,
  ItinerariesSummary,
  ItineraryNode,
  Route,
} from "../models/types";

/**
 * Graph containing all possible actions
 * to do between different nodes (planets);
 * actions such as `wait` and `refuel` are also
 * represented as nodes. A path between nodes
 * will represent an itinerary, whose metadata
 * such as `captureProbability` will be used to
 * chose the optimal ones.
 */
export class ItinerariesGraph {

  graph: Map<string, ItineraryNode[]>;

  // Max days to use when searching for an itinerary between `origin` to `destination`
  limitDays: number;

  // Max fuel to use when searching for an itinerary between `origin` to `destination`
  limitAutonomy: number;

  // List of nodes (planets) to consider when calculating the `captureProbability`
  // between `origin` and `destination`
  bountyHunters: BountyHunter[];

  constructor(
    routes: Route[],
    limitDays = 0,
    limitAutonomy = 0,
    bountyHunters: BountyHunter[] = []
  ) {
    this.graph = new Map();
    this.limitDays = limitDays;
    this.limitAutonomy = limitAutonomy;
    this.bountyHunters = bountyHunters;
    routes.forEach((route) => {
      this.addRoute(
        route.origin,
        route.destination,
        route.travel_time,
        route.travel_time
      );
    });
  }

  /**
   * Add all possibe `waits` or `refuel` action nodes
   * local to a certain origin.
   */
  addAllPossibleLocalItineraries(origin: string): void {
    // Add refuel node from Origin to Refuel
    const refuelNodeId = `${origin}_REFUEL_1_DAYS`;
    this.graph.set(refuelNodeId, []);
    this.graph.get(origin)?.push({
      type: "refuel",
      origin,
      destination: refuelNodeId,
      cost: {
        days: 1,
        fuel: 0,
      },
    });
    // Add waits node from Origin to Wait N
    for (let i = 0; i < this.limitDays; i++) {
      // Create wait node id
      const waitNodeId = `${origin}_WAIT_${i + 1}_DAYS`;
      // Add wait node from Origin to Wait #N days
      this.graph.get(origin)?.push({
        type: "wait" as const,
        origin: origin,
        destination: waitNodeId,
        cost: {
          days: i + 1,
          fuel: 0,
        },
      });

      // Add adjacent nodes to wait node
      // To follow same results as examples, only (Wait N) <- (Result) is possible
      // Add wait node from Refuel to Wait #N days
      // wait `i` days
      this.graph.get(refuelNodeId)?.push({
        type: "wait" as const,
        origin: refuelNodeId,
        destination: waitNodeId,
        cost: {
          days: i + 1,
          fuel: 0,
        },
      });
    }
  }

  /**
   * Add all possible itineraries betwen origin node
   * and destination; itineraries include:
   * - moving (move node)
   * - waiting (wait node)
   * - refueling (reful node)
   */
  addAllPossibleUniDirectionalItineraries(
    origin: string,
    destination: string,
    days: number,
    fuel: number
  ): void {
    // Add move between origin and destination
    this.addMoveItinerary(origin, destination, days, fuel);
    // Add moves between wait nodes and destination
    for (let i = 0; i < this.limitDays; i++) {
      const waitNodeId = `${origin}_WAIT_${i + 1}_DAYS`;
      this.addMoveItinerary(waitNodeId, destination, days, fuel);
    }
    // Add move between refuel and destination
    const refuelNodeId = `${origin}_REFUEL_1_DAYS`;
    this.addMoveItinerary(refuelNodeId, destination, days, fuel);
  }

  /**
   * Add a `move` itinerary node to a certain origin
   */
  addMoveItinerary(
    origin: string,
    destination: string,
    days: number,
    fuel: number
  ) {
    if (!this.graph.has(origin)) {
      this.graph.set(origin, []);
    }
    // Add move node
    this.graph.get(origin)?.push({
      type: "move",
      origin,
      destination,
      cost: {
        days,
        fuel,
      },
    });
  }

  /**
   * Add origin/destination nodes if they doesn't exist and
   * a `move` bidirectional node between them.
   */
  addRoute(
    origin: string,
    destination: string,
    days: number,
    fuel: number
  ): void {
    if (!this.graph) {
      this.graph = new Map();
    }
    // Create new origin node and local itineraries if it doesn't exist
    if (!this.graph.has(origin)) {
      this.graph.set(origin, []);
      this.addAllPossibleLocalItineraries(origin);
    }
    // Create new destination node and local itineraries if it doesn't exist
    if (!this.graph.has(destination)) {
      this.graph.set(destination, []);
      this.addAllPossibleLocalItineraries(destination);
    }
    // Create itineraries between origin and destination
    this.addAllPossibleUniDirectionalItineraries(
      origin,
      destination,
      days,
      fuel
    );
    this.addAllPossibleUniDirectionalItineraries(
      destination,
      origin,
      days,
      fuel
    );
  }

  /**
   * Returns all possible itineraries between `origin` and `destination`
   * by using backtracking
   */
  findAllItineraries(
    origin: string,
    destination: string,
    visited: Set<string> = new Set(),
    itinerary: ItineraryNode[] = [],
    currentDays = 0,
    currentFuel = this.limitAutonomy,
    currentCaptureIntents = 0,
    currentCaptureProbability = 0
  ): ItineraryNode[][] {
    visited.add(origin);
    const allItineraries: ItineraryNode[][] = [];

    if (origin === destination) {
      // Make a deep copy of the current itinerary and add it to the list of all itineraries
      // For complex scenarios, we will need to increase stack_size via `node --stack-size=8192`
      allItineraries.push([...itinerary]);
      // Allow revisiting for other paths
      visited.delete(origin);
      return allItineraries;
    }

    const nodes = this.graph.get(origin) || [];

    for (let node of nodes) {
      if (visited.has(node.destination)) continue;

      // Status after reaching destination
      let newCurrentDays = currentDays;
      let newCurrentFuel = currentFuel;
      let newCurrentCaptureProbability = currentCaptureProbability;
      let newCaptureIntents = currentCaptureIntents;
      let isBountyHunter = false;

      // If limitDays is used (countdown related), then check it
      if (this.limitDays != 0) {
        if (currentDays + node.cost.days > this.limitDays) {
          // Not possible to get to destination in the limit days, discard path.
          continue;
        } else {
          newCurrentDays = currentDays + node.cost.days;
        }
      }

      // If limitAutonomy is used (autonomy related), then check it
      if (this.limitAutonomy != 0) {
        if (node.cost.fuel > currentFuel) {
          // Not possible to go to destination because of lack of fuel, discard path.
          continue;
        } else {
          // If destination is refuel, then restart currentFuel
          if (node.type === "refuel") {
            newCurrentFuel = this.limitAutonomy;
            // If destination is not a refuel, then substract the fuel cost
          } else {
            newCurrentFuel = currentFuel - node.cost.fuel;
          }
        }
      }

      // If there is a bounty hunter
      isBountyHunter = this.bountyHunters.some(({ planet, day }) => {
        // For Wait and Refuel the destination is theorically the same planet,
        const dest = node.type != "move" ? node.origin : node.destination;
        return dest === planet && newCurrentDays === day;
      });

      // Use the provided formula to calculate probability of capture
      if (isBountyHunter) {
        newCaptureIntents = currentCaptureIntents + 1;
        newCurrentCaptureProbability =
          currentCaptureProbability +
          9 ** (newCaptureIntents - 1) / 10 ** newCaptureIntents;
      }

      // Add itinerary including status
      itinerary.push({
        ...node,
        status: {
          current: {
            days: newCurrentDays,
            isBountyHunter,
          },
          total: {
            days: newCurrentDays,
            fuel: newCurrentFuel,
            captureProbability: newCurrentCaptureProbability,
          },
        },
      });

      // Search following paths
      const newPaths = this.findAllItineraries(
        node.destination,
        destination,
        visited,
        itinerary,
        newCurrentDays,
        newCurrentFuel,
        newCaptureIntents,
        newCurrentCaptureProbability
      );
      allItineraries.push(...newPaths);
      // Backtrack
      itinerary.pop(); 
    }

    // Backtrack: unmark the start node as visited to explore different paths
    visited.delete(origin); 
    return allItineraries;
  }

  /**
   * Returns the best itineraries based on the odds
   */
  findAllBestItineraries(
    start: string,
    end: string
  ): [number, ItineraryNode[][]] {
    const allItineraries = this.findAllItineraries(start, end);
    let maxSuccessProbability = 0;
    let bestItineraries: ItineraryNode[][] = [];
    allItineraries.forEach((itinerary) => {
      const firstStep = itinerary[0];
      const lastStep = itinerary[itinerary.length - 1];
      // To have same results as example, let's consider `refueling` in the first
      // step of the itinerary not part of a best itinerary
      if (firstStep?.type == "refuel") return;
      // Check success probability
      const successProbability = 1 - lastStep!.status!.total.captureProbability;
      if (successProbability > maxSuccessProbability) {
        bestItineraries = [itinerary];
        maxSuccessProbability = successProbability;
      } else if (successProbability == maxSuccessProbability) {
        bestItineraries.push(itinerary);
      }
    });
    return [maxSuccessProbability, bestItineraries];
  }

  /**
   * Returns a summary of best itineraries, it will find best itineraries and format them
   * using a natural language representation.
   */
  getBestItinerariesSummary(start: string, end: string): ItinerariesSummary {
    const [probability, itineraries] = this.findAllBestItineraries(start, end);
    const summary = {
      successProbability: probability,
      itineraries: itineraries.map((itinerary) =>
        itinerary.map((itineraryStep) => {
          return this.getItineraryDescription(itineraryStep);
        })
      ),
    };
    return summary;
  }

  /**
   * Returns a natural language representation of an ItineraryNode object
   */
  getItineraryDescription(itineraryNode: ItineraryNode): string {
    let description, origin, destination;
    origin = itineraryNode.origin?.split("_")[0];
    destination = itineraryNode.destination?.split("_")[0];
    switch (itineraryNode.type) {
      case "move":
        description = `Travel from ${origin} to ${destination}`;
        break;
      case "refuel":
        description = `Refuel on ${origin}`;
        break;
      case "wait":
        description = `Wait for ${itineraryNode.cost.days} day on ${origin}`;
    }
    if (itineraryNode.status?.current.isBountyHunter) {
      description += ` with 10% chance of being captured on day ${itineraryNode.status?.current.days} on ${destination}`;
    }
    description += ".";
    return description;
  }

  /**
   * Convert graph to a JSON object
   */
  toJSON(): { [key: string]: ItineraryNode[] } {
    const json: { [key: string]: ItineraryNode[] } = {};
    this.graph.forEach((edges, origin) => {
      json[origin] = edges.map((edge) => ({
        type: edge.type,
        origin: edge.origin,
        destination: edge.destination,
        cost: edge.cost,
      }));
    });
    return json;
  }
}
