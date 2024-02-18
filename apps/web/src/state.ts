import { Dispatch } from "react";
import { ThunkDispatch } from "react-hook-thunk-reducer";
import { readFileAsJson } from "@/utils";
import { Empire, ItinerariesSummary, MillenniumFalcon } from "@repo/core";

export type StateModel = {
  status: string;
  millenniumFalcon?: MillenniumFalcon | null;
  empire?: Empire | null;
  results?: ItinerariesSummary | null;
};

export const initialState = {
  status: "idle",
  results: null,
  millenniumFalcon: null,
  empire: null,
};

export const reducer = (
  state: StateModel,
  action: { type: string; payload?: any }
) => {
  const { type, payload } = action;
  const updatedState = structuredClone(state);
  switch (type) {
    case "set_status":
      updatedState.status = payload;
      break;
    case "set_empire":
      updatedState.empire = payload;
      updatedState.status = "loading";
      break;
    case "set_results":
      updatedState.status = "results";
      updatedState.results = payload;
      break;
    case "restart":
      updatedState.status = "idle";
      updatedState.results = null;
  }
  return updatedState;
};

/**
 * Creates a FormData an interacts with `/api/delineation` endpoint
 */
export const sendEmpirePlans = (file: File): ThunkDispatch<any, any> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: "set_status", payload: "loading" });
      const plan = await readFileAsJson<Empire>(file);
      dispatch({ type: "set_empire", payload: plan });
      const response = await fetch("/api/odds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
      });
      const results: ItinerariesSummary = await response.json();
      dispatch({ type: "set_results", payload: results });
    } catch (error) {
      console.error(error);
      dispatch(restart());
    }
  };
};

/**
 * Show again the initial page
 */

export const restart = (): ThunkDispatch<any, any> => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({ type: "restart" });
  };
};
