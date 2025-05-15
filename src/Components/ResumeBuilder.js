import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLatex } from './LatexContext';

const ResumeBuilder = ({ resumeData, setResumeData, errors, setErrors, latexCode, templates }) => {
    useEffect(() => {
        console.log(resumeData)
    }, [resumeData])
    const {latexCodeE, setLatexCode} = useLatex();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        let tempErrors = {};
        // Validate personal information
        if (!resumeData.personalInfo.name) tempErrors.name = "Name is required";
        if (!resumeData.personalInfo.contactNumber) tempErrors.contactNumber = "Contact Number is required";
        if (!resumeData.personalInfo.email) tempErrors.email = "Email is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // Return true if no errors
    };
    // useEffect(()=>{
    //     console.log(resumeData);
    // },[resumeData])

    useEffect(()=>{
        setLatexCode(latexCode);
    },[latexCode])
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
        updatedData[section].push(templates[section]);
        setResumeData(updatedData);
    };

    const deleteEntry = (section, index) => {
        const updatedData = { ...resumeData };
        updatedData[section] = [...updatedData[section]];
        updatedData[section].splice(index, 1);
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
        // return
        if (!validate()) {
            console.error('Validation failed:', errors);
            return;
        }
        console.log('Form Submitted:', resumeData);
        setIsSubmitted(true);

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
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            setIsSubmitted(false);
        } catch (error) {
            console.error('Error generating PDF:', error);
            setIsSubmitted(false);
        }
    };

    return (
        <form className="container mx-auto p-4" >
            {/* Personal Information Section */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="input-field bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        disabled:opacity-50 disabled:cursor-not-allowed"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                        required
                        disabled={isSubmitted}
                    />
                    {errors.name && <span className="text-red-600">{errors.name}</span>}

                    <input
                        type="text"
                        placeholder="Roll Number"
                        className="input-field bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        disabled:opacity-50 disabled:cursor-not-allowed"
                        value={resumeData.personalInfo.rollNumber}
                        onChange={(e) => handlePersonalInfoChange('rollNumber', e.target.value)}
                        disabled={isSubmitted}
                    />
                    <input
                        type="text"
                        placeholder="Course - Branch"
                        className="input-field bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        disabled:opacity-50 disabled:cursor-not-allowed"
                        value={resumeData.personalInfo.courseBranch}
                        onChange={(e) => handlePersonalInfoChange('courseBranch', e.target.value)}
                        disabled={isSubmitted}
                    />
                    <input
                        type="tel"
                        placeholder="Contact Number"
                        className="input-field bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        disabled:opacity-50 disabled:cursor-not-allowed"
                        value={resumeData.personalInfo.contactNumber}
                        onChange={(e) => handlePersonalInfoChange('contactNumber', e.target.value)}
                        required
                        disabled={isSubmitted}
                    />
                    {errors.contactNumber && <span className="text-red-600">{errors.contactNumber}</span>}

                    <input
                        type="email"
                        placeholder="Email"
                        className="input-field bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        disabled:opacity-50 disabled:cursor-not-allowed"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                        required
                        disabled={isSubmitted}
                    />
                    {errors.email && <span className="text-red-600">{errors.email}</span>}

                    <input
                        type="url"
                        placeholder="GitHub Profile"
                        className="input-field bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        disabled:opacity-50 disabled:cursor-not-allowed"
                        value={resumeData.personalInfo.githubProfile}
                        onChange={(e) => handlePersonalInfoChange('githubProfile', e.target.value)}
                        disabled={isSubmitted}
                    />
                    <input
                        type="url"
                        placeholder="LinkedIn Profile"
                        className="input-field bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        disabled:opacity-50 disabled:cursor-not-allowed"
                        value={resumeData.personalInfo.linkedinProfile}
                        onChange={(e) => handlePersonalInfoChange('linkedinProfile', e.target.value)}
                        disabled={isSubmitted}
                    />
                </div>
            </section>

            {/* Education Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Education</h2>
                    <button
                        type="button"
                        onClick={() => addEntry('education')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 
                        text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 
                        transition disabled:bg-gray-400 disabled:text-gray-600 
                        disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.education.map((education, index) => (
                    <div key={index} className="relative pb-7 p-2 border rounded-md shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Degree/Certificate"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={education.degree}
                                onChange={(e) =>
                                    handleInputChange('education', index, 'degree', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="Institute/Board"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={education.institute}
                                onChange={(e) =>
                                    handleInputChange('education', index, 'institute', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="CGPA/Percentage"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={education.cgpa}
                                onChange={(e) =>
                                    handleInputChange('education', index, 'cgpa', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="Year"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={education.year}
                                onChange={(e) =>
                                    handleInputChange('education', index, 'year', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => deleteEntry('education', index)}
                            className="absolute right-4 disabled:cursor-not-allowed disabled:opacity-70"
                            disabled={isSubmitted}
                        >
                            <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700 disabled:text-gray-600" />
                        </button>
                    </div>
                ))}
            </section>

            {/* Experience Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Experience</h2>
                    <button
                        type="button"
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
                                        type='button'
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
                                type='button'
                                onClick={() => addWorkDone('experience', index)}
                                className="mt-1 px-4 py-1 text-sm rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                            >
                                Add Work Done
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteEntry('experience', index)}
                                className="absolute right-4 disabled:cursor-not-allowed disabled:opacity-70"
                                disabled={isSubmitted}
                            >
                                <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700 disabled:text-gray-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </section>


            {/* Projects Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Projects</h2>
                    <button
                        type="button"
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
                                        type='button'
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
                                type='button'
                                onClick={() => {
                                    const updatedData = { ...resumeData };
                                    updatedData.projects[index].workDone.push('');
                                    setResumeData(updatedData);
                                }}
                                className="mt-1 px-4 py-1 text-sm rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                            >
                                Add Work Done
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteEntry('projects', index)}
                                className="absolute right-4 disabled:cursor-not-allowed disabled:opacity-70"
                                disabled={isSubmitted}
                            >
                                <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700 disabled:text-gray-600" />
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
                        type="button"
                        onClick={() => addEntry('technicalSkills')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 
                        text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 
                        transition disabled:bg-gray-400 disabled:text-gray-600 
                        disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.technicalSkills.map((skill, index) => (
                    <div key={index} className="relative pb-7 p-2 border rounded-md shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Category"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={skill.category}
                                onChange={(e) =>
                                    handleInputChange('technicalSkills', index, 'category', e.target.value)
                                }
                                required
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="Skills (comma separated)"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={skill.skills}
                                onChange={(e) =>
                                    handleInputChange('technicalSkills', index, 'skills', e.target.value)
                                }
                                required
                                disabled={isSubmitted}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => deleteEntry('technicalSkills', index)}
                            className="absolute right-4 disabled:cursor-not-allowed disabled:opacity-70"
                            disabled={isSubmitted}
                        >
                            <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700 disabled:text-gray-600" />
                        </button>
                    </div>
                ))}
            </section>

            {/* Key Courses Taken Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Key Courses Taken</h2>
                    <button
                        type="button"
                        onClick={() => addEntry('courses')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 
                        text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 
                        transition disabled:bg-gray-400 disabled:text-gray-600 
                        disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.courses.map((course, index) => (
                    <div key={index} className="relative pb-7 p-2 border rounded-md shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Category"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={course.category}
                                onChange={(e) =>
                                    handleInputChange('courses', index, 'category', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="Course Name"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={course.courseName}
                                onChange={(e) =>
                                    handleInputChange('courses', index, 'courseName', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => deleteEntry('courses', index)}
                            className="absolute right-4 disabled:cursor-not-allowed disabled:opacity-70"
                            disabled={isSubmitted}
                        >
                            <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700 disabled:text-gray-600" />
                        </button>
                    </div>
                ))}
            </section>

            {/* Positions of Responsibility Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Positions of Responsibility</h2>
                    <button
                        type="button"
                        onClick={() => addEntry('positions')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 
                        text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 
                        transition disabled:bg-gray-400 disabled:text-gray-600 
                        disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.positions.map((position, index) => (
                    <div key={index} className="relative pb-7 p-2 border rounded-md shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Position Title"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={position.title}
                                onChange={(e) =>
                                    handleInputChange('positions', index, 'title', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="Organization"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={position.organization}
                                onChange={(e) =>
                                    handleInputChange('positions', index, 'organization', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="Timeline"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={position.timeline}
                                onChange={(e) =>
                                    handleInputChange('positions', index, 'timeline', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            {/* Description Section */}
                            <div className="col-span-2">
                                <div className="font-semibold mb-2">Description:</div>
                                {position.description && position.description.map((desc, descIndex) => (
                                    <div key={descIndex} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder={`Description ${descIndex + 1}`}
                                            className="input-field w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={desc}
                                            onChange={(e) => {
                                                const updatedData = { ...resumeData };
                                                updatedData.positions[index].description[descIndex] = e.target.value;
                                                setResumeData(updatedData);
                                            }}
                                            disabled={isSubmitted}
                                        />
                                        <button
                                            type='button'
                                            onClick={() => {
                                                const updatedData = { ...resumeData };
                                                updatedData.positions[index].description.splice(descIndex, 1);
                                                setResumeData(updatedData);
                                            }}
                                            className="text-red-500 hover:text-red-700 text-lg"
                                            title="Delete Description"
                                            disabled={isSubmitted}
                                        >
                                            ❌
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type='button'
                                    onClick={() => {
                                        const updatedData = { ...resumeData };
                                        updatedData.positions[index].description.push('');
                                        setResumeData(updatedData);
                                    }}
                                    className="mt-1 px-4 py-1 text-sm rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                                    disabled={isSubmitted}
                                >
                                    Add Description
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => deleteEntry('positions', index)}
                            className="absolute right-4 disabled:cursor-not-allowed disabled:opacity-70"
                            disabled={isSubmitted}
                        >
                            <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700 disabled:text-gray-600" />
                        </button>
                    </div>
                ))}
            </section>


            {/* extra curriculars */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Extra-curriculars</h2>
                    <button
                        type="button"
                        onClick={() => addEntry('extracaurriculars')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 
                        text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 
                        transition disabled:bg-gray-400 disabled:text-gray-600 
                        disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.extracaurriculars.map((position, index) => (
                    <div key={index} className="relative pb-7 p-2 border rounded-md shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="title"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={position.title}
                                onChange={(e) =>
                                    handleInputChange('extracaurriculars', index, 'title', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="Organization"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={position.organization}
                                onChange={(e) =>
                                    handleInputChange('extracaurriculars', index, 'organization', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="Timeline"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={position.timeline}
                                onChange={(e) =>
                                    handleInputChange('extracaurriculars', index, 'timeline', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            {/* Description Section */}
                            <div className="col-span-2">
                                <div className="font-semibold mb-2">Description:</div>
                                {position.description && position.description.map((desc, descIndex) => (
                                    <div key={descIndex} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder={`Description ${descIndex + 1}`}
                                            className="input-field w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={desc}
                                            onChange={(e) => {
                                                const updatedData = { ...resumeData };
                                                updatedData.extracaurriculars[index].description[descIndex] = e.target.value;
                                                setResumeData(updatedData);
                                            }}
                                            disabled={isSubmitted}
                                        />
                                        <button
                                            type='button'
                                            onClick={() => {
                                                const updatedData = { ...resumeData };
                                                updatedData.extracaurriculars[index].description.splice(descIndex, 1);
                                                setResumeData(updatedData);
                                            }}
                                            className="text-red-500 hover:text-red-700 text-lg"
                                            title="Delete Description"
                                            disabled={isSubmitted}
                                        >
                                            ❌
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type='button'
                                    onClick={() => {
                                        const updatedData = { ...resumeData };
                                        updatedData.extracaurriculars[index].description.push('');
                                        setResumeData(updatedData);
                                    }}
                                    className="mt-1 px-4 py-1 text-sm rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                                    disabled={isSubmitted}
                                >
                                    Add Description
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => deleteEntry('extracaurriculars', index)}
                            className="absolute right-4 disabled:cursor-not-allowed disabled:opacity-70"
                            disabled={isSubmitted}
                        >
                            <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700 disabled:text-gray-600" />
                        </button>
                    </div>
                ))}
            </section>

            {/* Achievements Section */}
            <section className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Achievements</h2>
                    <button
                        type="button"
                        onClick={() => addEntry('achievements')}
                        className="mx-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 
                        text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 
                        transition disabled:bg-gray-400 disabled:text-gray-600 
                        disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </div>
                {resumeData.achievements.map((achievement, index) => (
                    <div key={index} className="relative pb-7 p-2 border rounded-md shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Achievement Title"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={achievement.title}
                                onChange={(e) =>
                                    handleInputChange('achievements', index, 'title', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={achievement.description}
                                onChange={(e) =>
                                    handleInputChange('achievements', index, 'description', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <input
                                type="text"
                                placeholder="Year"
                                className="input-field bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                value={achievement.year}
                                onChange={(e) =>
                                    handleInputChange('achievements', index, 'year', e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => deleteEntry('achievements', index)}
                            className="absolute right-4 disabled:cursor-not-allowed disabled:opacity-70"
                            disabled={isSubmitted}
                        >
                            <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700 disabled:text-gray-600" />
                        </button>
                    </div>
                ))}
            </section>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded btn-submit items-center 
                    hover:bg-blue-600 transition 
                    disabled:bg-gray-400 disabled:text-gray-600 
                    disabled:cursor-not-allowed disabled:opacity-70"

                    disabled={isSubmitted}
                >
                    Generate Resume
                </button>
            </div>
        </form>
    );
};

export default ResumeBuilder;