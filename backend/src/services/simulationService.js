import { getPredictedATSScore } from "./mlServices.js";

const cloneFeatures = (features) => JSON.parse(JSON.stringify(features));

export const simulateResumeImprovements = async (features) => {
  const currentScore = await getPredictedATSScore(features);
  const simulations = [];

  const scenarios = [];

  if (!features.awsPresent) {
    scenarios.push({
      label: "Add AWS",
      apply: (f) => {
        f.awsPresent = true;
      },
    });
  }

  if (!features.dockerPresent) {
    scenarios.push({
      label: "Add Docker",
      apply: (f) => {
        f.dockerPresent = true;
      },
    });
  }

  if (!features.redisPresent) {
    scenarios.push({
      label: "Add Redis",
      apply: (f) => {
        f.redisPresent = true;
      },
    });
  }

  if (!features.linkedinPresent) {
    scenarios.push({
      label: "Add LinkedIn profile",
      apply: (f) => {
        f.linkedinPresent = true;
      },
    });
  }

  if (!features.githubPresent) {
    scenarios.push({
      label: "Add GitHub profile",
      apply: (f) => {
        f.githubPresent = true;
      },
    });
  }

  if (features.internshipCount < 2) {
    scenarios.push({
      label: "Add 1 internship",
      apply: (f) => {
        f.internshipCount += 1;
      },
    });
  }

  if (features.certificationCount < 3) {
    scenarios.push({
      label: "Add 1 certification",
      apply: (f) => {
        f.certificationCount += 1;
      },
    });
  }

  if (features.projectsCount < 4) {
    scenarios.push({
      label: "Add 1 project",
      apply: (f) => {
        f.projectsCount += 1;
      },
    });
  }

  if (features.metricsCount < 5) {
    scenarios.push({
      label: "Add measurable achievements",
      apply: (f) => {
        f.metricsCount += 2;
      },
    });
  }

  if (features.skillsCount < 15) {
    scenarios.push({
      label: "Add 3 more technical skills",
      apply: (f) => {
        f.skillsCount += 3;
      },
    });
  }

  for (const scenario of scenarios) {
    const updatedFeatures = cloneFeatures(features);
    scenario.apply(updatedFeatures);

    const newScore = await getPredictedATSScore(updatedFeatures);
    const improvement = Number((newScore - currentScore).toFixed(2));

    if (improvement > 0) {
      simulations.push({
        change: scenario.label,
        currentScore,
        newScore,
        improvement,
      });
    }
  }

  simulations.sort((a, b) => b.improvement - a.improvement);

  return {
    currentScore,
    simulations,
  };
};