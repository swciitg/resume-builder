import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLatex } from './LatexContext';
import '../styles/resumeBuilder.css';
import isEqual from 'lodash.isequal';

const ResumeBuilder = ({user, setUser, resumeData, setResumeData, errors, setErrors, latexCode, templates }) => {

    const { latexCodeE, setLatexCode } = useLatex();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [progressLoding , setProgressLoading] = useState(false);
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

    useEffect(() => {
        setLatexCode(latexCode);
    }, [latexCode])

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

const prevDataRef = useRef(resumeData);

useEffect(() => {
    const handler = setTimeout(() => {
        if (!isEqual(prevDataRef.current, resumeData)) {
            // Resume data has changed
            const autoSave = async () => {
                if (!user) return;

                setProgressLoading(true);
                try {
                    const response = await axios.put(
                        'http://localhost:5000/saveprogress',
                        { resumeData },
                        {
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    console.log('Auto-saved:', response.data);
                    setUser(response.data.user);
                    prevDataRef.current = resumeData; // Update previous after saving
                } catch (error) {
                    console.error('Auto-save error:', error);
                } finally {
                    setProgressLoading(false);
                }
            };

            autoSave();
        }
    }, 2000); // debounce time: 2s

    return () => clearTimeout(handler); // clear timeout on cleanup
}, [resumeData]);


    const handelProgress = async () => {
        setProgressLoading(true);
        try {
            const response = await axios.put(
                'http://localhost:5000/saveprogress',
                { resumeData },
                {
                    withCredentials: true, 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Progress saved:', response.data);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error saving progress:', error);
        } finally {
            setProgressLoading(false);
        }
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
            console.log(blob)
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


    const inputClasses = `
        w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-800 text-gray-900 dark:text-white
        placeholder-gray-500 dark:placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
    `;


    const buttonClasses = `
        px-4 py-2 rounded-lg font-medium transition duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
    `;


    const sectionCardClasses = `
        relative p-4 mb-4 rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition duration-200
    `;

    return (
        <>
        <button className={`${buttonClasses} fixed transform -translate-y-1/2 ml-8 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 flex items-center`} disabled={progressLoding} onClick={handelProgress}>Save Progress</button>
        <form className="container mx-auto px-4 py-6 max-w-6xl" onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <section className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                    <span className="mr-2"></span> Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name*</label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className={inputClasses}
                            value={resumeData.personalInfo.name}
                            onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                            required
                            disabled={isSubmitted}
                        />
                        {errors.name && <span className="text-sm text-red-600 mt-1">{errors.name}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Roll Number</label>
                        <input
                            type="text"
                            placeholder="University roll number"
                            className={inputClasses}
                            value={resumeData.personalInfo.rollNumber}
                            onChange={(e) => handlePersonalInfoChange('rollNumber', e.target.value)}
                            disabled={isSubmitted}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course & Branch</label>
                        <input
                            type="text"
                            placeholder="e.g. B.Tech Computer Science"
                            className={inputClasses}
                            value={resumeData.personalInfo.courseBranch}
                            onChange={(e) => handlePersonalInfoChange('courseBranch', e.target.value)}
                            disabled={isSubmitted}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Number*</label>
                        <input
                            type="tel"
                            placeholder="Phone number"
                            className={inputClasses}
                            value={resumeData.personalInfo.contactNumber}
                            onChange={(e) => handlePersonalInfoChange('contactNumber', e.target.value)}
                            required
                            disabled={isSubmitted}
                        />
                        {errors.contactNumber && <span className="text-sm text-red-600 mt-1">{errors.contactNumber}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email*</label>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className={inputClasses}
                            value={resumeData.personalInfo.email}
                            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                            required
                            disabled={isSubmitted}
                        />
                        {errors.email && <span className="text-sm text-red-600 mt-1">{errors.email}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub Profile</label>
                        <input
                            type="url"
                            placeholder="https://github.com/username"
                            className={inputClasses}
                            value={resumeData.personalInfo.githubProfile}
                            onChange={(e) => handlePersonalInfoChange('githubProfile', e.target.value)}
                            disabled={isSubmitted}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn Profile</label>
                        <input
                            type="url"
                            placeholder="https://linkedin.com/in/username"
                            className={inputClasses}
                            value={resumeData.personalInfo.linkedinProfile}
                            onChange={(e) => handlePersonalInfoChange('linkedinProfile', e.target.value)}
                            disabled={isSubmitted}
                        />
                    </div>
                </div>
                </section>


            {/* Education Section */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <span className="mr-2"></span> Education
                    </h2>
                    <button
                        type="button"
                        onClick={() => addEntry('education')}
                        className={`${buttonClasses} bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 flex items-center`}
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Add Education
                    </button>
                </div>

                {(resumeData.education||[]).map((education, index) => (
                    <div key={index} className={sectionCardClasses}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Degree/Certificate*</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Bachelor of Technology"
                                    className={inputClasses}
                                    value={education.degree}
                                    onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Institute/Board*</label>
                                <input
                                    type="text"
                                    placeholder="e.g. University of XYZ"
                                    className={inputClasses}
                                    value={education.institute}
                                    onChange={(e) => handleInputChange('education', index, 'institute', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CGPA/Percentage*</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 8.5 CGPA or 85%"
                                    className={inputClasses}
                                    value={education.cgpa}
                                    onChange={(e) => handleInputChange('education', index, 'cgpa', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year*</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 2020-2024"
                                    className={inputClasses}
                                    value={education.year}
                                    onChange={(e) => handleInputChange('education', index, 'year', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => deleteEntry('education', index)}
                                className=" text-red-500 hover:text-red-700 transition"
                                disabled={isSubmitted}
                                title="Delete this education entry"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>


                    </div>
                ))}
            </section>

            {/* Experience Section */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <span className="mr-2"></span> Experience
                    </h2>
                    <button
                        type="button"
                        onClick={() => addEntry('experience')}
                        className={`${buttonClasses} bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 flex items-center`}
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Add Experience
                    </button>
                </div>

                {(resumeData.experience||[]).map((experience, index) => (
                    <div key={index} className={sectionCardClasses}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company*</label>
                                <input
                                    type="text"
                                    placeholder="Company name"
                                    className={inputClasses}
                                    value={experience.company}
                                    onChange={(e) => handleInputChange('experience', index, 'company', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Remote, Bangalore, etc."
                                    className={inputClasses}
                                    value={experience.location}
                                    onChange={(e) => handleInputChange('experience', index, 'location', e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role*</label>
                                <input
                                    type="text"
                                    placeholder="Your position"
                                    className={inputClasses}
                                    value={experience.role}
                                    onChange={(e) => handleInputChange('experience', index, 'role', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeline*</label>
                                <input
                                    type="text"
                                    placeholder="e.g. June 2022 - Present"
                                    className={inputClasses}
                                    value={experience.timeline}
                                    onChange={(e) => handleInputChange('experience', index, 'timeline', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Work Done</label>
                            {experience.workDone && (experience.workDone||[]).map((task, taskIndex) => (
                                <div key={taskIndex} className="flex items-center gap-2 mb-2">
                                    <span className="text-gray-500 dark:text-gray-400">•</span>
                                    <input
                                        type="text"
                                        placeholder={`Describe your work (${taskIndex + 1})`}
                                        className={`${inputClasses} flex-1`}
                                        value={task}
                                        onChange={(e) => {
                                            const updatedData = { ...resumeData };
                                            updatedData.experience[index].workDone[taskIndex] = e.target.value;
                                            setResumeData(updatedData);
                                        }}
                                        disabled={isSubmitted}
                                    />
                                    <button
                                        type='button'
                                        onClick={() => {
                                            const updatedData = { ...resumeData };
                                            updatedData.experience[index].workDone.splice(taskIndex, 1);
                                            setResumeData(updatedData);
                                        }}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-gray-700 transition"
                                        title="Delete this task"
                                        disabled={isSubmitted}
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type='button'
                                onClick={() => addWorkDone('experience', index)}
                                className={`${buttonClasses} mt-2 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 text-sm`}
                                disabled={isSubmitted}
                            >
                                + Add Work Description
                            </button>
                        </div>

                        <div className="flex justify-end">


                            <button
                                type="button"
                                onClick={() => deleteEntry('experience', index)}
                                className=" text-red-500 hover:text-red-700 transition"
                                disabled={isSubmitted}
                                title="Delete this experience entry"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Projects Section */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <span className="mr-2"></span> Projects
                    </h2>
                    <button
                        type="button"
                        onClick={() => addEntry('projects')}
                        className={`${buttonClasses} bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 flex items-center`}
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Add Project
                    </button>
                </div>

                {(resumeData.projects||[]).map((project, index) => (
                    <div key={index} className={sectionCardClasses}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name*</label>
                                <input
                                    type="text"
                                    placeholder="Project title"
                                    className={inputClasses}
                                    value={project.name}
                                    onChange={(e) => handleInputChange('projects', index, 'name', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Type</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Web App, Research, etc."
                                    className={inputClasses}
                                    value={project.type}
                                    onChange={(e) => handleInputChange('projects', index, 'type', e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeline</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Jan 2023 - May 2023"
                                    className={inputClasses}
                                    value={project.timeline}
                                    onChange={(e) => handleInputChange('projects', index, 'timeline', e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub Link</label>
                                <input
                                    type="url"
                                    placeholder="Project repository URL"
                                    className={inputClasses}
                                    value={project.githubLink}
                                    onChange={(e) => handleInputChange('projects', index, 'githubLink', e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Details</label>
                            {project.workDone && (project.workDone||[]).map((task, taskIndex) => (
                                <div key={taskIndex} className="flex items-center gap-2 mb-2">
                                    <span className="text-gray-500 dark:text-gray-400">•</span>
                                    <input
                                        type="text"
                                        placeholder={`Project detail (${taskIndex + 1})`}
                                        className={`${inputClasses} flex-1`}
                                        value={task}
                                        onChange={(e) => {
                                            const updatedData = { ...resumeData };
                                            updatedData.projects[index].workDone[taskIndex] = e.target.value;
                                            setResumeData(updatedData);
                                        }}
                                        disabled={isSubmitted}
                                    />
                                    <button
                                        type='button'
                                        onClick={() => {
                                            const updatedData = { ...resumeData };
                                            updatedData.projects[index].workDone.splice(taskIndex, 1);
                                            setResumeData(updatedData);
                                        }}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-gray-700 transition"
                                        title="Delete this detail"
                                        disabled={isSubmitted}
                                    >
                                        <TrashIcon className="w-4 h-4" />
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
                                className={`${buttonClasses} mt-2 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 text-sm`}
                                disabled={isSubmitted}
                            >
                                + Add Project Detail
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => deleteEntry('projects', index)}
                                className=" text-red-500 hover:text-red-700 transition"
                                disabled={isSubmitted}
                                title="Delete this project"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button></div>
                    </div>
                ))}
            </section>

            {/* Technical Skills Section */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <span className="mr-2"></span> Technical Skills
                    </h2>
                    <button
                        type="button"
                        onClick={() => addEntry('technicalSkills')}
                        className={`${buttonClasses} bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 flex items-center`}
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Add Skill
                    </button>
                </div>

                {(resumeData.technicalSkills||[]).map((skill, index) => (
                    <div key={index} className={sectionCardClasses}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category*</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Programming Languages, Tools, etc."
                                    className={inputClasses}
                                    value={skill.category}
                                    onChange={(e) => handleInputChange('technicalSkills', index, 'category', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills*</label>
                                <input
                                    type="text"
                                    placeholder="Comma separated list (e.g. Java, Python, C++)"
                                    className={inputClasses}
                                    value={skill.skills}
                                    onChange={(e) => handleInputChange('technicalSkills', index, 'skills', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button
                                type="button"
                                onClick={() => deleteEntry('technicalSkills', index)}
                                className=" text-red-500 hover:text-red-700 transition"
                                disabled={isSubmitted}
                                title="Delete this skill category"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button></div>
                    </div>
                ))}
            </section>

            {/* Key Courses Taken Section */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <span className="mr-2"></span> Key Courses Taken
                    </h2>
                    <button
                        type="button"
                        onClick={() => addEntry('courses')}
                        className={`${buttonClasses} bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 flex items-center`}
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Add Course
                    </button>
                </div>

                {(resumeData.courses||[]).map((course, index) => (
                    <div key={index} className={sectionCardClasses}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Core, Electives, etc."
                                    className={inputClasses}
                                    value={course.category}
                                    onChange={(e) => handleInputChange('courses', index, 'category', e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Name*</label>
                                <input
                                    type="text"
                                    placeholder="Course title"
                                    className={inputClasses}
                                    value={course.courseName}
                                    onChange={(e) => handleInputChange('courses', index, 'courseName', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>
                        </div> 
                        <div className="flex justify-end pt-2">
                            <button
                                type="button"
                                onClick={() => deleteEntry('courses', index)}
                                className=" text-red-500 hover:text-red-700 transition"
                                disabled={isSubmitted}
                                title="Delete this course"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button></div>
                    </div>
                ))}
            </section>

            {/* Positions of Responsibility Section */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <span className="mr-2"></span> Positions of Responsibility
                    </h2>
                    <button
                        type="button"
                        onClick={() => addEntry('positions')}
                        className={`${buttonClasses} bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 flex items-center`}
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Add Position
                    </button>
                </div>

                {(resumeData.positions||[]).map((position, index) => (
                    <div key={index} className={sectionCardClasses}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position Title*</label>
                                <input
                                    type="text"
                                    placeholder="e.g. President, Secretary, etc."
                                    className={inputClasses}
                                    value={position.title}
                                    onChange={(e) => handleInputChange('positions', index, 'title', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization*</label>
                                <input
                                    type="text"
                                    placeholder="Organization name"
                                    className={inputClasses}
                                    value={position.organization}
                                    onChange={(e) => handleInputChange('positions', index, 'organization', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeline</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 2022-2023"
                                    className={inputClasses}
                                    value={position.timeline}
                                    onChange={(e) => handleInputChange('positions', index, 'timeline', e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            {position.description && (position.description||[]).map((desc, descIndex) => (
                                <div key={descIndex} className="flex items-center gap-2 mb-2">
                                    <span className="text-gray-500 dark:text-gray-400">•</span>
                                    <input
                                        type="text"
                                        placeholder={`Responsibility detail (${descIndex + 1})`}
                                        className={`${inputClasses} flex-1`}
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
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-gray-700 transition"
                                        title="Delete this description"
                                        disabled={isSubmitted}
                                    >
                                        <TrashIcon className="w-4 h-4" />
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
                                className={`${buttonClasses} mt-2 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 text-sm`}
                                disabled={isSubmitted}
                            >
                                + Add Responsibility
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => deleteEntry('positions', index)}
                                className=" text-red-500 hover:text-red-700 transition"
                                disabled={isSubmitted}
                                title="Delete this position"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button></div>
                    </div>
                ))}
            </section>

            {/* Extra-curriculars Section */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <span className="mr-2"></span> Extra-curriculars
                    </h2>
                    <button
                        type="button"
                        onClick={() => addEntry('extracaurriculars')}
                        className={`${buttonClasses} bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 flex items-center`}
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Add Activity
                    </button>
                </div>

                {(resumeData.extracaurriculars||[]).map((activity, index) => (
                    <div key={index} className={sectionCardClasses}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title*</label>
                                <input
                                    type="text"
                                    placeholder="Activity title"
                                    className={inputClasses}
                                    value={activity.title}
                                    onChange={(e) => handleInputChange('extracaurriculars', index, 'title', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization</label>
                                <input
                                    type="text"
                                    placeholder="Organization name"
                                    className={inputClasses}
                                    value={activity.organization}
                                    onChange={(e) => handleInputChange('extracaurriculars', index, 'organization', e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeline</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 2021-2022"
                                    className={inputClasses}
                                    value={activity.timeline}
                                    onChange={(e) => handleInputChange('extracaurriculars', index, 'timeline', e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            {activity.description && (activity.description||[]).map((desc, descIndex) => (
                                <div key={descIndex} className="flex items-center gap-2 mb-2">
                                    <span className="text-gray-500 dark:text-gray-400">•</span>
                                    <input
                                        type="text"
                                        placeholder={`Activity detail (${descIndex + 1})`}
                                        className={`${inputClasses} flex-1`}
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
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-gray-700 transition"
                                        title="Delete this description"
                                        disabled={isSubmitted}
                                    >
                                        <TrashIcon className="w-4 h-4" />
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
                                className={`${buttonClasses} mt-2 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 text-sm`}
                                disabled={isSubmitted}
                            >
                                + Add Description
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => deleteEntry('extracaurriculars', index)}
                                className="text-red-500 hover:text-red-700 transition"
                                disabled={isSubmitted}
                                title="Delete this activity"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button></div>
                    </div>
                ))}
            </section>

            {/* Achievements Section */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <span className="mr-2"></span> Achievements
                    </h2>
                    <button
                        type="button"
                        onClick={() => addEntry('achievements')}
                        className={`${buttonClasses} bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 flex items-center`}
                        disabled={isSubmitted}
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Add Achievement
                    </button>
                </div>

                {(resumeData.achievements||[]).map((achievement, index) => (
                    <div key={index} className={sectionCardClasses}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Achievement Title*</label>
                                <input
                                    type="text"
                                    placeholder="e.g. First Place in Hackathon"
                                    className={inputClasses}
                                    value={achievement.title || ''}
                                    onChange={(e) => handleInputChange('achievements', index, 'title', e.target.value)}
                                    required
                                    disabled={isSubmitted}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Developed a web app in 24 hours"
                                    className={inputClasses}
                                    value={achievement.description || ''}
                                    onChange={(e) => handleInputChange('achievements', index, 'description', e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 2023"
                                    className={inputClasses}
                                    value={achievement.year || ''}
                                    onChange={(e) => handleInputChange('achievements', index, 'year', e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => deleteEntry('achievements', index)}
                                className=" text-red-500 hover:text-red-700 transition"
                                disabled={isSubmitted}
                                title="Delete this achievement"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
                <button
                    type="submit"
                    className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 flex items-center space-x-2`}
                    disabled={isSubmitted}
                // onClick={handleSubmit}
                >
                    {isSubmitted ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <span>Generate Resume</span>
                    )}
                </button>
            </div>

        </form>
        </>
    );
};

export default ResumeBuilder;