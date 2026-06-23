const Competitor = require("../models/Competitor");

const createCompetitor = async (req, res) => {
  try {
    const competitor = await Competitor.create(req.body);

    res.status(201).json({
      success: true,
      data: competitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCompetitors = async (req, res) => {
  try {
    const competitors = await Competitor.find();

    res.json({
      success: true,
      count: competitors.length,
      data: competitors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCompetitor = async (req, res) => {
  try {
    const competitor =
      await Competitor.findByIdAndDelete(req.params.id);

    if (!competitor) {
      return res.status(404).json({
        success: false,
        message: "Competitor not found",
      });
    }

    res.json({
      success: true,
      message: "Competitor deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCompetitor,
  getCompetitors,
  deleteCompetitor,
};