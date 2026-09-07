const { App } = require("@octokit/app");

const appId = parseInt(process.env.APP_ID, 10); 
const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n");
const webhookSecret = process.env.WEBHOOK_SECRET;

if (!appId || !privateKey) {
  throw new Error("Missing or invalid APP_ID, or missing PRIVATE_KEY in .env");
}

const githubApp = new App({
  appId,
  privateKey,
  webhooks: {
    secret: webhookSecret || "placeholder",
  },
});

module.exports = { githubApp };
