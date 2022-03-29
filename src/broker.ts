import aedes, { AuthenticateError } from "aedes";
import net from "net";
import { Client} from "mqtt";

const aedess = aedes();
const server = net.createServer(aedess.handle);
const port = 1883

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

aedess.on("client", (client) => {
    console.log(client.id);
})

aedess.on("subscribe", (subscription, client) => {
    console.log(`Client ${client.id} subscribed to ${subscription[0].topic}`);
})

aedess.authenticate = (client, username, password, callback) => {
    if(client.id === 'ranvijay'){
        return callback(null, true)
    }
    const error = <AuthenticateError> new Error('Authentication Failed!! Invalid user credentials.');
    console.log('Error ! Authentication failed.')
    return callback(error, false)
}