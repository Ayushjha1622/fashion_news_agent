const express = require("express");

const router = express.Router();

const {
  createCompetitor,
  getCompetitors,
  deleteCompetitor,
} = require("../controllers/competitor.controller");

router.post("/", createCompetitor);
router.get("/", getCompetitors);
router.delete("/:id", deleteCompetitor);

module.exports = router;