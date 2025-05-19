const CampaignSlug = require("../models/CampaignSlug");

exports.createCampaignSlug = async (req, res) => {
  const { slug, campaignAddress } = req.body;
  try {
    const exists = await CampaignSlug.findOne({ slug });
    if (exists) {
      return res.status(409).json({ error: "Slug already exists" });
    }

    const newSlug = new CampaignSlug({ slug, address: campaignAddress });
    await newSlug.save();

    res.status(201).json(newSlug);
  } catch (err) {
    console.error("Error in createCampaign:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCampaignAddress = async (req, res) => {
  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ error: "Slug is required" });
  }

  try {
    const campaign = await CampaignSlug.findOne({
      slug,
    });

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    return res.status(200).json({ address: campaign.address });
  } catch (err) {
    console.error("Error in getCampaignDr:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCampaignSlug = async (req, res) => {
  const { address } = req.params;

  if (!address) {
    return res.status(400).json({ error: "address is required" });
  }

  try {
    const campaign = await CampaignSlug.findOne({
      address,
    });

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    return res.status(200).json({ slug: campaign.slug });
  } catch (err) {
    console.error("Error in getCampaignDr:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
