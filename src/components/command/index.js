import { useState } from "react";

import { validateCommand, getSplittedValue } from "../../utils/utility";
import {
  COMMAND_MAX_LENGTH,
  actions,
  ENTER_KEY_CODE,
} from "../../constant/constant";
import CommandError from "../error/CommandError";
import { useStore } from "../../store/store";

const Command = ({ setCommand }) => {
  const [value, setValue] = useState("");
  const [state, dispatch] = useStore();
  const { error } = state;

  const saveCommand = (e) => {
    const { value } = e.target;
    setValue(value);
    if (value === "") {
      dispatch({ type: actions.REMOVE_ERROR, payload: [] });
    }
  };

  const submitCommand = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      const { value } = e.target;
      const { width, height } = state;
      const commandError = validateCommand(value, width, height);
      if (commandError.length) {
        dispatch({
          type: actions.UPDATE_ERROR,
          payload: commandError,
        });
      } else {
        const splitValue = getSplittedValue(value);
        setCommand(splitValue);
        dispatch({ type: actions.REMOVE_ERROR, payload: [] });
      }
    }
  };

  return (
    <div className="group_command">
      <label htmlFor="command">Enter Command:</label>
      <input
        type="text"
        id="command"
        data-testid="command_input"
        name="command"
        className="command_class"
        placeholder="Enter command for canvas"
        maxLength={COMMAND_MAX_LENGTH}
        value={value}
        onChange={saveCommand}
        onKeyDown={submitCommand}
      ></input>
      {error && error.length ? <CommandError error={error} /> : null}
    </div>
  );
};

export default Command;
