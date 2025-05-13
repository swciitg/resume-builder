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
            // {
            //     title: '',
            //     designation: '',
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
            {
                category: '',
                skills: '',
            },
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

            <div class="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
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
                    <DisplayResume resumeData={resumeData} />
                </div>
            </div>
        </div>
    );
}

export default App;
