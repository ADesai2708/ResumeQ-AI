import Resume from "../models/Resume.js";
import {
  matchResumeToRole,
  matchResumeToJobDescription,
  ROLE_SKILLS,
} from "../services/jdMatchingService.js";

export const getAvailableRoles = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: Object.keys(ROLE_SKILLS),
    });
  } catch (error) {
    console.error("Get Available Roles Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch roles",
    });
  }
};

export const roleMatchResume = async (req, res) => {
  try {
    const { resumeId, targetRole } = req.body;

    if (!resumeId || !targetRole) {
      return res.status(400).json({
        success: false,
        message: "resumeId and targetRole are required",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const detectedSkills = resume.features?.detectedSkills || [];

    const roleMatchResult = matchResumeToRole(
      detectedSkills,
      targetRole
    );

    return res.status(200).json({
      success: true,
      message: "Role match analysis completed successfully",
      data: {
        resumeId: resume._id,
        fileName: resume.fileName,
        predictedScore: resume.predictedScore,
        detectedSkills,
        ...roleMatchResult,
      },
    });
  } catch (error) {
    console.error("Role Match Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to match resume with target role",
    });
  }
};

export const jdMatchResume = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "resumeId and jobDescription are required",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const detectedSkills = resume.features?.detectedSkills || [];

    const jdMatchResult = matchResumeToJobDescription(
      detectedSkills,
      jobDescription
    );

    return res.status(200).json({
      success: true,
      message: "Job description match analysis completed successfully",
      data: {
        resumeId: resume._id,
        fileName: resume.fileName,
        predictedScore: resume.predictedScore,
        detectedSkills,
        ...jdMatchResult,
      },
    });
  } catch (error) {
    console.error("JD Match Resume Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to match resume with job description",
    });
  }
};