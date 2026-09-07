// 🔑 FIX: Load environment variables BEFORE importing any local modules
require("dotenv").config(); 

const express = require("express");
const { githubApp } = require("./auth"); // Now process.env is fully loaded!
const app = express();
const PORT = process.env.PORT || 3000;

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
