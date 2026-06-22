import { Link } from "react-router-dom";

const ResumeListCard = ({ resume }) => {
  const features = resume?.features || {};

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 55) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              {resume.fileName}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Uploaded on{" "}
              {resume.createdAt
                ? new Date(resume.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="px-3 py-1 rounded-full bg-slate-100">
              Skills: {features.skillsCount ?? 0}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100">
              Projects: {features.projectsCount ?? 0}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100">
              Internships: {features.internshipCount ?? 0}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100">
              Certifications: {features.certificationCount ?? 0}
            </span>
          </div>
        </div>

        <div className="md:text-right space-y-3">
          <div>
            <p className="text-sm text-slate-500">ATS Score</p>
            <p
              className={`text-3xl font-bold ${getScoreColor(
                resume.predictedScore
              )}`}
            >
              {resume.predictedScore?.toFixed?.(2) ?? resume.predictedScore ?? 0}
            </p>
          </div>

          <Link
            to={`/resume/${resume._id}`}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeListCard;