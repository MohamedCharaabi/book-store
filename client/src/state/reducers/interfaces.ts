import { ActionType } from '../actions/names';

interface setRoleAction {
  type: ActionType.SETROLE,
  payload: string,
}

interface DecrementAction {
  type: ActionType.DECREMENT,
  payload: number,
}

interface ResetAction {
  type: ActionType.RESET,
  payload: number,
}

export type Action = setRoleAction | DecrementAction | ResetAction
