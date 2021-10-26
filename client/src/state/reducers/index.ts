import { Action } from './interfaces';
import { ActionType } from '../actions/names';

const initialState = 'admin';

const rootReducer = (state = initialState, action: Action) => {
  switch(action.type) {
    case ActionType.SETROLE : return state = action.payload;
    // case ActionType.DECREMENT: return state - 1;
    case ActionType.RESET: return state = "";
    default: return state;
  }
}

export default rootReducer;
