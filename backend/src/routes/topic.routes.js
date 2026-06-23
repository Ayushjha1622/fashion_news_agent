const express = require("express");

const router = express.Router();

const {
  createTopic,
  getTopics,
  deleteTopic,
} = require("../controllers/topic.controller");

router.post("/", createTopic);

router.get("/", getTopics);

router.delete("/:id", deleteTopic);

module.exports = router;