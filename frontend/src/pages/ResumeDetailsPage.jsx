import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getResumeByIdApi, simulateResumeScoreApi } from "../services/api";
import Loader from "../components/common/Loader";
import ResumeAnalysisOverview from "../components/resume/ResumeAnalysisOverview";
import RoleMatchCard from "../components/jd/RoleMatchCard";
import JDMatchCard from "../components/jd/JDMatchCard";
const ResumeDetailsPage = () => {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulationLoading, setSimulationLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResume = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getResumeByIdApi(id);
      const simulationResponse = await simulateResumeScoreApi(id);

      const resumeData = response.data;

      setResume({
        ...resumeData,
        improvementSimulation:
          simulationResponse?.data?.simulationResult || {},
      });
    } catch (err) {
      console.error("Failed to fetch resume:", err);
      setError(
        err?.response?.data?.message || "Failed to fetch resume details."
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshSimulation = async () => {
    try {
      setSimulationLoading(true);

      const response = await simulateResumeScoreApi(id);

      setResume((prev) => ({
        ...prev,
        improvementSimulation: response?.data?.simulationResult || {},
      }));
    } catch (err) {
      console.error("Failed to refresh simulation:", err);
    } finally {
      setSimulationLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, [id]);

  if (loading) {
    return <Loader text="Loading resume analysis..." />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
        <Link
          to="/dashboard"
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <Link
              to="/dashboard"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold text-slate-900 mt-3">
              {resume.fileName}
            </h1>

            <p className="text-slate-600 mt-2">
              Detailed ATS analysis, feature breakdown, score improvement
              simulation, role matching, and JD matching insights.
            </p>
          </div>

          <button
            onClick={refreshSimulation}
            disabled={simulationLoading}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {simulationLoading ? "Refreshing..." : "Refresh Simulation"}
          </button>
        </div>
      </div>

      {/* ATS analysis */}
      <ResumeAnalysisOverview resume={resume} />

      {/* Role Match + JD Match */}
      <div className="grid grid-cols-1 gap-6">
        <RoleMatchCard resumeId={resume._id} />
        <JDMatchCard resumeId={resume._id} />
      </div>
    </div>
  );
};

export default ResumeDetailsPage;