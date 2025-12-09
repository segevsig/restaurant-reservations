import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import prisma from "./prisma";
import authRoutes from "./routes/auth";
import reservationRoutes from "./routes/reservation";



const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);



// Create HTTP server for Express
const server = http.createServer(app);

// Attach Socket.IO to the same server
const io = new Server(server, {
  cors: { origin: "*" }
});

// Socket.IO real-time connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});




// Start server
const PORT = Number(process.env.PORT) || 4000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
