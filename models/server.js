//servidor de express
const express = require("express")
const http = require("http");
const socketio = require("socket.io")
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //crear http server
    this.server = http.createServer(this.app);

    //configuracion del socket server
    this.io = socketio(this.server, { /*Configuraciones de sockets */ });
  };

  middleware() {
    //desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    //habilitar CORS 
    this.app.use(cors());
  };

  configSockets() {
    new Sockets(this.io);
  };

  execute() {
    //inicializar el middleware
    this.middleware();

    //config sockets
    this.configSockets();

    //inicializar el server 
    this.server.listen(this.port, () => {
      console.log("Server corriendo en el puerto : ", this.port);
    });
  };
}

module.exports = Server;