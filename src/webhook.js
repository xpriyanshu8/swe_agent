const { githubApp } = require("./auth");

githubApp.webhooks.on("push", async ({ payload }) => {
  console.log(`Push on ${payload.repository.full_name} by ${payload.pusher.name}`);
});

githubApp.webhooks.on("issues.opened", async ({ payload }) => {
  console.log(`New issue #${payload.issue.number}: ${payload.issue.title}`);
});

githubApp.webhooks.onError((error) => {
  console.error("Webhook error:", error.message);
});

function webhookMiddleware(req, res) {
  const id = req.headers["x-github-delivery"];
  const name = req.headers["x-github-event"];
  const signature = req.headers["x-hub-signature-256"];

  if (!id || !name || !signature) {
    return res.status(400).json({ error: "Missing GitHub webhook headers" });
  }

  githubApp.webhooks
    .verifyAndReceive({ id, name, signature, payload: req.rawBody })
    .then(() => res.status(200).json({ received: true }))
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "Webhook verification failed" });
    });
}

module.exports = { webhookMiddleware };