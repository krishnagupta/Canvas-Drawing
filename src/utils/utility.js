import {
  validCommandWithArgs,
  commandError,
  coordinateLimit,
  validOperation,
} from "../constant/constant";

const initializeMatrix = (width, height) => {
  // 2 is added in both width and height to include border of canvas
  const widhIncludingBorder = width + 2;
  const heightIncludingBorder = height + 2;
  return new Array(widhIncludingBorder)
    .fill()
    .map(() => new Array(heightIncludingBorder).fill());
};

const trimExtraSpace = (value) => {
  return value.replace(/\s+/g, " ").trim();
};

const getCommandInLowerCase = (value) => {
       return value?.toLowerCase()
}

const isInvalidFirstCommand = (value) => {
  if (!Object.keys(validCommandWithArgs).includes(value)) {
    return true;
  }
  return false;
};

const isInvalidCharacter = (value, splitValue) => {
  let coordinates = splitValue.slice(1).join("");
  if(getCommandInLowerCase(splitValue[0]) === validOperation.FILL_COMMAND){
         coordinates = splitValue.slice(1,3).join("")
  }
  if (value.match(/[^a-zA-Z0-9 ]+/) || coordinates.match(/[a-zA-Z]/)) {
    return true;
  }
  return false;
};

const validateInvalidCommandLengthCharacter = (error, value, splitValue) => {
  if (
    validCommandWithArgs[getCommandInLowerCase(splitValue[0])] !== splitValue.length ||
    isInvalidCharacter(value, splitValue)
  ) {
    error.push(commandError.INVALID_COMMAND_ERROR);
  }
};

const isEmptyCommand = (value) => {
  if (value === "") {
    return true;
  }
  return false;
};

const isInvalidCoordinateLimit = (value) => {
  const coordinates = value.slice(1);
  for (let point of coordinates) {
    if (
      point > coordinateLimit.MAX_COORDINATE_LIMIT ||
      point < coordinateLimit.MIN_COORDINATE_LIMIT
    ) {
      return true;
    }
  }
  return false;
};

const isOutOfRangeCoordinate = (width, height, value) => {
  let coordinates = [];
  if (value[0] === validOperation.FILL_COMMAND) {
    coordinates.push({ x: value[1], y: value[2] });
  } else if (
    value[0] === validOperation.CREATE_LINE ||
    value[0] === validOperation.CREATE_RECTANGLE
  ) {
    coordinates.push({ x: value[1], y: value[2] });
    coordinates.push({ x: value[3], y: value[4] });
  }
  for (let point of coordinates) {
    if (point.x >= width || point.y >= height) {
      return true;
    }
  }
  return false;
};

const isCanvasCreated = (width, height) => {
  return width && height ? true : false;
};

const validateCommand = (value, width, height) => {
  const error = [];

  if (isEmptyCommand(value)) {
    error.push(commandError.EMPTY_COMMAND_ERROR);
    return error;
  }
  const valueAfterTrimmed = trimExtraSpace(value);
  const splitValue = valueAfterTrimmed.split(" ");
  const firstCommand = getCommandInLowerCase(splitValue[0]);

  if (isInvalidFirstCommand(firstCommand)) {
    error.push(commandError.FIRST_COMMAND_ERROR);
    return error;
  }
  if (
    firstCommand !== validOperation.CREATE_CANVAS &&
    !isCanvasCreated(width, height)
  ) {
    error.push(commandError.CREATE_CANVAS_ERROR);
    return error;
  }
  if (isInvalidCoordinateLimit(splitValue)) {
    error.push(commandError.COORDINATE_LIMIT_ERROR);
    return error;
  }
  if (isOutOfRangeCoordinate(width, height, splitValue)) {
    error.push(commandError.RANGE_BOUND_ERROR);
    return error;
  }
  validateInvalidCommandLengthCharacter(error, valueAfterTrimmed, splitValue);

  return error;
};

const getSplittedValue = (value) => {
  const result = trimExtraSpace(value);
  const lowerResult = result.toLowerCase();
  const splitResult = lowerResult.split(" ");
  return splitResult;
};

export { initializeMatrix, validateCommand, getSplittedValue };
