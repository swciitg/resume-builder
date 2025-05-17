import React, { useState, useEffect } from 'react';
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
            emaila: '',
            emailb: '',
            githubProfile: '',
            linkedinProfile: '',
            website: '',
            MinorCourse: ''
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
            // {
            //     title: '',
            //     location: '',
            //     timeline: '',
            //     description: '',
            // },
        ],
        projects: [
            // {
            //     name: '',
            //     type: '',
            //     timeline: '',
            //     githubLink: '',
            //     description: '',
            // },
        ],
        technicalSkills: [
            // {
            //     category: '',
            //     skills: '',
            // },
        ],
        courses: [
            // {
            //     category: '',
            //     courseName: '',
            // },
        ],
        positions: [
            // {
            //     title: '',
            //     organization: '',
            //     timeline: '',
            //     description: '',
            // },
        ],
        achievements: [
            // {
            //     title: '',
            //     description: '',
            //     year: '',
            // },
        ],
    });

    const [errors, setErrors] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [latecCode, setLatexCode] = useState()

    const latexCode = `
%-------------------------
% Resume in Latex
% Author : Arkadeep Das, Manas Daruka, Ayush Sharma, Abhinav Gupta
% License : MIT
%------------------------

%---- Required Packages and Functions ----

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
\\usepackage[T1]{fontenc}
\\setlength{\\multicolsep}{0pt} 
\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\geometry{left=1.4cm, top=0.8cm, right=1.2cm, bottom=1cm}
\\usepackage[most]{tcolorbox}
\\tcbset{
	frame code={},
	center title,
	left=0pt,
	right=0pt,
	top=0pt,
	bottom=0pt,
	colback=gray!20,
	colframe=white,
	width=\\dimexpr\\textwidth\\relax,
	enlarge left by=-2mm,
	boxsep=4pt,
	arc=0pt,outer arc=0pt,
}

\\urlstyle{same}

\\raggedright
\\setlength{\\tabcolsep}{0in}

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
        \\textit{\\footnotesize{#3}} &  \\footnotesize{#2}\\\\
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

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=*,labelsep=0mm]}
\\newcommand{\\resumeHeadingSkillStart}{\\begin{itemize}[leftmargin=*,itemsep=1.7mm, rightmargin=2ex]}
\\newcommand{\\resumeItemListStart}{\\begin{justify}\\begin{itemize}[leftmargin=3ex, rightmargin=2ex, noitemsep,labelsep=1.2mm,itemsep=0mm]\\small}

\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}\\vspace{2mm}}
\\newcommand{\\resumeHeadingSkillEnd}{\\end{itemize}\\vspace{-2mm}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\end{justify}\\vspace{-2mm}}
\\newcommand{\\cvsection}[1]{%
\\vspace{2mm}
\\begin{tcolorbox}
    \\textbf{\\large #1}
\\end{tcolorbox}
    \\vspace{-4mm}
}

\\newcolumntype{L}{>{\\raggedright\\arraybackslash}X}%
\\newcolumntype{R}{>{\\raggedleft\\arraybackslash}X}%
\\newcolumntype{C}{>{\\centering\\arraybackslash}X}%
%---- End of Packages and Functions ------

%-------------------------------------------
%%%%%%  CV STARTS HERE  %%%%%%%%%%%
%%%%%% DEFINE ELEMENTS HERE %%%%%%%

    \\newcommand{\\name}{${resumeData.personalInfo.name || ''}} % Your Name
    \\newcommand{\\course}{${resumeData.personalInfo.courseBranch || ''}} % Your Course
    \\newcommand{\\roll}{${resumeData.personalInfo.rollNumber || ''}} % Your Roll No.
    \\newcommand{\\phone}{${resumeData.personalInfo.contactNumber || ''}} % Your Phone Number
    \\newcommand{\\emaila}{${resumeData.personalInfo.emaila || ''}} % Email Personal
    ${resumeData.personalInfo.emailb ? `\\newcommand{\\emaila}{${resumeData.personalInfo.emailb}}` : `%emailb`}
    ${resumeData.personalInfo.githubProfile ? `\\newcommand{\\github}{${resumeData.personalInfo.githubProfile}}` : `%github`}
    ${resumeData.personalInfo.website ? `\\newcommand{\\website}{${resumeData.personalInfo.website}}` : `%website`}
    \\newcommand{\\linkedin}{${resumeData.personalInfo.linkedinProfile || ''}} % Your LinkedIn Profile

\\begin{document}
\\fontfamily{cmr}\\selectfont

\\parbox{2.35cm}{%
\\includegraphics[width=2cm,clip]{iitg_logo.jpg}
}\\parbox{\\dimexpr\\linewidth-2.8cm\\relax}{
\\begin{tabularx}{\\linewidth}{L r}
  \\textbf{\\LARGE \\name} & +91-\\phone\\\\
  {Roll No.:\\roll} & \\href{mailto:\\emaila}{\\emaila} \\\\
  
  \\course &  \\href{mailto:\\emailb}{\\emailb}\\\\
  ${`{Minor in ${resumeData.personalInfo.MinorCourse}}`} &  \\href{https://github.com/\\github}{Github}${resumeData.personalInfo.website && `$|$ \\href{\\website}{Website}`}\\\\
  {Indian Institute Of Technology, Guwahati} & \\href{https://www.linkedin.com/in/\\linkedin/}{linkedin.com/in/\\linkedin}
\\end{tabularx}
}

%-------------EDUCATION----------------

\\section{Education}
\\setlength{\\tabcolsep}{5pt}
\\small{\\begin{tabularx}
{\\dimexpr\\textwidth-3mm\\relax}{|c|C|c|c|}
  \\hline
  \\textbf{Degree/Certificate } & 
  \\textbf{Institute/Board} & 
  \\textbf{CGPA/Percentage} & 
  \\textbf{Year}\\\\
  \\hline
  ${resumeData.education.map(edu => `${edu.degree || ''} & ${edu.institute || ''} & ${edu.cgpa || ''} & ${edu.year || ''} \\\\ \\hline `).join('')}
\\end{tabularx}}
\\vspace{-2mm}


${resumeData.experience && resumeData.experience.length > 0 ? `
    %-----------EXPERIENCE-----------------
