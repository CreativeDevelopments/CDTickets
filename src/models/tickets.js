const { Schema, model } = require("mongoose");

const tickets = new Schema({
    gId: { type: String, required: true },
    uId: { type: String, required: false },
    cId: { type: String, required: false },
    claimed: { type: Boolean, required: false, default: false },
    claimId: { type: String, required: false },
    closed: { type: Boolean, required: false, default: false },
    reason: { type: String, required: false }
});

module.exports = model("tickets", tickets);