import React, { useEffect, useState } from "react";
// react-pdf-viewer library imports
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { getFilePlugin } from "@react-pdf-viewer/get-file";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
// React spinners import
import { ClipLoader } from "react-spinners";

function PDF({ latexData }) {
  const [pdfURL, setPdfURL] = useState("");
  // Instances for ract-pdf-viewer library plugins
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const getFilePluginInstance = getFilePlugin();
  const fullScreenPluginInstance = fullScreenPlugin();

  // temporary latexData for testing. Should be removed to work with original latexData coming from props
  latexData = `
  %-------------------------
  % Resume in LaTeX
  % Author : Your Name
  % License : MIT
  %-------------------------
  
  \\documentclass[a4paper,11pt]{article}
  \\usepackage[left=1in, right=1in, top=1in, bottom=1in]{geometry} % Page margins
  \\usepackage{enumitem} % For item lists
  \\usepackage{hyperref} % For hyperlinks
  \\usepackage{titlesec} % For section titles
  \\usepackage{xcolor} % For text color
  
  % Section formatting
  \\titleformat{\\section}{\\large\\bfseries\\color{blue}}{}{0em}{}[\\titlerule]
  \\renewcommand{\\labelitemi}{$\\bullet$}
  
  \\begin{document}
  
  \\begin{center}
      {\\LARGE Your Name} \\\\[0.5em]
      Your Address, City, State, ZIP \\\\[0.5em]
      \\texttt{your.email@example.com} | (123) 456-7890 \\\\[0.5em]
      \\href{https://github.com/yourusername}{GitHub} | \\href{https://linkedin.com/in/yourusername}{LinkedIn}
  \\end{center}
  
  \\section*{Personal Information}
  \\begin{itemize}[leftmargin=0.5cm]
      \\item \\textbf{Date of Birth:} January 1, 1990
      \\item \\textbf{Nationality:} Your Nationality
  \\end{itemize}
  
  \\section*{Education}
  \\begin{itemize}[leftmargin=0.5cm]
      \\item \\textbf{Bachelor of Science in Computer Science} \\\\
      University Name, City, State \\hfill Graduated: May 2022
      \\begin{itemize}
          \\item CGPA: 3.5/4.0
      \\end{itemize}
  \\end{itemize}
  
  \\section*{Projects}
  \\begin{itemize}[leftmargin=0.5cm]
      \\item \\textbf{Project Name} \\hfill \\textit{Month Year}
      \\begin{itemize}
          \\item Description of the project and your contributions.
          \\item Technologies used: HTML, CSS, JavaScript, etc.
      \\end{itemize}
  
      \\item \\textbf{Another Project Name} \\hfill \\textit{Month Year}
      \\begin{itemize}
          \\item Description of the project and your contributions.
          \\item Technologies used: Python, Flask, etc.
      \\end{itemize}
  \\end{itemize}
  
  \\section*{Experience}
  \\begin{itemize}[leftmargin=0.5cm]
      \\item \\textbf{Intern, Software Development} \\\\
      Company Name, City, State \\hfill June 2021 -- August 2021
      \\begin{itemize}
          \\item Developed features for a web application using React.
          \\item Collaborated with the design team to improve user experience.
      \\end{itemize}
  
      \\item \\textbf{Part-time, IT Support} \\\\
      Another Company Name, City, State \\hfill January 2020 -- May 2021
      \\begin{itemize}
          \\item Provided technical support to clients.
          \\item Assisted in setting up hardware and software.
      \\end{itemize}
  \\end{itemize}
  
  \\section*{Skills}
  \\begin{itemize}[leftmargin=0.5cm]
      \\item \\textbf{Programming Languages:} Java, Python, JavaScript
      \\item \\textbf{Web Technologies:} HTML, CSS, React, Node.js
      \\item \\textbf{Tools:} Git, Docker, VS Code
  \\end{itemize}
  
  \\end{document}
  `;

  // To fetch PDF from backend using LaTeX data
  useEffect(() => {
    console.log("Fetching PDF");

    const getPDF = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/latex-to-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latexData: latexData }),
        });

        if (response.ok) {
          // Create blob from response
          const blob = await response.blob();
          // Create a URL for the blob
          const url = window.URL.createObjectURL(blob);
          console.log("url:", url);

          setPdfURL(url);
        } else {
          console.error("Error getting PDF:", response.statusText);
        }
      } catch (error) {
        console.log("Network error in fetching PDF");
      }
    };

    getPDF();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {pdfURL === "" ? (
        <ClipLoader size={40} className="mt-40" />
      ) : (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfURL}
            plugins={[defaultLayoutPluginInstance, getFilePluginInstance]}
          />
        </Worker>
      )}
    </div>
  );
}

export default PDF;
