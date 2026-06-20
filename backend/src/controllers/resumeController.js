import Resume from "../models/Resume.js";
import { parseResume } from "../services/parserService.js";
import extractFeatures from "../services/featureExtractionService.js";
import { getPredictedATSScore } from "../services/mlServices.js";
import { simulateResumeImprovements } from "../services/simulationService.js";
import { generateResumeSuggestionsFromSimulations } from "../services/recommendationService.js";
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const filePath = req.file.path;

    // 1. Parse resume
    const extractedText = await parseResume(filePath);

    // 2. Extract features
    const features = extractFeatures(extractedText);

    // 3. Predict current ATS score
    const predictedScore = await getPredictedATSScore(features);

    // 4. Run score improvement simulation
    const simulationResult = await simulateResumeImprovements(features);

    // 5. Generate smart suggestions from simulation results
    const suggestions =
      generateResumeSuggestionsFromSimulations(simulationResult);

    // 6. Save resume analysis
    const resume = await Resume.create({
      fileName: req.file.originalname,
      extractedText,
      features,
      predictedScore,
      suggestions,
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded and analyzed successfully",
      data: {
        ...resume.toObject(),
        improvementSimulation: simulationResult,
      },
    });
  } catch (error) {
    console.error("Upload Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload and analyze resume",
    });
  }
};
export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    });
  } catch (error) {
    console.error("Get Resumes Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch resumes",
    });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error("Get Resume By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch resume",
    });
  }
};
export const simulateResumeScore = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const simulationResult = await simulateResumeImprovements(resume.features);

    return res.status(200).json({
      success: true,
      message: "Score simulation generated successfully",
      data: {
        resumeId: resume._id,
        fileName: resume.fileName,
        currentScore: resume.predictedScore,
        simulationResult,
      },
    });
  } catch (error) {
    console.error("Simulate Resume Score Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to simulate resume score",
    });
  }
};