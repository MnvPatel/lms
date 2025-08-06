import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "*", // Adjust this based on your needs
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Listen for 'notification' event from the frontend
        socket.on("notification", (data) => {
            console.log(`Received notification: ${JSON.stringify(data)}`);
            
            // Broadcast to all connected clients
            io.emit("newNotification", data);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io; // Return the io instance for potential reuse
};