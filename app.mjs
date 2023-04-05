import { env } from "node:process";
import http from "http";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();

import { createGameState, adminStates } from "./game.mjs";
import { onValidSessionId } from "./utils/session.mjs";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://${env.DOMAIN}:${env.CLIENT_PORT}`,
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: `http://${env.DOMAIN}:${env.CLIENT_PORT}`,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send();
});

// storing all game sessions in memory
let sessions = {};

io.on("connection", (socket) => {
  var roomId = "";
  console.log("Connected: ", socket.id);
  socket.on("create-new-session", (callback) => {
    /**
     * Function to generate random six digit alpha numeric session id
     */
    const randomStrGenerator = () => {
      const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";
      for (var i = 6; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    };

    //Checking if the generated id is already in the sessions object. If so, then it generates the new six digit sessionid
    let generatedSessionId = randomStrGenerator();
    while (sessions[generatedSessionId]) {
      generatedSessionId = randomStrGenerator();
    }
    //assigning the generated session id a game state
    sessions[generatedSessionId] = createGameState();

    //assigning the generated session id a room
    socket.join(generatedSessionId);

    //sending the session id to the frontend
    callback(generatedSessionId);
  });

  socket.on("disconnect", () => {
    if (sessions[roomId]?.players) {
      let disconnectedPlayer = sessions[roomId].players.findIndex((item) => {
        return item.socketId === socket.id;
      });

      if (
        disconnectedPlayer >= 0 &&
        sessions[roomId].players.length > 1 &&
        sessions[roomId].players[disconnectedPlayer].isAdmin == true
      ) {
        sessions[roomId].players.shift();
        sessions[roomId].players[0].isAdmin = true;
        io.in(roomId).emit(
          "remove-disconnected-player",
          sessions[roomId].players
        );
      } else if (
        disconnectedPlayer >= 0 &&
        sessions[roomId].players.length > 1
      ) {
        sessions[roomId].players.splice(disconnectedPlayer, 1);
        io.in(roomId).emit(
          "remove-disconnected-player",
          sessions[roomId].players
        );
      } else if (
        disconnectedPlayer >= 0 &&
        sessions[roomId].players.length <= 1
      ) {
        delete sessions[roomId];
      }
    }
  });
  //socket.on("join-room");

  /* Connect client to session
   * @function
   * @param {Object} data
   * @param {String} data.sessionId the session Id to join
   * @param {String} data.username of client to join
   */
  socket.on("join-session", ({ sessionId, username }, callback) => {
    let isUsernameTaken = false;
    roomId = sessionId;

    onValidSessionId(
      (session) => {
        for (const player of session.players) {
          if (player.username.toLowerCase() == username.toLowerCase()) {
            isUsernameTaken = true;
            callback({ error: "username taken" });
            break;
          }
        }

        if (!isUsernameTaken) {
          const adminState = !session.adminState;
          const player = {
            username: username,
            isAdmin: adminState,
            socketId: socket.id,
          };
          session.players.push(player);
          if (adminState) {
            session.adminState = adminStates.hasAdmin;
          }
          socket.join(sessionId);
          callback(player);
          io.in(sessionId).emit("receive-session", session);
        }
      },
      sessions,
      sessionId
    );
  });

  socket.on("is-admin", ({ sessionId, username }, callback) => {
    callback(
      onValidSessionId(
        (session) => {
          for (const player of session.players) {
            if (player.username == username) {
              return player.isAdmin;
            }
          }
        },
        sessions,
        sessionId
      )
    );
  });

  /**
   * Checks if the session id entered by the player is valid
   */
  socket.on("is-session-id-valid", (sessionId, callback) => {
    callback(
      onValidSessionId(
        () => {
          return true;
        },
        sessions,
        sessionId
      )
    );
  });

  /* Send message to all clients (includin sender) in the same session
   * @function
   * @param {String} message the message to send
   * @param {String} sessionId the id of the session
   */
  socket.on("chat", (message, sessionId) =>
    io.in(sessionId).emit("receive-chat", message)
  );
});

export default server;
