const mongoose = require("mongoose");

const CampaignSlugSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CampaignSlug", CampaignSlugSchema);
