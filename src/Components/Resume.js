import React from "react";
import logo from './iitg_logo.jpg'

const Resume = ({ resumeData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto text-gray-900">
      {/* Header */}
      <div className="flex items-center mb-6">
        <img src={logo} alt="IITG Logo" className="w-16 h-16 mr-4" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{resumeData.personalInfo.name || ""}</h1>
          <p className="text-sm text-gray-700">Roll No.: {resumeData.personalInfo.rollNumber || ""}</p>
          <p className="text-sm text-gray-700">{resumeData.personalInfo.courseBranch || ""}</p>
          <p className="text-sm text-gray-700">Indian Institute Of Technology, Guwahati</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-700">+91-{resumeData.personalInfo.contactNumber || ""}</p>
          <p className="text-sm text-blue-500">
            <a href={`mailto:${resumeData.personalInfo.email}`}>{resumeData.personalInfo.email}</a>
          </p>
          <p className="text-sm text-blue-500">
            <a href={`${resumeData.personalInfo.githubProfile}`}>GitHub</a>
          </p>
          <p className="text-sm text-blue-500">
            <a href={resumeData.personalInfo.linkedinProfile || "#"}>LinkedIn</a>
          </p>
        </div>
      </div>

      {/* Section: Education */}
      {resumeData.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">Education</h2>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Degree/Certificate</th>
                <th className="p-2">Institute/Board</th>
                <th className="p-2">CGPA/Percentage</th>
                <th className="p-2">Year</th>
              </tr>
            </thead>
            <tbody>
              {resumeData.education.map((edu, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2">{edu.degree}</td>
                  <td className="p-2">{edu.institute}</td>
                  <td className="p-2">{edu.cgpa}</td>
                  <td className="p-2">{edu.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Section: Experience */}
      {resumeData.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">{exp.title}</h3>
              <p className="text-sm text-gray-700">{exp.designation}</p>
              <p className="text-sm text-gray-700">{exp.timeline}</p>
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>{exp.description}</li>
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Section: Projects */}
      {resumeData.projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p className="text-sm text-gray-700">{project.type}</p>
              <p className="text-sm text-gray-700">{project.timeline}</p>
              <a href={project.githubLink} className="text-blue-500">GitHub Link</a>
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>{project.description}</li>
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Section: Technical Skills */}
      {resumeData.technicalSkills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">Technical Skills</h2>
          <ul className="list-disc list-inside text-sm">
            {resumeData.technicalSkills.map((skill, index) => (
              <li key={index}>
                <strong>{skill.category}:</strong> {skill.skills}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Section: Key Courses */}
      {resumeData.courses?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">Key Courses Taken</h2>
          <ul className="list-disc list-inside text-sm">
            {resumeData.courses.map((course, index) => (
              <li key={index}>
                <strong>{course.category}:</strong> {course.courseName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Section: Positions of Responsibility */}
      {resumeData.positions?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">Positions of Responsibility</h2>
          {resumeData.positions.map((position, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">{position.title}</h3>
              <p className="text-sm text-gray-700">{position.organization}</p>
              <p className="text-sm text-gray-700">{position.timeline}</p>
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>{position.description}</li>
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Section: Achievements */}
      {resumeData.achievements?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">Achievements</h2>
          <ul className="list-disc list-inside text-sm">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index}>
                <strong>{achievement.title}:</strong> {achievement.description} ({achievement.year})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Resume;