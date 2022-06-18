import { actions } from "../constant/constant";

export const initialState = {
  error: [],
  width: 0,
  height: 0,
};

export const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_ERROR:
      return { ...state, error: [...action.payload] };

    case actions.REMOVE_ERROR:
      return { ...state, error: [] };

    case actions.UPDATE_DIMENSION:
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
      };

    default:
      return state;
  }
};
