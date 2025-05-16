import React, { useState, useEffect } from 'react';
import './App.css';
import ResumeBuilder from './Components/ResumeBuilder';
import DisplayResume from './Components/DisplayResume.js';
import Navbar from './Components/Navbar.js';
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import LatexCode from './Components/LatexCode.js';
import { useLatex } from './Components/LatexContext.js';
import axios from 'axios';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.data);
                if (response.data.authenticated) {
                    setUser(response.data.user);
                } else {
                    window.location.href = 'http://localhost:5000/auth/azuread';
                }
            } catch (error) {
                window.location.href = 'http://localhost:5000/auth/azuread';
            }finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    

    const {latexCodeE, setLatexCode} = useLatex();
    const entryTemplates = {
        education: {
            degree: '',
            institute: '',
            cgpa: '',
            year: ''
        },
        experience: {
            company: '',
            location: '',
            role: '',
            timeline: '',
            workDone:[],
        },
        projects: {
            name: '',
            type: '',
            timeline: '',
            githubLink: '',
            workDone: [],
        },
        technicalSkills: {
            category: '',
            skills: '',
        },
        courses: {
            category: '',
            courseName: '',
        },
        positions: {
            title: '',
            organization: '',
            timeline: '',
            description: [],
        },
        extracaurriculars: {
            title: '',
            organization: '',
            timeline: '',
            description: [],
        },
        achievements: {
            title: '',
            description: '',
            year: '',
        },
    };

    const [resumeData, setResumeData] = useState({
        personalInfo: {
            name: '',
            rollNumber: '',
            courseBranch: '',
            contactNumber: '',
            email: '',
            githubProfile: '',
            linkedinProfile: '',
            secondaryEmail:'',
            website:'',
        },
        education: [],
        experience: [],
        projects: [],
        technicalSkills: [],
        courses: [],
        positions: [],
        achievements: [],
        extracaurriculars: [],

        // education: [{ ...entryTemplates.education }],
        // experience: [{ ...entryTemplates.experience }],
        // projects: [{ ...entryTemplates.projects }],
        // technicalSkills: [{ ...entryTemplates.technicalSkills }],
        // courses: [{ ...entryTemplates.courses }],
        // positions: [{ ...entryTemplates.positions }],
        // achievements: [{ ...entryTemplates.achievements }],
    });

    const latexCode = LatexCode({ resumeData });

    const [errors, setErrors] = useState({});
    const [showPreview, setShowPreview] = useState(false);

    const [darkMode, setDarkMode] = useState(true);
    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [darkMode]);

    if (loading) return <div>Loading...</div>; 

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
                                <ChevronRightIcon className="w-8 h-8 text-primary_text hover:text-hover_accent" />
                            ) : (
                                <ChevronLeftIcon className="w-8 h-8 text-primary_text hover:text-hover_accent" />
                            )}
                        </button></div>


                    <ResumeBuilder
                        latexCode={latexCode}
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                        errors={errors}
                        setErrors={setErrors}
                        templates={entryTemplates}
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