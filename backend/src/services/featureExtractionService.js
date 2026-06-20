const SKILLS = [
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
];

const extractFeatures = (resumeText) => {
  const text = resumeText.toLowerCase();

  const detectedSkills = SKILLS.filter(skill =>
    text.includes(skill)
  );

  const skillsCount = detectedSkills.length;

  const projectsCount =
    (text.match(/project/gi) || []).length;

  const internshipCount =
    (text.match(/intern|internship/gi) || []).length;

  const certificationCount =
    (
      text.match(
        /certification|certified|certificate/gi
      ) || []
    ).length;

  const metricsCount =
    (
      text.match(
        /\d+%|\d+\+|\d+x|\d+\susers|\d+\sclients/gi
      ) || []
    ).length;

  return {
    skillsCount,
    projectsCount,
    internshipCount,
    certificationCount,
    metricsCount,

    githubPresent:
      text.includes("github"),

    linkedinPresent:
      text.includes("linkedin"),

    awsPresent:
      text.includes("aws"),

    dockerPresent:
      text.includes("docker"),

    redisPresent:
      text.includes("redis"),

    kubernetesPresent:
      text.includes("kubernetes")
  };
};

export default extractFeatures;