import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import Resume from './Resume';
// import 'latex.js/dist/latex.css';
const DisplayResume = ({ resumeData }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [resumeView, setResumeView] = useState(false);


    const toggleResumeView = () => {
        setResumeView(!resumeView);
    }

    useEffect(()=>{
        console.log(resumeData)
    },[resumeData])


    const latexCode = `
%-------------------------
% Resume in LaTeX
% Author: Custom Resume Builder
% License: MIT
%-------------------------

\\documentclass[a4paper,11pt]{article}
\\usepackage{latexsym}
\\usepackage{xcolor}
\\usepackage{float}
\\usepackage{ragged2e}
\\usepackage[empty]{fullpage}
\\usepackage{wrapfig}
\\usepackage{lipsum}
\\usepackage{tabularx}
\\usepackage{titlesec}
\\usepackage{geometry}
\\usepackage{marvosym}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage{multicol}
\\usepackage{graphicx}
\\usepackage{cfr-lm}
\\usepackage[T1]{fontenc}
\\setlength{\\multicolsep}{0pt}
\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\geometry{left=1.4cm, top=0.8cm, right=1.2cm, bottom=1cm}
\\usepackage[most]{tcolorbox}

\\urlstyle{same}
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
\\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-7pt}]

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[2]{
\\item{
\\textbf{#1}{:\\hspace{0.5mm}#2 \\vspace{-0.5mm}}
}
}

\\newcommand{\\resumePOR}[3]{
\\vspace{0.5mm}\\item
\\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
\\textbf{#1},\\hspace{0.3mm}#2 & \\textit{\\small{#3}}
\\end{tabular*}
\\vspace{-2mm}
}

\\newcommand{\\resumeSubheading}[4]{
\\vspace{0.5mm}\\item
\\begin{tabular*}{0.98\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
\\textbf{#1} & \\textit{\\footnotesize{#4}} \\\\
\\textit{\\footnotesize{#3}} & \\footnotesize{#2}\\\\
\\end{tabular*}
\\vspace{-2.4mm}
}

\\newcommand{\\resumeProject}[4]{
\\vspace{0.5mm}\\item
\\begin{tabular*}{0.98\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
\\textbf{#1} & \\textit{\\footnotesize{#3}} \\\\
\\footnotesize{\\textit{#2}} & \\footnotesize{#4}
\\end{tabular*}
\\vspace{-2.4mm}
}

\\newcommand{\\resumeSubItem}[2]{\\resumeItem{#1}{#2}\\vspace{-4pt}}

\\renewcommand{\\labelitemi}{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=,labelsep=0mm]}
\\newcommand{\\resumeHeadingSkillStart}{\\begin{itemize}[leftmargin=,itemsep=1.7mm, rightmargin=2ex]}
\\newcommand{\\resumeItemListStart}{\\begin{justify}\\begin{itemize}[leftmargin=3ex, rightmargin=2ex, noitemsep,labelsep=1.2mm,itemsep=0mm]\\small}

\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}\\vspace{2mm}}
\\newcommand{\\resumeHeadingSkillEnd}{\\end{itemize}\\vspace{-2mm}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\end{justify}\\vspace{-2mm}}

%-------------------------------------------
%%%%%% CV STARTS HERE %%%%%%%%%%%
%%%%%% DEFINE ELEMENTS HERE %%%%%%%
\\newcommand{\\name}{${resumeData.personalInfo.name || ''}} % Your Name
\\newcommand{\\course}{${resumeData.personalInfo.courseBranch || ''}} % Your Course
\\newcommand{\\roll}{${resumeData.personalInfo.rollNumber || ''}} % Your Roll No.
\\newcommand{\\phone}{${resumeData.personalInfo.contactNumber || ''}} % Your Phone Number
\\newcommand{\\emaila}{${resumeData.personalInfo.email || ''}} % Email Personal

\\begin{document}
\\fontfamily{cmr}\\selectfont

%----------HEADING-----------------
\\parbox{2.35cm}{
\\includegraphics[width=2cm,clip]{iitg_logo.jpg}
}
\\parbox{\\dimexpr\\linewidth-2.6cm\\relax}{
\\begin{tabularx}{\\linewidth}{L r}
\\textbf{\\LARGE \\name} & +91-\\phone \\\\
{Roll No.: \\roll} & \\href{mailto:\\emaila}{\\emaila} \\\\
\\course & \\href{${resumeData.personalInfo.githubProfile || ''}{}}{GitHub} \\\\
{Indian Institute Of Technology, Guwahati} & \\href{${resumeData.personalInfo.linkedinProfile || ''}{}}{LinkedIn}
\\end{tabularx}
}

%-----------EDUCATION-----------------
\\section{Education}
\\setlength{\\tabcolsep}{5pt}
\\small{
\\begin{tabularx}{\\dimexpr\\textwidth-3mm\\relax}{|c|C|c|c|}
\\hline
\\textbf{Degree/Certificate} & \\textbf{Institute/Board} & \\textbf{CGPA/Percentage} & \\textbf{Year} \\\\
\\hline
${resumeData.education.map(edu => `${edu.degree || ''} & ${edu.institute || ''} & ${edu.cgpa || ''} & ${edu.year || ''} \\\\ \\hline`).join('')}
\\end{tabularx}
}

%-----------EXPERIENCE-----------------
\\section{Experience}
\\resumeSubHeadingListStart
${resumeData.experience.map(exp => `
\\resumeProject{${exp.title || ''}}{${exp.designation || ''}}{${exp.timeline || ''}}{} \\\\
\\resumeItemListStart
\\item ${exp.description || ''}
\\resumeItemListEnd
`).join('')}
\\resumeSubHeadingListEnd

%-----------PROJECTS-----------------
\\section{Projects}
\\resumeSubHeadingListStart
${resumeData.projects.map(project => `
\\resumeProject{${project.name || ''}}{${project.type || ''}}{${project.timeline || ''}}{${project.githubLink || ''}} \\\\
\\resumeItemListStart
\\item ${project.description || ''}
\\resumeItemListEnd
`).join('')}
\\resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------------
\\section{Technical Skills}
\\resumeHeadingSkillStart
${resumeData.technicalSkills.map(skill => `
\\resumeSubItem{${skill.category || ''}}{${skill.skills || ''}}
`).join('')}
\\resumeHeadingSkillEnd

%-----------KEY COURSES-----------------
\\section{Key Courses Taken}
\\resumeHeadingSkillStart
${resumeData.courses.map(course => `
\\resumeSubItem{${course.category || ''}}{${course.courseName || ''}}
`).join('')}
\\resumeHeadingSkillEnd

%-----------POSITIONS OF RESPONSIBILITY-----------------
\\section{Positions of Responsibility}
\\resumeSubHeadingListStart
${resumeData.positions.map(position => `
\\resumePOR{${position.title || ''}}{${position.organization || ''}}{${position.timeline || ''}}
\\resumeItemListStart
\\item ${position.description || ''}
\\resumeItemListEnd
`).join('')}
\\resumeSubHeadingListEnd

%-----------ACHIEVEMENTS-----------------
\\section{Achievements}
\\resumeSubHeadingListStart
${resumeData.achievements.map(achievement => `
\\resumePOR{${achievement.title || ''}}{${achievement.issuer || ''}}{${achievement.year || ''}}
\\item ${achievement.description || ''}
`).join('')}
\\resumeSubHeadingListEnd

\\end{document}
`;
    // Function to handle copy action
    const copyToClipboard = () => {


        navigator.clipboard.writeText(latexCode).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }, (err) => {
            setCopySuccess(false);
            console.error(err);
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1>Latex Code</h1>

            <div className="sticky top-0 z-10 flex justify-end pt-4">
                <button onClick={toggleResumeView} className="mx-2 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"> {!resumeView ? 'view resume' : 'view latex code'} </button>
                <button
                    className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    onClick={copyToClipboard}
                >

                    <ClipboardDocumentIcon className="w-4 h-4 text-primary_text hover:text-hover_accent" />
                </button>
                {copySuccess && (
                    <div className="absolute left-1/2 -translate-x-1/2 px-3 py-1 text-sm 
                    bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100 
                    rounded shadow transition-opacity duration-300">
                        Successfully Copied!
                    </div>
                )}
            </div>
            {resumeView ? (
                <Resume resumeData={resumeData}></Resume>
            ) : (
                <pre>{latexCode}</pre>
            )}
        </div>
    );
};

export default DisplayResume;
