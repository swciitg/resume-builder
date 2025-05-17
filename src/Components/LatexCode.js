const LatexCode = ({resumeData}) => {
  const code = `
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

% Define fields
\\newcommand{\\name}{${resumeData.personalInfo.name || ''}}
\\newcommand{\\course}{${resumeData.personalInfo.courseBranch || ''}}
\\newcommand{\\roll}{${resumeData.personalInfo.rollNumber || ''}}
\\newcommand{\\phone}{${resumeData.personalInfo.contactNumber || ''}}
\\newcommand{\\email}{${resumeData.personalInfo.email || ''}}

${resumeData.personalInfo.secondaryEmail ? `\\newcommand{\\secondaryEmail}{${resumeData.personalInfo.secondaryEmail}}` : `% no secondaryEmail`}
${resumeData.personalInfo.githubProfile ? `\\newcommand{\\github}{${resumeData.personalInfo.githubProfile}}` : `% no github`}
${resumeData.personalInfo.website ? `\\newcommand{\\website}{${resumeData.personalInfo.website}}` : `% no website`}
\\newcommand{\\linkedin}{${resumeData.personalInfo.linkedinProfile || ''}}

% Start document
\\begin{document}
\\fontfamily{cmr}\\selectfont

\\parbox{2.35cm}{%
  \\includegraphics[width=2cm,clip]{iitg_logo.jpg}
}
\\parbox{\\dimexpr\\linewidth-2.8cm\\relax}{
  \\begin{tabularx}{\\linewidth}{L r}
    \\textbf{\\LARGE \\name} & +91-\\phone \\\\
    {Roll No.: \\roll} & \\href{mailto:\\email}{\\email} \\\\
    
    \\course & 

${resumeData.personalInfo.secondaryEmail ? `\\href{mailto:\\secondaryEmail}{\\secondaryEmail} \\\\` : 
  `${resumeData.personalInfo.githubProfile ? `\\href{\\github}{Github}` : ''} 
   ${resumeData.personalInfo.githubProfile && resumeData.personalInfo.website ? ` \$|$ ` : ''} 
   ${resumeData.personalInfo.website ? `\\href{\\website}{Website}` : ''} \\\\`}


    {Indian Institute Of Technology, Guwahati}&

 ${resumeData.personalInfo.secondaryEmail ? 
  `${resumeData.personalInfo.githubProfile ? `\\href{\\github}{Github}` : ''} 
   ${resumeData.personalInfo.githubProfile && resumeData.personalInfo.website ? ` \$|$ ` : ''} 
   ${resumeData.personalInfo.website ? `\\href{\\website}{Website}` : ''} \\\\`
  : 
  `${resumeData.personalInfo.linkedinProfile ? `\\href{\\linkedin}{LinkedIn} \\\\` : ''}`
}


    {}&
    ${resumeData.personalInfo.secondaryEmail?`\\href{\\linkedin}{LinkedIn}\\\\`:''}

    
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
  ${(resumeData.education||[]).map(edu => `${edu.degree || ''} & ${edu.institute || ''} & ${edu.cgpa || ''} & ${edu.year || ''} \\\\ \\hline `).join('')}
\\end{tabularx}}
\\vspace{-2mm}


${resumeData.experience && resumeData.experience?.length > 0 ? `
    %-----------EXPERIENCE-----------------
\\section{Experience}
\\resumeSubHeadingListStart
${(resumeData.experience||[]).map(exp => `
  \\resumeSubheading
    {${exp.company || ''}}{${exp.location || ''}}
    {${exp.role || ''}}{${exp.timeline || ''}}
    \\resumeItemListStart
      ${exp.workDone.map(work => `\\item {${work}}`).join('\n')}
    \\resumeItemListEnd
`).join('\n')}
\\resumeSubHeadingListEnd
\\vspace{-5.5mm}
` : ''}


${resumeData.projects && resumeData.projects?.length > 0 ? `
    %-----------PROJECTS-----------------
\\section{Projects}
\\resumeSubHeadingListStart
${(resumeData.projects||[]).map(prj => `
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


${resumeData.technicalSkills?.length > 0 ? `
%---------------TECHNICAL SKILLS---------------
\\section{Technical Skills}
\\resumeHeadingSkillStart
${(resumeData.technicalSkills||[]).map(skill => `
  \\resumeSubItem{${skill.category}}
    {${skill.skills}}
`).join('\n')}
\\resumeHeadingSkillEnd
` : ''}


${resumeData.courses?.length > 0 ? `
%---------------COURSES----------------
\\section{Key Courses Taken}
\\resumeHeadingSkillStart
${(resumeData.courses||[]).map(course => `
  \\resumeSubItem{${course.category}}
    {${course.courseName}}
`).join('\n')}
\\resumeHeadingSkillEnd
` : ''}

${resumeData.positions?.length > 0 ? `
%---------------Positions of Responsibility------------------
\\section{Positions of Responsibility}
\\vspace{-0.4mm}
\\resumeSubHeadingListStart
${(resumeData.positions||[]).map(pos => `
  \\resumePOR{${pos.title}}
    {${pos.organization}}
    {${pos.timeline}}
    ${pos.description.length > 0 ? `
        \\resumeItemListStart
        ${pos.description.map(desc => `\\item {${desc}}`).join('\n')}
        \\resumeItemListEnd
    `:''}
`).join('\n')}
\\resumeSubHeadingListEnd
\\vspace{-4mm}
` : ''}

${resumeData.extracaurriculars?.length > 0 ? `
%---------------Extra-curriculars------------------
\\section{Extra-curriculars}
\\vspace{-0.4mm}
\\resumeSubHeadingListStart
${(resumeData.extracaurriculars||[]).map(carr => `
  \\resumePOR{${carr.title}}
    {${carr.organization}}
    {${carr.timeline}}
    ${carr.description.length > 0 ? `
        \\resumeItemListStart
        ${carr.description.map(desc => `\\item {${desc}}`).join('\n')}
        \\resumeItemListEnd
    `:''}
`).join('\n')}
\\resumeSubHeadingListEnd
\\vspace{-4mm}
` : ''}

${resumeData.achievements?.length > 0 ? `
%-------------------Achievements-----------------
\\section{Achievements}
\\resumeItemListStart

\\vspace{-0.2mm}
\\resumeSubHeadingListStart
${(resumeData.achievements||[]).map(ach => `
  \\resumeItem{${ach.title}: }
    {${ach.description}}
    {${ach.year}}
`).join('\n')}
\\resumeSubHeadingListEnd
\\resumeItemListEnd
\\vspace{-4mm}
` : ''}


\\hspace*{-5mm}\\rule{1.035\\textwidth}{0.1mm}
\\end{document}
`;

return code;


}

export default LatexCode;