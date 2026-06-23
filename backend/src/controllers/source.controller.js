const Source = require("../models/Source");

const createSource = async (req, res) => {
  try {
    const source = await Source.create(req.body);

    res.status(201).json({
      success: true,
      data: source,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSources = async (req, res) => {
  try {
    const sources = await Source.find();

    res.json({
      success: true,
      count: sources.length,
      data: sources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSource = async (req, res) => {
  try {
    const source = await Source.findByIdAndDelete(req.params.id);

    if (!source) {
      return res.status(404).json({
        success: false,
        message: "Source not found",
      });
    }

    res.json({
      success: true,
      message: "Source deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSource,
  getSources,
  deleteSource,
};