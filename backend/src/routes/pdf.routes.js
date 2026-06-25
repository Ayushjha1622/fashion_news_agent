const express = require("express");
const router = express.Router();
const { generateDailyBriefPdf } = require("../services/pdf.service");

router.get("/daily-brief", async (req, res) => {
  try {
    const pdfBuffer = await generateDailyBriefPdf();
    
    // Set headers to trigger a file download in the browser
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=\"Daily_Brief_Report.pdf\"",
      "Content-Length": pdfBuffer.length
    });
    
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ success: false, message: "Failed to generate PDF report", error: error.message, stack: error.stack });
  }
});

module.exports = router;
