const Topic = require("../models/Topic");

const createTopic = async (req, res) => {
  try {
    const topic = await Topic.create(req.body);

    res.status(201).json({
      success: true,
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();

    res.json({
      success: true,
      count: topics.length,
      data: topics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTopic = async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Topic deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTopic,
  getTopics,
  deleteTopic,
};