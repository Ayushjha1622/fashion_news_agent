const express = require("express");
const cors = require("cors");

const topicRoutes = require("./routes/topic.routes");
const sourceRoutes = require("./routes/source.routes");
const competitorRoutes = require("./routes/competitor.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running",
  });
});



app.use("/api/topics", topicRoutes);
app.use("/api/sources", sourceRoutes);
app.use("/api/competitors",competitorRoutes);

module.exports = app;