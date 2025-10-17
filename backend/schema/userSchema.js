
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  fontSize: { type: Number, default: 11, min: 9, max: 12 },

  sectionOrder: {
    type: [String],
    default: [
      "personalInfo",
      "education",
      "experience",
      "projects",
      "technicalSkills",
      "positions",
      "achievements",
      "courses",
      "extracaurriculars"
    ]
  },

  personalInfo: {
    name: { type: String },
    rollNumber: { type: String },
    courseBranch: { type: String },
    contactNumber: { type: String },
    email: { type: String },
    githubProfile: { type: String },
    linkedinProfile: { type: String },
    secondaryEmail: { type: String },
    website: { type: String },
  },
  education: [
    {
      degree: { type: String },
      institute: { type: String },
      year: { type: String },
      cgpa: { type: String },
    },
  ],
  experience: [
    {
      role: { type: String },
      company: { type: String },
      timeline: { type: String },
      location: { type: String },
      workDone: [{ type: String }],
    },
  ],
  projects: [
    {
      name: { type: String },
      type: { type: String },
      timeline: { type: String },
      githubLink: { type: String },
      workDone: [{ type: String }],
    },
  ],
  technicalSkills: [
    {
      category: { type: String },
      skills: { type: String },
    },
  ],
  courses: [
    {
      category: { type: String },
      courseName: { type: String },
    },
  ],
  positions: [
    {
      title: { type: String },
      organization: { type: String },
      timeline: { type: String },
      description: [{ type: String }],
    },
  ],
  extracaurriculars: [
    {
      title: { type: String },
      organization: { type: String },
      timeline: { type: String },
      description: [{ type: String }],
    },
  ],
  achievements: [
    {
      title: { type: String },
      description: { type: String },
      year: { type: String, },
    },
  ],

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;