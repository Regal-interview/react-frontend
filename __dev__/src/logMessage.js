import { log, error, getIp } from "./utils/index.js";
import { options } from "./index.js";

const logMessage = (currentPort) => {
  log("Serving:");
  log(`- http://localhost:${currentPort}`);
  log(`- http://${getIp()}:${currentPort}`);
  const { port } = options;
  if (currentPort !== port) error(`Port ${port} was in use.\n`);
};

export default logMessage;
