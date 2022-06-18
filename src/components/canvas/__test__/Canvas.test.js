import { render } from "../../../utils/testUtility";
import { initializeMatrix } from "../../../utils/utility";
import {
  createLine,
  createRectangle,
} from "../../../utils/canvasUtility";
import Canvas from "../index";

describe("<Canvas />", () => {
  const mockStore = {
    error: [],
    width: 0,
    height: 0,
  };

  it("Should render component", () => {
    const props = {
      matrix: [],
      setMatrix: jest.fn(),
      command: ["c", "12", "12"],
    };
    const { getByTestId } = render(<Canvas {...props} />, mockStore);
    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  it("Should create canvas with command", () => {
    const props = {
      matrix: initializeMatrix(12, 12),
      setMatrix: jest.fn(),
      command: ["c", 12, 12],
    };
    const { queryAllByText } = render(<Canvas {...props} />, mockStore);
    expect(queryAllByText("-").length).toBe(28);
    expect(queryAllByText("|").length).toBe(24);
  });

  it("Should create line with command", () => {
    const props = {
      matrix: createLine([3, 6, 6, 6], initializeMatrix(12, 12)),
      setMatrix: jest.fn(),
      command: ["l", 3, 6, 6, 6],
    };
    const { queryAllByText } = render(<Canvas {...props} />, mockStore);
    expect(queryAllByText("x").length).toBe(4);
  });

  it("Should create rectangle with command", () => {
    const props = {
      matrix: createRectangle([3, 6, 6, 9], initializeMatrix(12, 12)),
      setMatrix: jest.fn(),
      command: ["r", 3, 6, 6, 9],
    };
    const { queryAllByText } = render(<Canvas {...props} />, mockStore);
    expect(queryAllByText("x").length).toBe(12);
  });

  it("Should fill canvas with command", () => {
    const props = {
      matrix: initializeMatrix(4,4),
      setMatrix: jest.fn(),
      command: ["b", 2, 2, "o"],
    };
    const { queryAllByText } = render(<Canvas {...props} />, mockStore);
    expect(queryAllByText("o").length).toBe(16);
  });

  it("Should quit canvas with command", () => {
    const props = {
      matrix: [],
      setMatrix: jest.fn(),
      command: ["q"],
    };
    const { queryByTestId } = render(<Canvas {...props} />, mockStore);
    expect(queryByTestId("canvas_element")).not.toBeInTheDocument();
  });
});
