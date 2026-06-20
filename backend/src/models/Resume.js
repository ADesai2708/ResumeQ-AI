import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    features: {
      skillsCount: { type: Number, default: 0 },
      projectsCount: { type: Number, default: 0 },
      internshipCount: { type: Number, default: 0 },
      certificationCount: { type: Number, default: 0 },
      metricsCount: { type: Number, default: 0 },

      githubPresent: { type: Boolean, default: false },
      linkedinPresent: { type: Boolean, default: false },

      awsPresent: { type: Boolean, default: false },
      dockerPresent: { type: Boolean, default: false },
      redisPresent: { type: Boolean, default: false },
      kubernetesPresent: { type: Boolean, default: false },
    },

    predictedScore: {
      type: Number,
      default: 0,
    },

    suggestions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);