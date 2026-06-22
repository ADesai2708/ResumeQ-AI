import { useState } from "react";
import ResumeUploadCard from "../components/resume/ResumeUploadCard";
import ATSScoreCard from "../components/resume/ATSScoreCard";
import FeatureSummaryCard from "../components/resume/FeatureSummaryCard";
import SuggestionsCard from "../components/resume/SuggestionCard";
import SimulationCard from "../components/resume/SimulationCard";
import Loader from "../components/common/Loader";
import { uploadResumeApi } from "../services/api";

const UploadResumePage = () => {
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState("");

  const handleResumeUpload = async (file) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("resume", file);

      const response = await uploadResumeApi(formData);

      setAnalysisResult(response.data);
    } catch (err) {
      console.error("Resume upload failed:", err);
      setError(
        err?.response?.data?.message || "Failed to upload and analyze resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Upload Resume</h1>
        <p className="text-slate-600 mt-2">
          Upload your resume to get ATS score, improvement suggestions, and job
          fit analysis.
        </p>
      </div>

      <ResumeUploadCard onUpload={handleResumeUpload} loading={loading} />

      {loading && <Loader text="Analyzing your resume..." />}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {analysisResult && !loading && (
        <div className="space-y-6">
          <ATSScoreCard score={analysisResult.predictedScore} />

          <FeatureSummaryCard features={analysisResult.features} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <SuggestionsCard suggestions={analysisResult.suggestions} />
            <SimulationCard
              simulationData={analysisResult.improvementSimulation}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadResumePage;