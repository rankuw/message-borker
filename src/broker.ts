import aedes from "aedes";
import net from "net";

const aedess = aedes();
const server = net.createServer(aedess.handle);
const port = 1883

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

