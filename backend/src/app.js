const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const topicRoutes = require("./routes/topic.routes");
const sourceRoutes = require("./routes/source.routes");
const competitorRoutes = require("./routes/competitor.routes");
const pdfRoutes = require("./routes/pdf.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running",
  });
});



app.use("/api/topics", topicRoutes);
app.use("/api/sources", sourceRoutes);
app.use("/api/competitors",competitorRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;