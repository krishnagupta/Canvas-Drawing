const border = {
  HORIZONTAL_LINE: "-",
  VERTICAL_LINE: "|",
};

const COMMAND_MAX_LENGTH = 30;
const ENTER_KEY_CODE = 13;

const coordinateLimit = {
  MAX_COORDINATE_LIMIT: 50,
  MIN_COORDINATE_LIMIT: 1,
};

const validCommandWithArgs = {
  c: 3,
  l: 5,
  r: 5,
  b: 4,
  q: 1,
};

const validOperation = {
  CREATE_CANVAS: "c",
  CREATE_LINE: "l",
  CREATE_RECTANGLE: "r",
  FILL_COMMAND: "b",
  QUIT_COMMAND: "q",
};

const commandError = {
  EMPTY_COMMAND_ERROR: "Please enter command",
  FIRST_COMMAND_ERROR: `Please enter first command from ${Object.keys(
    validCommandWithArgs
  )}`,
  INVALID_COMMAND_ERROR: "Please enter command with valid coordinates",
  COORDINATE_LIMIT_ERROR: `Please enter coordinate between ${coordinateLimit.MIN_COORDINATE_LIMIT} and ${coordinateLimit.MAX_COORDINATE_LIMIT}`,
  RANGE_BOUND_ERROR: "Please enter coordinate less than canvas size",
  CREATE_CANVAS_ERROR: "Please create canvas first",
};

const actions = {
  UPDATE_ERROR: "UPDATE_ERROR",
  REMOVE_ERROR: "REMOVE_ERROR",
  UPDATE_DIMENSION: "UPDATE_DIMENSION",
};

export {
  border,
  COMMAND_MAX_LENGTH,
  coordinateLimit,
  validCommandWithArgs,
  commandError,
  validOperation,
  actions,
  ENTER_KEY_CODE,
};
