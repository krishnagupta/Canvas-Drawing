import { useEffect, useContext } from "react";

import CanvasRow from "./CanvasRow";
import {
  commandOperation,
  getCanvasWidth,
  getCanvasHeight,
} from "../../utils/canvasUtility";
import { useStore } from "../../store/store";
import { actions } from "../../constant/constant";

const Canvas = ({ matrix, setMatrix, command }) => {
  const [state, dispatch] = useStore();
  const { width, height } = state;
  useEffect(() => {
    commandOperation(command, matrix, setMatrix);
  }, [command]);

  useEffect(() => {
    const width = getCanvasWidth(matrix);
    const height = getCanvasHeight(matrix);
    dispatch({
      type: actions.UPDATE_DIMENSION,
      payload: { width, height },
    });
  }, [matrix]);

  return (
    <div data-testid="canvas">
      {matrix &&
        matrix.map((row, i) => (
          <CanvasRow
            key={`cr-${i}`}
            row={row}
            width={width}
            height={height}
            index={i}
          />
        ))}
    </div>
  );
};

export default Canvas;
