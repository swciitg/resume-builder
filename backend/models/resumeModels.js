const { z } = require('zod');

// Education Schema
const EducationSchema = z.object({
  degree: z.string(),
  institute: z.string(),
  board: z.string(),
  cgpaOrPercentage: z.number().optional(), // Optional field for CGPA or percentage
  year: z.number().int()
});

// Experience Schema
const ExperienceSchema = z.object({
  designation: z.string(),
  description: z.array(z.string()), // Array of descriptions
  timeline: z.string()
});

// Project Schema
const ProjectSchema = z.object({
  projectName: z.string(),
  projectType: z.string(),
  description: z.array(z.string()), // Array of descriptions
  githubLink: z.string().url().optional(), // Optional GitHub link
  timeline: z.string()
});

// Technical Skills Schema
const TechnicalSkillsSchema = z.object({
  categories: z.record(z.array(z.string())) // Record of category names as keys, and arrays of skills as values
});

// Key Course Schema
const KeyCourseSchema = z.object({
  category: z.string(),
  name: z.string()
});

// Responsibilities Schema
const ResponsibilitySchema = z.object({
  title: z.string(),
  description: z.array(z.string()), // Array of descriptions
  timeline: z.string()
});

// Achievements Schema
const AchievementSchema = z.object({
  title: z.string(),
  description: z.string().optional(), // Optional description
  year: z.number().int()
});

// Main Resume Schema
const ResumeSchema = z.object({
  name: z.string(),
  rollNumber: z.string(),
  course: z.string(),
  branch: z.string(),
  contactNumber: z.string(),
  email: z.string().email(),
  githubLink: z.string().url().optional(), // Optional GitHub link
  linkedinLink: z.string().url().optional(), // Optional LinkedIn link
  education: z.array(EducationSchema), // Array of Education objects
  experience: z.array(ExperienceSchema), // Array of Experience objects
  projects: z.array(ProjectSchema), // Array of Project objects
  technicalSkills: TechnicalSkillsSchema, // TechnicalSkills object
  keyCourses: z.array(KeyCourseSchema), // Array of KeyCourse objects
  responsibilities: z.array(ResponsibilitySchema), // Array of Responsibility objects
  achievements: z.array(AchievementSchema) // Array of Achievement objects
});

module.exports = {
  EducationSchema,
  ExperienceSchema,
  ProjectSchema,
  TechnicalSkillsSchema,
  KeyCourseSchema,
  ResponsibilitySchema,
  AchievementSchema,
  ResumeSchema
};
