import http from "http";
import socketServer from "./service/socket";

(async () => {
  const socketService = new socketServer();

  const httpServer = http.createServer();

  const port = process.env.PORT ? process.env.PORT : 8000;

  socketService.io.attach(httpServer);

  httpServer.listen(port, () => {
    console.log(`Server is UP on PORT ${port}`);
  });
})();
