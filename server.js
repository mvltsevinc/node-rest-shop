const http = require("http");
const app = require("./app");


const port = process.env.PORT || 3000;
const server = http.createServer(app); // app yi listener yani request handler olarak ayarladık.
server.listen(port);