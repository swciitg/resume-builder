import React, { useState,useEffect } from 'react';
import './App.css';
import ResumeBuilder from './Components/ResumeBuilder'
import DisplayResume from './Components/DisplayResume.js';
import Navbar from './Components/Navbar.js';
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

function App() {
    
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            name: '',
            rollNumber: '',
            courseBranch: '',
            contactNumber: '',
            email: '',
            githubProfile: '',
            linkedinProfile: '',
        },
        education: [
            {
                degree: '',
                institute: '',
                cgpa: '',
                year: '',
            },
        ],
        experience: [
            {
                title: '',
                designation: '',
                timeline: '',
                description: '',
            },
        ],
        projects: [
            {
                name: '',
                type: '',
                timeline: '',
                githubLink: '',
                description: '',
            },
        ],
        technicalSkills: [
            {
                category: '',
                skills: '',
            },
        ],
        courses: [
            {
                category: '',
                courseName: '',
            },
        ],
        positions: [
            {
                title: '',
                organization: '',
                timeline: '',
                description: '',
            },
        ],
        achievements: [
            {
                title: '',
                description: '',
                year: '',
            },
        ],
    });

    const [errors, setErrors] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
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
}
\\includegraphics[width=2cm,clip]{iitg_logo.jpg}
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
    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [darkMode]);



    return (
        <div className="h-screen w-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition">

            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <Navbar toogleDark={()=>setDarkMode(!darkMode)} darkMode={darkMode} />
            </div>
            <div className="flex mt-16 h-[calc(100vh-4rem)] transition-all duration-700 ease-in-out ">
                {/* ResumeBuilder */}
                <div
                    className={`relative transition-all duration-700 ${showPreview ? "w-1/2" : "w-full"
                        } h-full overflow-auto`}
                >
                    {/* Sliding button */}
                    <div className="sticky top-0 z-10 flex justify-end pt-4">
                    <button
                        className=" rounded  text-gray-800 dark:text-white "
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        {/* {showPreview ? "Hide Preview" : "Show Preview"} */}
                        {/* <CodeBracketIcon className="w-5 h-5 mr-2" /> */}
                        {showPreview ? (
                            <ChevronRightIcon className="w-6 h-6 text-primary_text hover:text-hover_accent" />
                        ) : (
                            <ChevronLeftIcon className="w-6 h-6 text-primary_text hover:text-hover_accent" />
                        )}
                    </button></div>


                    <ResumeBuilder
                        latexCode={latexCode}
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                        errors={errors}
                        setErrors={setErrors}
                    />
                </div>

                {/* DisplayResume */}
                <div
                    className={`transition-all duration-700 bg-gray-100 ${showPreview ? "w-1/2 translate-x-0" : "w-0 translate-x-full"
                        } h-full overflow-y-auto bg-gray-100 dark:bg-gray-800`}
                >
                    <DisplayResume resumeData={resumeData} latexCode={latexCode}/>
                </div>
            </div>
        </div>
    );
}

export default App;
