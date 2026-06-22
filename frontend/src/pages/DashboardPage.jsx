import { useEffect, useState } from "react";
import { getAllResumesApi } from "../services/api";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import ResumeListCard from "../components/resume/ResumeListCard";

const DashboardPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllResumesApi();
      setResumes(response.data || []);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
      setError(
        err?.response?.data?.message || "Failed to fetch uploaded resumes."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">
          View all uploaded resumes and open detailed ATS analysis.
        </p>
      </div>

      {loading && <Loader text="Loading resumes..." />}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && resumes.length === 0 && (
        <EmptyState
          title="No resumes uploaded yet"
          subtitle="Upload your first resume to start ATS analysis."
        />
      )}

      {!loading && !error && resumes.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {resumes.map((resume) => (
            <ResumeListCard key={resume._id} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;