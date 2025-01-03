import express from "express";
import cors from "cors";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// router import
import touristSpotRouter from "./routes/touristsSpot.routes.js";
import ApiResponse from "./utils/ApiResponse.js";

// Router use
app.use("/api/v1/tourists-spot", touristSpotRouter);

app.use("/", async (req, res) =>
  res
    .status(200)
    .json(
      new ApiResponse(200, {}, "Beyond Border server is running on express")
    )
);

export default app;
