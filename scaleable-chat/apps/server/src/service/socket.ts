import { Server } from "socket.io";

class socketServer {
  private _io: Server;
  constructor() {
    console.log("this is SOCKET SERVE");
    this._io = new Server();
  }

  get io() {
    return this._io;
  }
}

export default socketServer;
