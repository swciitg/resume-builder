import React, { useEffect, useState } from "react";
import "./App.css";
import UserInfoForm from "./Components/UserInfoForm";
import Preview from "./Components/Preview";
import Header from "./Components/Header";

function App() {
  const [userData, setUserData] = useState({
    personalInfo: {
      name: "",
      rollNumber: "",
      courseBranch: "",
      contactNumber: "",
      email: "",
      githubProfile: "",
      linkedinProfile: "",
    },
    education: [
      {
        degree: "",
        institute: "",
        cgpa: "",
        year: "",
      },
    ],
    experience: [
      {
        title: "",
        designation: "",
        timeline: "",
        description: "",
      },
    ],
    projects: [
      {
        name: "",
        type: "",
        timeline: "",
        githubLink: "",
        description: "",
      },
    ],
    technicalSkills: [
      {
        category: "",
        skills: "",
      },
    ],
    courses: [
      {
        category: "",
        courseName: "",
      },
    ],
    positions: [
      {
        title: "",
        organization: "",
        timeline: "",
        description: "",
      },
    ],
    achievements: [
      {
        title: "",
        description: "",
        year: "",
      },
    ],
  });
  const [previewType, setPreviewType] = useState("latex");

  function updateUserData(data) {
    if (data) {
      setUserData(data);
    }
  }

  function updatePreviewType(type) {
    if (previewType === "latex") {
      setPreviewType("pdf");
    } else {
      setPreviewType("latex");
    }
  }

  return (
    <>
      <Header />
      <main className="flex w-full flex-col lg:flex-row bg-gray-300">
        <UserInfoForm
          updateUserData={updateUserData}
          updatePreviewType={updatePreviewType}
        />
        <Preview
          userData={userData}
          previewType={previewType}
          updatePreviewType={updatePreviewType}
        />
      </main>
    </>
  );
}

export default App;
