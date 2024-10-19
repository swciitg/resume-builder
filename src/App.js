import React, { useState } from 'react';

import './App.css';
import ResumeBuilder from './Components/ResumeBuilder'

import DisplayResume from './Components/DisplayResume.js';


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
    return (
      <div className="container mx-auto">
          {/* Pass the state and the setState function to ResumeBuilder */}
          <ResumeBuilder resumeData={resumeData} setResumeData={setResumeData} errors={errors} setErrors={setErrors}/>
          {/* Pass the same state to the DisplayResume component */}
          <DisplayResume resumeData={resumeData} />
      </div>
  );
}

export default App;