\\section{Experience}
\\resumeSubHeadingListStart
${resumeData.experience.map(exp => `
  \\resumeSubheading
    {${exp.Company || ''}}{${exp.location || ''}}
    {${exp.role || ''}}{${exp.timeline || ''}}
    \\resumeItemListStart
      ${exp.workDone.map(work => `\\item {${work}}`).join('\n')}
    \\resumeItemListEnd
`).join('\n')}
\\resumeSubHeadingListEnd
\\vspace{-5.5mm}
` : ''}


${resumeData.projects && resumeData.projects.length > 0 ? `
    %-----------PROJECTS-----------------
\\section{Projects}
\\resumeSubHeadingListStart
${resumeData.projects.map(prj => `
  \\resumeProject
    {${prj.name || ''}}
    {${prj.type || ''}}
    {${prj.timeline || ''}}
    ${prj.githubLink ? `{\\href{${prj.githubLink}}{Github}}` : '{}'}
  \\resumeItemListStart
    ${prj.workDone && prj.workDone.length > 0 ? prj.workDone.map(work => `\\item {${work}}`).join('\n') : ''}
  \\resumeItemListEnd
`).join('\n')}
\\resumeSubHeadingListEnd
\\vspace{-5.5mm}
` : ''}


${resumeData.technicalSkills.length > 0 ? `
%---------------TECHNICAL SKILLS---------------
\\section{Technical Skills}
\\resumeHeadingSkillStart
${resumeData.technicalSkills.map(skill => `
  \\resumeSubItem{${skill.category}}
    {${skill.skills}}
`).join('\n')}
\\resumeHeadingSkillEnd
` : ''}


${resumeData.courses.length > 0 ? `
%---------------COURSES----------------
\\section{Key Courses Taken}
\\resumeHeadingSkillStart
${resumeData.courses.map(course => `
  \\resumeSubItem{${course.category}}
    {${course.courseName}}
`).join('\n')}
\\resumeHeadingSkillEnd
` : ''}

${resumeData.positions.length > 0 ? `
%---------------Positions of Responsibility------------------
\\section{Positions of Responsibility}
\\vspace{-0.4mm}
\\resumeSubHeadingListStart
${resumeData.positions.map(pos => `
  \\resumePOR{${pos.title}}
    {${pos.organization}}
    {${pos.timeline}}
    \\resumeItemListStart
      \\resumeItem{${pos.description}}
    \\resumeItemListEnd
`).join('\n')}
\\resumeSubHeadingListEnd
\\vspace{-4mm}
` : ''}

${resumeData.achievements.length > 0 ? `
%-------------------Achievements-----------------
\\section{Achievements}
\\vspace{-0.2mm}
\\resumeSubHeadingListStart
${resumeData.achievements.map(ach => `
  \\resumePOR{${ach.title}}
    {${ach.description}}
    {${ach.year}}
`).join('\n')}
\\resumeSubHeadingListEnd
` : ''}


\\hspace*{-5mm}\\rule{1.035\\textwidth}{0.1mm}
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
                <Navbar toogleDark={() => setDarkMode(!darkMode)} darkMode={darkMode} />
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
                    <DisplayResume resumeData={resumeData} latexCode={latexCode} />
                </div>
            </div>
        </div>
    );
}

export default App;
