import sqlite3 from "sqlite3";
import { Database } from "sqlite";
import {
  getAllRoutes,
  getRouteByOrigin,
  getRouteByDestination,
  getRouteByTravelTime,
  useDb,
} from "./db";
import { universeJSON } from "@repo/fixtures";

describe("db", () => {
  let db: Database<sqlite3.Database, sqlite3.Statement>;

  beforeAll(async () => {
    db = await useDb("../fixtures/common/universe.db");
  });

  it("should connect correctly to the db", async () => {
    expect(db).toBeTruthy();
  });

  it("should get all routes correctly", async () => {
    const routes = await getAllRoutes(db);
    expect(routes).toMatchObject(universeJSON);
  });

  it("should get routes by origin correctly", async () => {
    const origin = "Tatooine";
    const routes = await getRouteByOrigin(db, origin);
    expect(routes).toMatchObject([
      { origin: "Tatooine", destination: "Dagobah", travel_time: 6 },
      { origin: "Tatooine", destination: "Hoth", travel_time: 6 },
    ]);
  });

  it("should get routes by destination correctly", async () => {
    const destination = "Hoth";
    const routes = await getRouteByDestination(db, destination);
    expect(routes).toMatchObject([
      { origin: "Dagobah", destination: "Hoth", travel_time: 1 },
      { origin: "Tatooine", destination: "Hoth", travel_time: 6 },
    ]);
  });

  it("should get routes by travel time correctly", async () => {
    const travelTime = 6;
    const routes = await getRouteByTravelTime(db, travelTime);
    expect(routes).toBeTruthy();
    expect(routes).toMatchObject([
      { origin: "Tatooine", destination: "Dagobah", travel_time: 6 },
      { origin: "Tatooine", destination: "Hoth", travel_time: 6 },
    ]);
  });

  afterAll(async () => {
    await db.close();
  });
});
