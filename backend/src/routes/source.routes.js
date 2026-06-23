const express = require("express");

const router = express.Router();

const {
  createSource,
  getSources,
  deleteSource,
} = require("../controllers/source.controller");

router.post("/", createSource);
router.get("/", getSources);
router.delete("/:id", deleteSource);

module.exports = router;