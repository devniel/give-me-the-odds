import { it } from "@jest/globals";
import {
  example1,
  example2,
  example3,
  example4,
  itinerariesUniverseSmall1DaysJSON,
  itinerariesUniverseSmall2Days1AutonomyJSON,
  itinerariesUniverseSmall2Days2AutonomyJSON,
  itinerariesUniverseSmall2DaysJSON,
  itinerariesUniverseSmall3Days1AutonomyJSON,
  itinerariesUniverseSmall3DaysJSON,
  itinerariesUniverseSmallWithoutWaitsJSON,
  universeJSON,
  universeSmallGraphWithWaitsJSON,
  universeSmallGraphWithoutWaitsJSON,
  universeSmallJSON,
} from "@repo/fixtures";
import { ItinerariesGraph } from "./ItinerariesGraph";

describe("ItinerariesGraph - Using fake universe", () => {
  it("should create a routes graph correctly (without waits)", () => {
    const itinerariesGraph = new ItinerariesGraph(universeSmallJSON);
    const expected = universeSmallGraphWithoutWaitsJSON;
    expect(itinerariesGraph?.toJSON()).toMatchObject(expected);
  });

  it("should create a routes graph correctly (with waits)", () => {
    const itinerariesGraph = new ItinerariesGraph(universeSmallJSON, 1);
    expect(itinerariesGraph?.toJSON()).toMatchObject(
      universeSmallGraphWithWaitsJSON,
    );
  });

  it("should print all itineraries from origin to destination correctly (without waits)", () => {
    const itinerariesGraph = new ItinerariesGraph(universeSmallJSON);
    const allItineraries = itinerariesGraph.findAllItineraries("A", "C");
    expect(allItineraries).toMatchObject(
      itinerariesUniverseSmallWithoutWaitsJSON,
    );
  });

  it("should print all possible itineraries in 1 days from origin to destination correctly", () => {
    const itinerariesGraph = new ItinerariesGraph(universeSmallJSON, 1);
    const allItineraries = itinerariesGraph.findAllItineraries("A", "C");
    expect(allItineraries).toMatchObject(itinerariesUniverseSmall1DaysJSON);
  });

  it("should print all possible itineraries in 2 days from origin to destination correctly", () => {
    const itinerariesGraph = new ItinerariesGraph(universeSmallJSON, 2);
    const allItineraries = itinerariesGraph.findAllItineraries("A", "C");
    expect(allItineraries).toMatchObject(itinerariesUniverseSmall2DaysJSON);
  });

  it("should print all possible itineraries in 3 days from origin to destination correctly", () => {
    const itinerariesGraph = new ItinerariesGraph(universeSmallJSON, 3);
    const allItineraries = itinerariesGraph.findAllItineraries("A", "C");
    expect(allItineraries).toMatchObject(itinerariesUniverseSmall3DaysJSON);
  });

  it("should print all possible itineraries in 1 days from origin to destination correctly", () => {
    const itinerariesGraph = new ItinerariesGraph(universeSmallJSON, 1);
    const allItineraries = itinerariesGraph.findAllItineraries("A", "C");
    expect(allItineraries).toMatchObject(itinerariesUniverseSmall1DaysJSON);
  });

  it("should print all possible itineraries in 2 days with an autonomy of 1 day from origin to destination correctly", () => {
    const itinerariesGraph = new ItinerariesGraph(universeSmallJSON, 2, 1);
    const allItineraries = itinerariesGraph.findAllItineraries("A", "C");
    expect(allItineraries).toMatchObject(
      itinerariesUniverseSmall2Days1AutonomyJSON,
    );
  });

  it("should print all possible itineraries in 2 days with an autonomy of 2 day from origin to destination correctly", () => {
    const itinerariesGraph = new ItinerariesGraph(universeSmallJSON, 2, 2);
    const allItineraries = itinerariesGraph.findAllItineraries("A", "C");
    expect(allItineraries).toMatchObject(
      itinerariesUniverseSmall2Days2AutonomyJSON,
    );
  });

  it("should include refuel in the itinerary to get to destination under 3 days limit and 1 days of autonomy", () => {
    const itinerariesGraph = new ItinerariesGraph(universeSmallJSON, 3, 1);
    const allItineraries = itinerariesGraph.findAllItineraries("A", "C");
    expect(allItineraries).toMatchObject(
      itinerariesUniverseSmall3Days1AutonomyJSON,
    );
  });
});

describe("ItinerariesGraph - Using example universe", () => {
  it("should create a routes graph correctly", () => {
    const itinerariesGraph = new ItinerariesGraph(universeJSON, 7, 6);
    const allItineraries = itinerariesGraph.findAllItineraries(
      "Tatooine",
      "Endor",
    );
    expect(itinerariesGraph).toBeTruthy();
    expect(allItineraries).toBeTruthy();
  });
  it.each([example1, example2, example3, example4])(
    "should return a summary of best itineraries",
    ({ empireJSON, millenniumFalconJSON, universeJSON, resultsJSON }) => {
      const limitDays = empireJSON.countdown;
      const limitAutonomy = millenniumFalconJSON.autonomy;
      const bountyHunters = empireJSON.bounty_hunters;
      const itinerariesGraph = new ItinerariesGraph(
        universeJSON,
        limitDays,
        limitAutonomy,
        bountyHunters,
      );
      const summary = itinerariesGraph.getBestItinerariesSummary(
        millenniumFalconJSON.departure,
        millenniumFalconJSON.arrival,
      );
      expect(summary.successProbability).toEqual(
        resultsJSON.successProbability,
      );
      resultsJSON.itineraries.forEach((itinerary) => {
        expect(summary.itineraries).toContainEqual(itinerary);
      });
    },
  );
});
