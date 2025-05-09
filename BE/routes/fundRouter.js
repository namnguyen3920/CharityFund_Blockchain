const express = require("express");
const router = express.Router();
const {
  getFunds,
  getFundById,
  createFund,
} = require("../controllers/fundController");

router.get("/get-funds", getFunds);
router.get("/:id", getFundById);
router.post("/create-fund", createFund);

module.exports = router;
