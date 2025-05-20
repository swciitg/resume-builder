import React, { useState, useEffect } from "react";
import "./App.css";
import ResumeBuilder from "./Components/ResumeBuilder";
import DisplayResume from "./Components/DisplayResume.js";
import Instructions from "./Components/Instructions.js";
import Navbar from "./Components/Navbar.js";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import LatexCode from "./Components/LatexCode.js";
import { useLatex } from "./Components/LatexContext.js";
import axios from "axios";
import LandingPage from "./Components/LandingPage.js";
import Footer from "./Components/Footer.js";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [instructions, setInstructions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  // User fetch effect with auth redirect
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/user`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.data);
        if (response.data.authenticated) {
          setUser(response.data.user);
        } else {
          // window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/azuread`;
        }
      } catch (error) {
        // window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/azuread`;
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Dark mode toggle effect
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const { latexCodeE, setLatexCode } = useLatex();

  // Templates for new entries
  const entryTemplates = {
    education: {
      degree: "",
      institute: "",
      cgpa: "",
      year: "",
    },
    experience: {
      company: "",
      location: "",
      role: "",
      timeline: "",
      workDone: [],
    },
    projects: {
      name: "",
      type: "",
      timeline: "",
      githubLink: "",
      workDone: [],
    },
    technicalSkills: {
      category: "",
      skills: "",
    },
    courses: {
      category: "",
      courseName: "",
    },
    positions: {
      title: "",
      organization: "",
      timeline: "",
      description: [],
    },
    extracaurriculars: {
      title: "",
      organization: "",
      timeline: "",
      description: [],
    },
    achievements: {
      title: "",
      description: "",
      year: "",
    },
  };

  // Initial state for resume data
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      rollNumber: "",
      courseBranch: "",
      contactNumber: "",
      email: "",
      githubProfile: "",
      linkedinProfile: "",
      secondaryEmail: "",
      website: "",
    },
    education: [
      {
        degree: "",
        institute: "",
      },
    ],
    experience: [],
    projects: [],
    technicalSkills: [],
    courses: [],
    positions: [],
    achievements: [],
    extracaurriculars: [],
  });

  // Update resumeData from fetched user
  useEffect(() => {
    if (!user) return;

    const {
      personalInfo = {},
      education = [],
      experience = [],
      projects = [],
      technicalSkills = [],
      courses = [],
      positions = [],
      achievements = [],
      extracaurriculars = [],
    } = user;

    const newResumeData = {
      personalInfo: {
        name: personalInfo.name || "",
        rollNumber: personalInfo.rollNumber || "",
        courseBranch: personalInfo.courseBranch || "",
        contactNumber: personalInfo.contactNumber || "",
        email: personalInfo.email || "",
        githubProfile: personalInfo.githubProfile || "",
        linkedinProfile: personalInfo.linkedinProfile || "",
        secondaryEmail: personalInfo.secondaryEmail || "",
        website: personalInfo.website || "",
      },
    };

    if (education.length > 0) newResumeData.education = education;
    if (experience.length > 0) newResumeData.experience = experience;
    if (projects.length > 0) newResumeData.projects = projects;
    if (technicalSkills.length > 0) newResumeData.technicalSkills = technicalSkills;
    if (courses.length > 0) newResumeData.courses = courses;
    if (positions.length > 0) newResumeData.positions = positions;
    if (achievements.length > 0) newResumeData.achievements = achievements;
    if (extracaurriculars.length > 0) newResumeData.extracaurriculars = extracaurriculars;

    setResumeData(newResumeData);
  }, [user]);

  // Generate LaTeX code from resumeData
  const latexCode = LatexCode({ resumeData });

  if (loading) return <div>Loading...</div>;
  if (!user) return <LandingPage></LandingPage>

  return (
    <div className="h-screen w-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar toogleDark={() => setDarkMode(!darkMode)} darkMode={darkMode} />
      </div>

      {/* Main content */}
      <div className="flex mt-16 h-[calc(100vh-4rem)] transition-all duration-700 ease-in-out">
        {/* ResumeBuilder panel */}
        <div
          className={`relative transition-all duration-700 ${showPreview ? "w-1/2" : "w-full"
            } h-full overflow-auto`}
        >
          {/* Toggle preview button */}
          <div className="sticky top-0 z-10 flex justify-end pt-4">
            <button
              className="rounded text-gray-800 dark:text-white"
              onClick={() => setShowPreview(!showPreview)}
              aria-label={showPreview ? "Hide Preview" : "Show Preview"}
            >
              {showPreview ? (
                <ChevronRightIcon className="w-8 h-8 text-primary_text hover:text-hover_accent" />
              ) : (
                <ChevronLeftIcon className="w-8 h-8 text-primary_text hover:text-hover_accent" />
              )}
            </button>
          </div>

          <ResumeBuilder
            user={user}
            setUser={setUser}
            latexCode={latexCode}
            resumeData={resumeData}
            setResumeData={setResumeData}
            errors={errors}
            setErrors={setErrors}
            templates={entryTemplates}
            darkMode={darkMode}
          />
        </div>

        {/* Preview panel: either Instructions or DisplayResume */}
        <div
          className={`transition-all duration-700 bg-gray-100 ${showPreview ? "w-1/2 translate-x-0" : "w-0 translate-x-full"
            } h-full overflow-y-auto bg-gray-100 dark:bg-gray-800`}
        >
          {instructions ? (
            <Instructions setInstructions={setInstructions} resumeData={resumeData} latexCode={latexCode} />
          ) : (
            <DisplayResume setInstructions={setInstructions} resumeData={resumeData} latexCode={latexCode} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
