require("dotenv").config(); 

const express = require("express");
const { githubApp } = require("./auth");
const app = express();
const PORT = process.env.PORT || 3000;
const { webhookMiddleware } = require("./webhook");
const { connectDB } = require("./db");

connectDB().catch((err) => {
  console.error("Failed to connect to MongoDB:", err.message);
  process.exit(1);
});

const { WebhookEvent } = require("./schema");

app.get("/health/db", async (req, res) => {
  try {
    const count = await WebhookEvent.countDocuments();
    res.json({ database: "connected", documentCount: count });
  } catch (err) {
    res.status(500).json({ database: "unreachable", error: err.message });
  }
});

app.post("/api/webhook",express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
  webhookMiddleware
);

app.get("/test-auth", async (req, res) => {
  const { data } = await githubApp.octokit.request("GET /app");
  res.json(data);
});

app.get("/", (req, res) => {
    res.json({ message: "Hello, webhook server!" });
});

app.listen({ port: PORT }, () => {
    console.log("server is running on port " + PORT);
});
