import { PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeBuilder = ({ resumeData, setResumeData, errors, setErrors, latexCode }) => {
    const [showSecondEmail, setShowSecondEmail] = useState(false);
    const [showMinorCourse, setShowMinorCourse] = useState(false);
    const [showWebsite, setShowWebsite] = useState(false);


    const validate = () => {
        let tempErrors = {};
        // Validate personal information
        if (!resumeData.personalInfo.name) tempErrors.name = "Name is required";
        if (!resumeData.personalInfo.contactNumber) tempErrors.contactNumber = "Contact Number is required";
        if (!resumeData.personalInfo.email) tempErrors.email = "Email is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // Return true if no errors
    };

    const handleInputChange = (section, index, field, value) => {
        const updatedData = { ...resumeData };
        updatedData[section][index][field] = value;
        setResumeData(updatedData);
    };

    const handlePersonalInfoChange = (field, value) => {
        setResumeData({
            ...resumeData,
            personalInfo: {
                ...resumeData.personalInfo,
                [field]: value,
            },
        });
    };



    const addEntry = (section) => {
        const updatedData = { ...resumeData };
        if (section === 'experience') {
            updatedData[section].push({
                Company: '',
                location: '',
                role: '',
                timeline: '',
                workDone: [],
            });
        } else if (section === 'projects') {
            updatedData[section].push({
                name: '',
                type: '',
                timeline: '',
                githubLink: '',
                workDone: [],
            });
        } else {
            updatedData[section].push({
                name: '',
                type: '',
                timeline: '',
                githubLink: '',
                description: '',
            });
        }
        setResumeData(updatedData);
    };
    const addWorkDone = (section, index) => {
        const updatedData = { ...resumeData };
        if (!updatedData[section][index].workDone) {
            updatedData[section][index].workDone = [];
        }
        updatedData[section][index].workDone.push('');
        setResumeData(updatedData);
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!validate()) {
        //     console.error('Validation failed:', errors);
        //     return;
        // }
        console.log('Form Submitted:', resumeData);

        try {
            const response = await axios.post('http://localhost:5000/compile', {
                latexCode: latexCode
            }, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            console.log(blob)
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            // link.remove();
            // window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };




    return (
        <form className="container mx-auto p-4" onSubmit={handleSubmit}>
            {/* <h1 className="text-2xl font-bold text-center mb-6">Resume Builder</h1> */}

            {/* Personal Information Section */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Name */}
                    <input
                        type="text"
                        placeholder="Name"
                        className="input-field ..."
                        value={resumeData.personalInfo.name}
                        onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                        required
                    />
                    {errors.name && <span className="text-red-600">{errors.name}</span>}

                    {/* Roll Number */}
                    <input
                        type="text"
                        placeholder="Roll Number"
                        className="input-field ..."
                        value={resumeData.personalInfo.rollNumber}
                        onChange={(e) => handlePersonalInfoChange('rollNumber', e.target.value)}
                    />

                    {/* Course - Branch */}
                    <input
                        type="text"
                        placeholder="Course - Branch"
                        className="input-field ..."
                        value={resumeData.personalInfo.courseBranch}
                        onChange={(e) => handlePersonalInfoChange('courseBranch', e.target.value)}
                    />

                    {/* Contact Number */}
                    <input
                        type="tel"
                        placeholder="Contact Number"
                        className="input-field ..."
                        value={resumeData.personalInfo.contactNumber}
                        onChange={(e) => handlePersonalInfoChange('contactNumber', e.target.value)}
                        required
                    />
                    {errors.contactNumber && <span className="text-red-600">{errors.contactNumber}</span>}

                    {/* Primary Email */}
                    <input
                        type="email"
                        placeholder="Primary Email"
                        className="input-field ..."
                        value={resumeData.personalInfo.emaila}
                        onChange={(e) => handlePersonalInfoChange('emaila', e.target.value)}
                        required
                    />
                    {errors.emaila && <span className="text-red-600">{errors.emaila}</span>}

                    {/* Conditionally Render Second Email */}
                    {showSecondEmail && (
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Second Email"
                                className="input-field w-full pr-10 ..."
                                value={resumeData.personalInfo.emailb}
                                onChange={(e) => handlePersonalInfoChange('emailb', e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setShowSecondEmail(false);
                                    handlePersonalInfoChange('emailb', '');
                                }}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                title="Remove"
                            >
                                ✕
                            </button>
                        </div>
                    )}


                    {/* Conditionally Render Minor Course */}
                    {showMinorCourse && (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Minor Course"
                                className="input-field w-full pr-10 ..."
                                value={resumeData.personalInfo.MinorCourse}
                                onChange={(e) => handlePersonalInfoChange('MinorCourse', e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setShowMinorCourse(false);
                                    handlePersonalInfoChange('MinorCourse', '');
                                }}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                title="Remove"
                            >
                                ✕
                            </button>
                        </div>
                    )}


                    {/* Conditionally Render Website */}
                    {showWebsite && (
                        <div className="relative">
                            <input
                                type="url"
                                placeholder="Portfolio Website"
                                className="input-field w-full pr-10 ..."
                                value={resumeData.personalInfo.website}
                                onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setShowWebsite(false);
                                    handlePersonalInfoChange('website', '');
                                }}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                title="Remove"
                            >
                                ✕
                            </button>
                        </div>
                    )}


                    {/* GitHub */}
                    <input
                        type="text"
                        placeholder="GitHub Profile"
                        className="input-field ..."
                        value={resumeData.personalInfo.githubProfile}
                        onChange={(e) => handlePersonalInfoChange('githubProfile', e.target.value)}
                    />

                    {/* LinkedIn */}
                    <input
                        type="text"
                        placeholder="LinkedIn Profile"
                        className="input-field ..."
                        value={resumeData.personalInfo.linkedinProfile}
                        onChange={(e) => handlePersonalInfoChange('linkedinProfile', e.target.value)}
                    />
                </div>

                {/* Buttons to Add Optional Fields */}
                <div className="mt-4 flex flex-wrap gap-4">
                    {!showSecondEmail && (
                        <button type="button" onClick={() => setShowSecondEmail(true)} className="text-blue-600 hover:underline flex items-center">
                            <PlusIcon className="w-4 h-4 mr-1" /> Add Second Email
                        </button>
                    )}

                    {!showMinorCourse && (
                        <button type="button" onClick={() => setShowMinorCourse(true)} className="text-blue-600 hover:underline flex items-center">
                            <PlusIcon className="w-4 h-4 mr-1" /> Add Minor Course
                        </button>
                    )}

                    {!showWebsite && (
                        <button type="button" onClick={() => setShowWebsite(true)} className="text-blue-600 hover:underline flex items-center">
                            <PlusIcon className="w-4 h-4 mr-1" /> Add Website
                        </button>
                    )}
                </div>
            </section>


            {/* Education Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">

                    <h2 className="text-xl font-semibold mb-4">Education</h2>
                    <button
                        onClick={() => addEntry('education')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.education.map((education, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Degree/Certificate"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={education.degree}
                            onChange={(e) =>
                                handleInputChange('education', index, 'degree', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Institute/Board"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={education.institute}
                            onChange={(e) =>
                                handleInputChange('education', index, 'institute', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="CGPA/Percentage"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={education.cgpa}
                            onChange={(e) =>
                                handleInputChange('education', index, 'cgpa', e.target.value)
                            }
                        />
                        <input
                            type="number"
                            placeholder="Year"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={education.year}
                            onChange={(e) =>
                                handleInputChange('education', index, 'year', e.target.value)
                            }
                        />
                    </div>
                ))}
            </section>

            {/* Experience Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Experience</h2>
                    <button
                        onClick={() => addEntry('experience')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>

                {resumeData.experience.map((experience, index) => (
                    <div key={index} className="mb-1 grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        <input
                            type="text"
                            placeholder="Company"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={experience.Company}
                            onChange={(e) =>
                                handleInputChange('experience', index, 'Company', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="location"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={experience.location}
                            onChange={(e) =>
                                handleInputChange('experience', index, 'location', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="role"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={experience.role}
                            onChange={(e) =>
                                handleInputChange('experience', index, 'role', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Timeline"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={experience.timeline}
                            onChange={(e) =>
                                handleInputChange('experience', index, 'timeline', e.target.value)
                            }
                        />
                        <div className="col-span-2">
                            <div className="font-semibold mb-2">Work Done:</div>
                            {experience.workDone && experience.workDone.map((task, taskIndex) => (
                                <div key={taskIndex} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder={`Task ${taskIndex + 1}`}
                                        className="input-field w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={task}
                                        onChange={(e) => {
                                            const updatedData = { ...resumeData };
                                            updatedData.experience[index].workDone[taskIndex] = e.target.value;
                                            setResumeData(updatedData);
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            const updatedData = { ...resumeData };
                                            updatedData.experience[index].workDone.splice(taskIndex, 1);
                                            setResumeData(updatedData);
                                        }}
                                        className="text-red-500 hover:text-red-700 text-lg"
                                        title="Delete Task"
                                    >
                                        ❌
                                    </button>
                                </div>

                            ))}
                            <button
                                onClick={() => addWorkDone('experience', index)}
                                className="mt-1 px-4 py-1 text-sm rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                            >
                                Add Work Done
                            </button>
                        </div>


                        {/* <div className='w-full'>WORKS DONE:</div> */}
                        {/* <input
                            type="text"
                            placeholder="workDone"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={experience.workDone}
                            onChange={(e) =>
                                handleInputChange('experience', index, 'workDone', e.target.value)
                            }
                        /> */}

                        {/* <div> <button>ADD</button></div> */}
                        {/* <textarea
                            placeholder="Description"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={experience.description}
                            onChange={(e) =>
                                handleInputChange('experience', index, 'description', e.target.value)
                            }
                        /> */}
                    </div>
                ))}


            </section>

            {/* Projects Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Projects</h2>
                    <button
                        onClick={() => addEntry('projects')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>

                {resumeData.projects.map((project, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Project Name"
                            className="input-field bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={project.name}
                            onChange={(e) => handleInputChange('projects', index, 'name', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Project Type"
                            className="input-field bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={project.type}
                            onChange={(e) => handleInputChange('projects', index, 'type', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Timeline"
                            className="input-field bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={project.timeline}
                            onChange={(e) => handleInputChange('projects', index, 'timeline', e.target.value)}
                        />
                        <input
                            type="url"
                            placeholder="GitHub Link"
                            className="input-field bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={project.githubLink}
                            onChange={(e) => handleInputChange('projects', index, 'githubLink', e.target.value)}
                        />

                        {/* Work Done Section */}
                        <div className="col-span-2">
                            <div className="font-semibold mb-2">Work Done:</div>
                            {project.workDone && project.workDone.map((task, taskIndex) => (
                                <div key={taskIndex} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder={`Task ${taskIndex + 1}`}
                                        className="input-field w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={task}
                                        onChange={(e) => {
                                            const updatedData = { ...resumeData };
                                            updatedData.projects[index].workDone[taskIndex] = e.target.value;
                                            setResumeData(updatedData);
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            const updatedData = { ...resumeData };
                                            updatedData.projects[index].workDone.splice(taskIndex, 1);
                                            setResumeData(updatedData);
                                        }}
                                        className="text-red-500 hover:text-red-700 text-lg"
                                        title="Delete Task"
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    const updatedData = { ...resumeData };
                                    updatedData.projects[index].workDone.push('');
                                    setResumeData(updatedData);
                                }}
                                className="mt-1 px-4 py-1 text-sm rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                            >
                                Add Work Done
                            </button>
                        </div>
                    </div>
                ))}
            </section>



            {/* Technical Skills Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
                    <button
                        onClick={() => addEntry('technicalSkills')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.technicalSkills.map((skill, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Category"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={skill.category}
                            onChange={(e) =>
                                handleInputChange('technicalSkills', index, 'category', e.target.value)
                            }
                            required
                        />
                        <input
                            type="text"
                            placeholder="Skills (comma separated)"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={skill.skills}
                            onChange={(e) =>
                                handleInputChange('technicalSkills', index, 'skills', e.target.value)
                            }
                            required
                        />
                    </div>

                ))}
            </section>

            {/* Key Courses Taken Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Key Courses Taken</h2>
                    <button
                        onClick={() => addEntry('courses')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.courses.map((course, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Category"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={course.category}
                            onChange={(e) =>
                                handleInputChange('courses', index, 'category', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Course Name"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={course.courseName}
                            onChange={(e) =>
                                handleInputChange('courses', index, 'courseName', e.target.value)
                            }
                        />
                    </div>
                ))}

            </section>

            {/* Positions of Responsibility Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Positions of Responsibility</h2>
                    <button
                        onClick={() => addEntry('positions')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.positions.map((position, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Position Title"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={position.title}
                            onChange={(e) =>
                                handleInputChange('positions', index, 'title', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Organization"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={position.organization}
                            onChange={(e) =>
                                handleInputChange('positions', index, 'organization', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Timeline"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={position.timeline}
                            onChange={(e) =>
                                handleInputChange('positions', index, 'timeline', e.target.value)
                            }
                        />
                        <textarea
                            placeholder="Description"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={position.description}
                            onChange={(e) =>
                                handleInputChange('positions', index, 'description', e.target.value)
                            }
                        />
                    </div>
                ))}

            </section>

            {/* Achievements Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Achievements</h2>
                    <button
                        onClick={() => addEntry('achievements')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.achievements.map((achievement, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Achievement Title"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={achievement.title}
                            onChange={(e) =>
                                handleInputChange('achievements', index, 'title', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={achievement.description}
                            onChange={(e) =>
                                handleInputChange('achievements', index, 'description', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Year"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={achievement.year}
                            onChange={(e) =>
                                handleInputChange('achievements', index, 'year', e.target.value)
                            }
                        />
                    </div>
                ))}
            </section>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded btn-submit items-center " type="submit">
                    Generate Resume
                </button></div>
        </form>
    );
};

export default ResumeBuilder;
