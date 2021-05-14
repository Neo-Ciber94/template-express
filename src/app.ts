import cors from "cors";
import express, { Router } from "express";
import morgan from "morgan";
import fs from "fs";

// Port to run the server
const PORT = process.env.PORT || 8000;

// Create the express app
const app = express();

// Dynamically import all routes in src/routes
fs.readdir(__dirname + "/routes", (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  for (const file of files) {
    const router = require(__dirname + "/routes/" + file).default;
    if (typeof router === "function") {
      app.use("/", router);
    }
  }
});

// Setup middlewares
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

// Start listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
