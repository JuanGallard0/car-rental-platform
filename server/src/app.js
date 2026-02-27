import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";

const app = express();

// Body Parser Middleware
app.use(express.json());

// Logger Middleware
app.use(morgan("dev"));

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

// API Routes
app.use("/api", routes);

export default app;
