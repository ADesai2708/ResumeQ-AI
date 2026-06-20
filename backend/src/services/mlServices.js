import axios from "axios";

export const getPredictedATSScore = async (features) => {
  try {
    const payload = {
      skillsCount: features.skillsCount || 0,
      projectsCount: features.projectsCount || 0,
      internshipCount: features.internshipCount || 0,
      certificationCount: features.certificationCount || 0,
      metricsCount: features.metricsCount || 0,
      githubPresent: features.githubPresent ? 1 : 0,
      linkedinPresent: features.linkedinPresent ? 1 : 0,
      awsPresent: features.awsPresent ? 1 : 0,
      dockerPresent: features.dockerPresent ? 1 : 0,
      redisPresent: features.redisPresent ? 1 : 0,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      payload
    );

    return response.data.predictedScore;
  } catch (error) {
    console.error("ML Service Error:", error.message);

    if (error.response) {
      console.error("ML Service Response:", error.response.data);
    }

    throw new Error("Failed to fetch ATS score from ML service");
  }
};