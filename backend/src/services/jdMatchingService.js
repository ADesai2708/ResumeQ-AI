import { normalizeSkill } from "../utils/skillNormalizer.js";

const KNOWN_SKILLS = [
  "react",
  "node",
  "express",
  "mongodb",
  "mysql",
  "sql",
  "aws",
  "docker",
  "redis",
  "kubernetes",
  "typescript",
  "javascript",
  "python",
  "java",
  "c++",
  "git",
  "github",
  "rest api",
  "jwt",
  "rag",
  "llm",
  "machine learning",
  "deep learning",
  "tensorflow",
  "pytorch",
  "html",
  "css",
  "tailwind",
  "redux",
  "ci/cd",
  "microservices",
  "system design",
  "testing",
];

const ROLE_SKILLS = {
  "Full Stack Developer": [
    "react",
    "node",
    "express",
    "mongodb",
    "sql",
    "rest api",
    "docker",
    "aws",
    "git",
    "github",
    "redis"
  ],

  "Backend Developer": [
    "node",
    "express",
    "mongodb",
    "sql",
    "rest api",
    "redis",
    "docker",
    "aws",
    "jwt",
    "git"
  ],

  "Frontend Developer": [
    "react",
    "javascript",
    "typescript",
    "html",
    "css",
    "tailwind",
    "redux",
    "git",
    "github"
  ],

  "AI/ML Engineer": [
    "python",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "rag",
    "llm",
    "aws",
    "git"
  ],
};

const extractSkillsFromText = (text) => {
  const lowerText = text.toLowerCase();

  const detected = KNOWN_SKILLS.filter((skill) => {
    return lowerText.includes(skill);
  });

  return [...new Set(detected.map(normalizeSkill))];
};

const generateRecommendations = (missingSkills, contextLabel) => {
  const recommendations = [];

  missingSkills.forEach((skill) => {
    switch (skill) {
      case "docker":
        recommendations.push(
          `Add Docker experience to better align with ${contextLabel}.`
        );
        break;

      case "aws":
        recommendations.push(
          `Mention AWS or cloud deployment work to better match ${contextLabel}.`
        );
        break;

      case "redis":
        recommendations.push(
          `Add Redis if you have used caching, queues, or session management in backend projects.`
        );
        break;

      case "rest api":
        recommendations.push(
          `Highlight REST API development or integration experience in your projects.`
        );
        break;

      case "ci/cd":
        recommendations.push(
          `Mention CI/CD pipelines, deployment automation, or DevOps exposure if you have it.`
        );
        break;

      case "microservices":
        recommendations.push(
          `If you have worked on service-based backend systems, mention microservices explicitly.`
        );
        break;

      case "system design":
        recommendations.push(
          `Add system design or architecture-related project experience if relevant.`
        );
        break;

      case "testing":
        recommendations.push(
          `Mention testing tools or practices like unit testing, integration testing, or Jest if used.`
        );
        break;

      default:
        recommendations.push(
          `Consider adding or highlighting ${skill} to better match ${contextLabel}.`
        );
    }
  });

  return recommendations;
};

/* ---------------- Role-based matching (Phase 8.1) ---------------- */

export const matchResumeToRole = (resumeSkills = [], targetRole) => {
  const roleSkills = ROLE_SKILLS[targetRole];

  if (!roleSkills) {
    throw new Error("Invalid target role selected");
  }

  const normalizedResumeSkills = resumeSkills.map((skill) =>
    normalizeSkill(skill)
  );

  const matchedSkills = roleSkills.filter((skill) =>
    normalizedResumeSkills.includes(normalizeSkill(skill))
  );

  const missingSkills = roleSkills.filter(
    (skill) => !normalizedResumeSkills.includes(normalizeSkill(skill))
  );

  const matchScore = Number(
    ((matchedSkills.length / roleSkills.length) * 100).toFixed(2)
  );

  const recommendations = generateRecommendations(
    missingSkills,
    `${targetRole} roles`
  );

  return {
    targetRole,
    roleSkills,
    matchScore,
    matchedSkills,
    missingSkills,
    recommendations,
  };
};

/* ---------------- JD text matching (Phase 8.2) ---------------- */

export const matchResumeToJobDescription = (resumeSkills = [], jobDescription) => {
  if (!jobDescription || !jobDescription.trim()) {
    throw new Error("Job description is required");
  }

  const jdSkills = extractSkillsFromText(jobDescription);

  const normalizedResumeSkills = resumeSkills.map((skill) =>
    normalizeSkill(skill)
  );

  const matchedSkills = jdSkills.filter((skill) =>
    normalizedResumeSkills.includes(normalizeSkill(skill))
  );

  const missingSkills = jdSkills.filter(
    (skill) => !normalizedResumeSkills.includes(normalizeSkill(skill))
  );

  const jdMatchScore =
    jdSkills.length === 0
      ? 0
      : Number(((matchedSkills.length / jdSkills.length) * 100).toFixed(2));

  const recommendations = generateRecommendations(
    missingSkills,
    "this job description"
  );

  return {
    jdSkills,
    jdMatchScore,
    matchedSkills,
    missingSkills,
    recommendations,
  };
};

export { ROLE_SKILLS };