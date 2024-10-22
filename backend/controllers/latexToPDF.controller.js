const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// First downlaod and setup pdfLatex in system and install required packages and make sure pdflatex command is accessible from terminal
const handleLatexToPDF = (req, res) => {
  const latexData = req.body.latexData;

  if (!latexData) {
    return res.status(400).json({ msg: "No LaTeX document Provided" });
  }

  const latexFilePath =
    "E:/Visual Studio Code/WebDev/Hacktoberfest/SWC_ResumeBuilder/backend/files/latex/document.tex";
  const outputDir =
    "E:/Visual Studio Code/WebDev/Hacktoberfest/SWC_ResumeBuilder/backend/files/output";

  // Write the LaTeX string to .tex file
  fs.writeFileSync(latexFilePath, latexData);
  console.log(".tex file written successfully");

  if (!fs.existsSync(latexFilePath)) {
    console.error("LaTeX file does not exist at the specified path.");
    return res.status(400).json({ msg: "LaTeX file not found." });
  }

  console.log(`Executing command: pdflatex "${latexFilePath}"`);

  exec(
    `pdflatex -output-directory="${outputDir}" "${latexFilePath}"`,
    (error, stdout, stderr) => {
      console.log("Command executed");

      if (error) {
        console.error("Error in pdflatex:", error.message);
        console.error("Stderr output:", stderr);
        return res.status(500).json({ msg: "Error generating PDF" });
      }

      console.log("Stdout output:", stdout);

      const pdfFilePath = path.join(outputDir, "document.pdf");

      // Ensure the PDF file exists before sending it
      if (!fs.existsSync(pdfFilePath)) {
        console.error("PDF file was not created");
        return res.status(500).json({ msg: "PDF file not found" });
      }

      // Send the PDF file to the client
      res.sendFile(pdfFilePath, (err) => {
        if (err) {
          console.error("Error sending PDF:", err.message);
          return res.status(500).json({ msg: "Error sending PDF" });
        }

        // Clean up: remove the .tex and .pdf files
        // fs.unlinkSync(latexFilePath);
        // fs.unlinkSync(pdfFilePath);
      });
    }
  );
};

module.exports = handleLatexToPDF;
