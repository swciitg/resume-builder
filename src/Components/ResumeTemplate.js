import React from 'react';
import logo from '../assets/iitg_logo_bg.png';

const Resume = ({ resumeData }) => {
  return (
    <div className="w-[794px] h-[1123px] bg-white shadow-lg mx-auto my-8 text-[9pt] text-gray-900 font-serif">
      <div className="pl-[1.4cm] pr-[1.2cm] pt-[0.8cm] pb-[1cm]">
        {/* Header */}
        <div className="flex items-center">
          <div className="w-[2.35cm]">
            <img src={logo} alt="IITG Logo" className="w-[2cm] h-auto" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">{resumeData.personalInfo?.name || ''}</h1>
                <p>Roll No.: {resumeData.personalInfo?.rollNumber || ''}</p>
                <p>B.Tech - {resumeData.personalInfo?.courseBranch || ''}</p>
                <p>Indian Institute Of Technology, Guwahati</p>
              </div>
              <div className="flex flex-col justify-end text-right">
                <p>+91-{resumeData.personalInfo?.contactNumber || ''}</p>
                <p><a href={`mailto:${resumeData.personalInfo?.email || ''}`}>{resumeData.personalInfo?.email || ''}</a></p>
                <p>
                  <a href={resumeData.personalInfo?.githubProfile || ''}>GitHub</a>
                </p>
                <p><a href={resumeData.personalInfo?.linkedinProfile || ''}>LinkedIn</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="border-black border-b mb-2 mt-2">
          <h2 className="text-lg">Education</h2>
        </div>
        <table className="w-full border-collapse text-[0.8rem] mb-2">
          <thead>
            <tr>
              <th className="border border-black text-center font-bold">Degree/Certificate</th>
              <th className="border border-black text-center font-bold">Institute/Board</th>
              <th className="border border-black text-center font-bold">CGPA/Percentage</th>
              <th className="border border-black text-center font-bold">Year</th>
            </tr>
          </thead>
          <tbody>
            {resumeData.education?.map((edu, index) => (
              <tr key={index}>
                <td className="border border-black text-center">{edu.degree || ''}</td>
                <td className="border border-black text-center">{edu.institute || ''}</td>
                <td className="border border-black text-center">{edu.cgpa || ''}</td>
                <td className="border border-black text-center">{edu.year || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Experience */}
        <div className="border-black border-b mb-2 mt-2">
          <h2 className="text-lg">Experience</h2>
        </div>
        <ul className="list-none">
          {resumeData.experience?.map((exp, index) => (
            <li key={index}>
              <div className="flex justify-between mb-1">
                <div>
                  <strong>{exp.title || ''}</strong>
                  <p className="text-[0.8rem] italic">{exp.designation || ''}</p>
                </div>
                <div className="text-right text-[0.8rem] italic">
                  {exp.timeline || ''}
                </div>
              </div>
              <ul className="ml-[3ex] mr-[2ex] list-none">
                {exp.description?.split('\n').map((desc, idx) => (
                  <li key={idx} className="flex items-baseline">
                    <span className="text-[0.6rem] mr-[1.2mm]">•</span> {desc || ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Projects */}
        <div className="border-black border-b mb-2 mt-2">
          <h2 className="text-lg">Projects</h2>
        </div>
        <ul className="list-none">
          {resumeData.projects?.map((project, index) => (
            <li key={index}>
              <div className="flex justify-between mb-1">
                <div>
                  <strong>{project.name || ''}</strong>
                  <p className="text-[0.8rem] italic">{project.type || ''}</p>
                </div>
                <div className="text-right text-[0.8rem] italic">
                  {project.timeline || ''}
                  {project.githubLink && <p><a href={project.githubLink}>Github</a></p>}
                </div>
              </div>
              <ul className="ml-[3ex] mr-[2ex] list-none">
                {project.description?.split('\n').map((desc, idx) => (
                  <li key={idx} className="flex items-baseline">
                    <span className="text-[0.6rem] mr-[1.2mm]">•</span> {desc || ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Technical Skills */}
        <div className="border-black border-b mb-2 mt-2">
          <h2 className="text-lg">Technical Skills</h2>
        </div>
        <ul className="ml-0 list-none">
          {resumeData.technicalSkills?.map((skill, index) => (
            <li key={index} className="flex items-baseline mb-[1.7mm]">
              <strong>{skill.category || ''}:</strong><span className="ml-[0.5mm]">{skill.skills || ''}</span>
            </li>
          ))}
        </ul>

        {/* Key Courses Taken */}
        <div className="border-black border-b mb-2 mt-2">
          <h2 className="text-lg">Key courses taken</h2>
        </div>
        <ul className="ml-0 list-none">
          {resumeData.courses?.map((course, index) => (
            <li key={index} className="flex items-baseline mb-[1.7mm]">
              <strong>{course.category || ''}:</strong><span className="ml-[0.5mm]">{course.courseName || ''}</span>
            </li>
          ))}
        </ul>

        {/* Positions of Responsibility */}
        <div className="border-black border-b mb-2 mt-2">
          <h2 className="text-lg">Positions of Responsibility</h2>
        </div>
        <ul className="list-none">
          {resumeData.positions?.map((position, index) => (
            <li key={index}>
              <div className="flex justify-between mb-1">
                <div>
                  <strong>{position.title || ''}</strong>, {position.organization || ''}
                </div>
                <div className="text-right text-[0.8rem] italic">{position.timeline || ''}</div>
              </div>
              <ul className="ml-[3ex] mr-[2ex] list-none">
                {position.description?.split('\n').map((desc, idx) => (
                  <li key={idx} className="flex items-baseline">
                    <span className="text-[0.6rem] mr-[1.2mm]">•</span> {desc || ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Achievements */}
        <div className="border-black border-b mb-2 mt-2">
          <h2 className="text-lg">Achievements</h2>
        </div>
        <ul className="list-none">
          {resumeData.achievements?.map((achievement, index) => (
            <li key={index}>
              <div className="flex justify-between mb-1">
                <div>
                  <strong>{achievement.title || ''}</strong> {achievement.issuer || ''}
                </div>
                <div className="text-right text-[0.8rem] italic">{achievement.year || ''}</div>
              </div>
              <ul className="ml-[3ex] mr-[2ex] list-none">
                {achievement.description?.split('\n').map((desc, idx) => (
                  <li key={idx} className="flex items-baseline">
                    <span className="text-[0.6rem] mr-[1.2mm]">•</span> {desc || ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Bottom Rule */}
        <div className="w-[calc(100%+1.4cm+1.2cm)] -ml-[1.4cm] border-t border-black mt-2"></div>
      </div>
    </div>
  );
};

export default Resume;