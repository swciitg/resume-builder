import { PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';
import axios from 'axios';

const ResumeBuilder = ({ resumeData, setResumeData, errors, setErrors , latexCode }) => {



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
        updatedData[section].push({
            name: '',
            type: '',
            timeline: '',
            githubLink: '',
            description: '',
        });
        setResumeData(updatedData);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            console.error('Validation failed:', errors);
            return;
        }
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
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    



    return (
        <form className="container mx-auto p-4" onSubmit={handleSubmit}>
            {/* <h1 className="text-2xl font-bold text-center mb-6">Resume Builder</h1> */}

            {/* Personal Information Section */}
            <section className="mb-6 ">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                        required
                    />
                    {errors.name && <span className="text-red-600">{errors.name}</span>}

                    <input
                        type="text"
                        placeholder="Roll Number"
                        className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={resumeData.personalInfo.rollNumber}
                        onChange={(e) => handlePersonalInfoChange('rollNumber', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Course - Branch"
                        className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={resumeData.personalInfo.courseBranch}
                        onChange={(e) => handlePersonalInfoChange('courseBranch', e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="Contact Number"
                        className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={resumeData.personalInfo.contactNumber}
                        onChange={(e) => handlePersonalInfoChange('contactNumber', e.target.value)}
                        required
                    />
                    {errors.contactNumber && <span className="text-red-600">{errors.contactNumber}</span>}

                    <input
                        type="email"
                        placeholder="Email"
                        className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                        required
                    />
                    {errors.email && <span className="text-red-600">{errors.email}</span>}

                    <input
                        type="url"
                        placeholder="GitHub Profile"
                        className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={resumeData.personalInfo.githubProfile}
                        onChange={(e) => handlePersonalInfoChange('githubProfile', e.target.value)}
                    />
                    <input
                        type="url"
                        placeholder="LinkedIn Profile"
                        className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={resumeData.personalInfo.linkedinProfile}
                        onChange={(e) => handlePersonalInfoChange('linkedinProfile', e.target.value)}
                    />
                </div>
            </section>

            {/* Education Section */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Education</h2>
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
                            placeholder="Experience Title"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={experience.title}
                            onChange={(e) =>
                                handleInputChange('experience', index, 'title', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Designation"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={experience.designation}
                            onChange={(e) =>
                                handleInputChange('experience', index, 'designation', e.target.value)
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
                        <textarea
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
                        />
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
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={project.name}
                            onChange={(e) =>
                                handleInputChange('projects', index, 'name', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Project Type"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={project.type}
                            onChange={(e) =>
                                handleInputChange('projects', index, 'type', e.target.value)
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
                            value={project.timeline}
                            onChange={(e) =>
                                handleInputChange('projects', index, 'timeline', e.target.value)
                            }
                        />
                        <input
                            type="url"
                            placeholder="GitHub Link"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={project.githubLink}
                            onChange={(e) =>
                                handleInputChange('projects', index, 'githubLink', e.target.value)
                            }
                        />
                        <textarea
                            placeholder="Project Description"
                            className="input-field bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border border-gray-300 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={project.description}
                            onChange={(e) =>
                                handleInputChange('projects', index, 'description', e.target.value)
                            }
                        />
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
