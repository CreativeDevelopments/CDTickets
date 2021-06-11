const { Schema, model } = require("mongoose");

const ticketConfig = new Schema({
    gId: { type: String, required: false },
    maxTickets: { type: Number, required: false, default: 1 },
    supportRoles: { type: Array, required: false },
    claim: { type: Boolean, required: false, default: true },
    category: { type: String, required: false },
    close: { type: String, required: false },
    log: { type: String, required: false },
});

module.exports = model("ticketConfig", ticketConfig);