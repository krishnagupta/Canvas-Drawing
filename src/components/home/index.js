import { useState } from "react";

import Command from "../command";
import Canvas from "../canvas";

const Home = () => {
  const [matrix, setMatrix] = useState([]);
  const [command, setCommand] = useState([]);

  return (
    <>
      <Command setCommand={setCommand} />
      <Canvas matrix={matrix} command={command} setMatrix={setMatrix} />
    </>
  );
};

export default Home;
