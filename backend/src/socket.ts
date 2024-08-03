import express from "express";
import http from "http"
import { Server } from "socket.io";
import environmentConfig from "./environment.config";
class IOSocket {
    private io: Server;

    constructor() {
        setTimeout(() => {
            this.connectToSocket();
        }, 1000);
    }  

    async connectToSocket() {
        try {
            let app = express();
            let httpServer = http.createServer(app);
            this.io = new Server(httpServer, {
                allowEIO3: true,
                cors: {
                    origin: '*'
                }
            });
            httpServer.listen(environmentConfig.socketPort, () => {
                console.log('Socket Server listening on port ' + environmentConfig.socketPort);
            });
            this.io.on('connection', (socket) => {
                console.log(`Socket ==> ${socket.id.toString()} has joined`);
                socket.on('disconnect', () => {
                console.log(`Socket ==> ${socket.id.toString()} has left`);
                })
            })
        } catch(err) {
            console.log(err)
        }
    }

    public emitData(eventName: string, data: any) {
        console.log(`Emitting Event ${eventName}`)
        this.io.emit(eventName, data);
    }
}

const socket = new IOSocket();

export default socket;