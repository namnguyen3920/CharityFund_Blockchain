const Fund = require("../models/Fund");

exports.getFunds = async (req, res) => {
  try {
    const funds = await Fund.find().sort({ createdAt: 1 });
    res.json(funds);
  } catch (err) {
    console.error("Failed to fetch funds:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFundById = async (req, res) => {
  try {
    const fund = await Fund.findById(req.params.id);
    if (!fund) {
      return res.status(404).json({ message: "Fund not found" });
    }
    res.json(fund);
  } catch (err) {
    console.error("Failed to fetch fund:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createFund = async (req, res) => {
  try {
    const { name, description, address, image } = req.body;

    const exists = await Fund.findOne({
      $or: [{ name }, { address }],
    });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Fund name or address already exists" });
    }

    const fund = new Fund({ name, description, address, image });
    await fund.save();
    res.status(201).json({ message: "Fund created", fund });
  } catch (err) {
    console.error("Failed to create fund:", err);
    res.status(500).json({ message: "Server error" });
  }
};
