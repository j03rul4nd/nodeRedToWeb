const http = require('http');
const express = require('express');
const RED = require('node-red');

const app = express();
const server = http.createServer(app);

const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  userDir: "./",
  flowFile: 'flows.json',
  credentialSecret: process.env.CREDENTIAL_SECRET || 'your-secret-key', 
  functionGlobalContext: {}
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

// Usar el puerto definido por Render en la variable de entorno PORT, o 8000 por defecto
const PORT = process.env.PORT || 8000;

server.listen(PORT, function() {
  console.log(`Node-RED running on port ${PORT}`);
});

RED.start();
