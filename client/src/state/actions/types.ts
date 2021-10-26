import { ActionType } from "./names";

export const setRole = () => {
  return { type: ActionType.SETROLE, payload: "admin" }
}

export const decrement = () => {
  return { type: ActionType.DECREMENT };
}

export const reset = () => {
  return { type: ActionType.RESET };
}
