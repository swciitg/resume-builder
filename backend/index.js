const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));


app.post('/compile', async (req, res) => {
  try {
    const latexCode = req.body.latexCode;
    const fileName = 'resume';
    
    if (!latexCode) {
      return res.status(400).send('No LaTeX code provided');
    }
    // console.log('Received LaTeX code:', latexCode);
    fs.writeFileSync(`${fileName}.tex`, latexCode);

    exec(`pdflatex -interaction=nonstopmode ${fileName}.tex`, (err, stdout, stderr) => {
      
      const pdf = fs.readFileSync(`${fileName}.pdf`);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      res.send(pdf);

      ['aux', 'log', 'pdf', 'tex'].forEach(ext => fs.unlinkSync(`${fileName}.${ext}`));
    });
  } catch (e) {
    console.error('Internal Server Error:', e);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
