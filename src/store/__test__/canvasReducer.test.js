import { render } from "../../utils/testUtility";
import { canvasReducer } from "../canvasReducer";
import { actions } from "../../constant/constant";

describe("Canvas Reducer Test Cases", () => {
  const initialState = {
    error: [],
    width: 0,
    height: 0,
  };

  it("Should return initialState when action is empty", () => {
    const result = canvasReducer(initialState, {});
    expect(result).toEqual(initialState);
  });

  it("Should handle UPDATE_ERROR when error occurred", () => {
    const error = ["Please enter valid format"];
    const result = canvasReducer(initialState, {
      type: actions.UPDATE_ERROR,
      payload: error,
    });
    expect(result.error).toEqual(error);
  });

  it("Should handle REMOVE_ERROR when error occurred", () => {
    const error = [];
    const result = canvasReducer(initialState, {
      type: actions.REMOVE_ERROR,
      payload: error,
    });
    expect(result.error).toEqual(error);
  });

  it("Should handle UPDATE_DIMENSION when error occurred", () => {
    const result = canvasReducer(initialState, {
      type: actions.UPDATE_DIMENSION,
      payload: { width: 12, height: 12 },
    });
    expect(result.width).toEqual(12);
    expect(result.height).toEqual(12);
  });
});
