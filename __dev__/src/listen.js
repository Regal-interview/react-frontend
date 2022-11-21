import logMessage from "./logMessage.js";
import { options } from "./index.js";

const listen = (server, serverPort = options.port) => {
  server
    .listen(serverPort, () => {
      logMessage(server.address().port);
    })
    .once("error", () => {
      server.removeAllListeners("listening");
      listen(server, 0);
    });
};

export default listen;
