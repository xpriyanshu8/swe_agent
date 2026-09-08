const mongoose = require("mongoose");

const webhookEventSchema = new mongoose.Schema({
  deliveryId: { 
    type: String,
    required: true,
    unique: true 
},
     
  eventName: { 
    type: String, 
    required: true 
},

  payload: { 
    type: mongoose.Schema.Types.Mixed, 
    required: true 
},

  receivedAt: { type: Date, 
    default: Date.now 
},
});

const WebhookEvent = mongoose.model("WebhookEvent", webhookEventSchema);

module.exports = { WebhookEvent };