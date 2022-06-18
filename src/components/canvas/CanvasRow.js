import CanvasElement from "./CanvasElement";
import Line from "../shapes/Line";
import { border } from "../../constant/constant";

const CanvasRow = ({ row, index, width, height}) => {

  return (
      <div>
        {row.map((col, j) => {

          if (index === 0 || index === width-1) {
            return <Line line={border.HORIZONTAL_LINE} key={`${index}-i-${j}`} />;
          }
          if (j === 0 || j === height-1) {
            return <Line line={border.VERTICAL_LINE} key={`${j}-j-${index}`} />;
          }
          return <CanvasElement col={col} key={`ce-${j}`} />;
        })}
      </div>
  );
};

export default CanvasRow;
