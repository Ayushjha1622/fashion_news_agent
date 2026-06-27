const puppeteer = require("puppeteer");

async function generateDailyBriefPdf() {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  
  // Set a large viewport for accurate desktop rendering
  await page.setViewport({ width: 1440, height: 1080 });

  // Navigate to the Daily Brief page with the print=true flag to hide the navigation menus
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  await page.goto(`${frontendUrl}/brief?print=true`, {
    waitUntil: "networkidle0", // Wait until there are no network requests for at least 500ms
    timeout: 30000
  });

  // Generate PDF preserving background colors (for dark mode)
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "10mm",
      bottom: "10mm",
      left: "10mm",
      right: "10mm"
    }
  });

  await browser.close();
  return pdfBuffer;
}

module.exports = {
  generateDailyBriefPdf
};
