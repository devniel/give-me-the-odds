import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import { Route } from "../models/types";

export const useDb = async (path: string) => {
  return open({
    filename: path,
    driver: sqlite3.cached.Database,
  });
};

export const getAllRoutes = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
): Promise<Route[]> => {
  const routes = await db.all("SELECT * FROM routes");
  return routes;
};

export const getRouteByOrigin = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
  origin: string,
): Promise<Route[]> => {
  const routes = await db.all("SELECT * FROM routes WHERE origin = ?", [
    origin,
  ]);
  return routes;
};

export const getRouteByDestination = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
  destination: string,
): Promise<Route[]> => {
  const routes = await db.all("SELECT * FROM routes WHERE destination = ?", [
    destination,
  ]);
  return routes;
};

export const getRouteByTravelTime = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
  travelTime: number,
): Promise<Route[]> => {
  const routes = await db.all("SELECT * FROM routes WHERE travel_time = ?", [
    travelTime,
  ]);
  return routes;
};
