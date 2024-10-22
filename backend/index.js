const express = require("express");
const cors = require("cors");
const handleLatexToPDF = require("./controllers/latexToPDF.controller");

const app = express();

// Middlewares
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials to be sent
  optionsSuccessStatus: 204, // For legacy browser support
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Latex to PDF route
app.post("/api/latex-to-pdf", handleLatexToPDF);

// Test route
app.get("/test", (req, res) => {
  console.log("test route working fine");
  res.json({ msg: "A test response from server" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started successfully at PORT:", process.env.PORT || 5000);
});
