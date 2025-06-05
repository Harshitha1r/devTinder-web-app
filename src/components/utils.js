import { io, Socket } from "socket.io-client"

const createSocketConnection = () => {
    return io("http://localhost:7000");
};

export default createSocketConnection