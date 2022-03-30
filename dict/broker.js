"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aedes_1 = __importDefault(require("aedes"));
const net_1 = __importDefault(require("net"));
const aedess = (0, aedes_1.default)();
const server = net_1.default.createServer(aedess.handle);
const port = 1883;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
aedess.on("client", (client) => {
    console.log(client.id);
});
aedess.on("subscribe", (subscription, client) => {
    console.log(`Client ${client.id} subscribed to ${subscription[0].topic}`);
});
aedess.on("publish", (packet) => {
    console.log(packet.payload.toString());
});
aedess.authenticate = (client, username, password, callback) => {
    if (client.id === 'ranvijay' || client.id === 'pleae') {
        return callback(null, true);
    }
    console.log(client.id);
    const error = new Error('Authentication Failed!! Invalid user credentials.');
    console.log('Error ! Authentication failed.');
    return callback(error, false);
};
