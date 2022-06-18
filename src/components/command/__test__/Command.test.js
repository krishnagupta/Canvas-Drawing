import { render, fireEvent } from "../../../utils/testUtility";
import {
  commandError,
  coordinateLimit,
  validCommandWithArgs,
  validOperation,
} from "../../../constant/constant";
import Command from "../index";

const setup = (mockStore) => {
  const props = {
    setCommand: jest.fn(),
  }
  const utils = render(<Command {...props} />, mockStore);
  const input = utils.queryByTestId("command_input");
  const errorLabel = utils.queryByTestId("error_label");

  return {
    input,
    errorLabel,
    ...utils,
  };
};

describe("Command component test cases", () => {
  const mockStore = {
    error: [],
    width: 0,
    height: 0,
  };
  it("Should render Command component with empty input element", () => {
    const { input } = setup(mockStore);
    expect(input).toHaveTextContent("");
  });

  it("Should show EMPTY_COMMAND_ERROR on hitting enter without typing any command", () => {
    const updatedStore = {
      ...mockStore,
      error: [commandError.EMPTY_COMMAND_ERROR],
    };
    const { input, errorLabel } = setup(updatedStore);
    fireEvent.keyDown(input, {
      target: { value: "" },
      key: "keyDown",
      keyCode: 13,
    });
    expect(errorLabel).toHaveTextContent(commandError.EMPTY_COMMAND_ERROR);
  });

  it("Should show INVALID_COMMAND_ERROR on hitting special character", () => {
    const updatedStore = {
      ...mockStore,
      error: [commandError.INVALID_COMMAND_ERROR],
    };
    const { input, errorLabel } = setup(updatedStore);
    fireEvent.keyDown(input, {
      target: { value: "c @" },
      key: "keyDown",
      keyCode: 13,
    });
    expect(errorLabel).toHaveTextContent(commandError.INVALID_COMMAND_ERROR);
  });

  it(`Should show FIRST_COMMAND_ERROR on hitting character outside ${Object.keys(
    validCommandWithArgs
  )} `, () => {
    const updatedStore = {
      ...mockStore,
      error: [commandError.FIRST_COMMAND_ERROR],
    };
    const { input, errorLabel } = setup(updatedStore);
    fireEvent.keyDown(input, {
      target: { value: "1 12 12" },
      key: "keyDown",
      keyCode: 13,
    });
    expect(errorLabel).toHaveTextContent(commandError.FIRST_COMMAND_ERROR);
  });

  it(`Should show COORDINATE_LIMIT_ERROR on hitting coordinates below ${coordinateLimit.MIN_COORDINATE_LIMIT} and above ${coordinateLimit.MAX_COORDINATE_LIMIT}`, () => {
    const updatedStore = {
      ...mockStore,
      error: [commandError.COORDINATE_LIMIT_ERROR],
    };
    const { input, errorLabel } = setup(updatedStore);
    fireEvent.keyDown(input, {
      target: { value: "c 55 55" },
      key: "keyDown",
      keyCode: 13,
    });
    expect(errorLabel).toHaveTextContent(commandError.COORDINATE_LIMIT_ERROR);
  });

  it(`Should show CREATE_CANVAS_ERROR on hitting coordinates first command apart from ${validOperation.CREATE_CANVAS}`, () => {
    const updatedStore = {
      ...mockStore,
      error: [commandError.CREATE_CANVAS_ERROR],
    };
    const { input, errorLabel } = setup(updatedStore);
    fireEvent.keyDown(input, {
      target: { value: "l 4 6 6 6" },
      key: "keyDown",
      keyCode: 13,
    });
    expect(errorLabel).toHaveTextContent(commandError.CREATE_CANVAS_ERROR);
  });

  it(`Should show RANGE_BOUND_ERROR on hitting coordinates greater than canvas size`, () => {
    const updatedStore = {
      ...mockStore,
      width: 12,
      height: 12,
      error: [commandError.RANGE_BOUND_ERROR],
    };
    const { input, errorLabel } = setup(updatedStore);
    fireEvent.keyDown(input, {
      target: { value: "l 42 12 30 12" },
      key: "keyDown",
      keyCode: 13,
    });
    expect(errorLabel).toHaveTextContent(commandError.RANGE_BOUND_ERROR);
  });

  it(`Should not show any error if entered command is correct`, () => {
    const updatedStore = {
      ...mockStore,
      width: 12,
      height: 12,
      error: [],
    };
    const { input, errorLabel } = setup(updatedStore);
    fireEvent.keyDown(input, {
      target: { value: "l 2 3 6 3" },
      key: "keyDown",
      keyCode: 13,
    });
    expect(errorLabel).not.toBeInTheDocument()
  });
});
