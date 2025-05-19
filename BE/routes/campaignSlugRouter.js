const express = require("express");
const router = express.Router();
const {
  createCampaignSlug,
  getCampaignAddress,
  getCampaignSlug,
} = require("../controllers/campaignSlugController");

router.post("/", createCampaignSlug);
router.get("/get-address/:slug", getCampaignAddress);
router.get("/get-slug/:address", getCampaignSlug);

module.exports = router;
