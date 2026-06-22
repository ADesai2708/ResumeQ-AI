import { useState } from "react";
import { jdMatchResumeApi } from "../../services/api";

const JDMatchCard = ({ resumeId }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyzeJD = async () => {
    if (!jobDescription.trim()) return;

    try {
      setAnalyzing(true);
      setError("");

      const response = await jdMatchResumeApi({
        resumeId,
        jobDescription,
      });

      setResult(response.data);
    } catch (err) {
      console.error("JD match failed:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to analyze job description match."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Job Description Match
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Paste a job description to compare this resume against a real role.
        </p>
      </div>

      <div className="space-y-3">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
          placeholder="Paste the job description here..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          onClick={handleAnalyzeJD}
          disabled={!jobDescription.trim() || analyzing}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {analyzing ? "Analyzing..." : "Analyze JD Match"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-5 pt-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">JD Match Result</p>
                <h3 className="text-xl font-semibold text-slate-900">
                  Resume vs Job Description
                </h3>
              </div>

              <div className="text-left md:text-right">
                <p className="text-sm text-slate-500">JD Match Score</p>
                <p className="text-3xl font-bold text-blue-600">
                  {result.jdMatchScore}%
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Skills Found in Job Description
            </h3>

            {result.jdSkills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {result.jdSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No recognizable skills found in the job description.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Matched Skills
              </h3>

              {result.matchedSkills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No matched skills found.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Missing Skills
              </h3>

              {result.missingSkills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-100 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No missing skills. Strong JD alignment.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Recommendations
            </h3>

            {result.recommendations?.length > 0 ? (
              <ul className="space-y-3">
                {result.recommendations.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-slate-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">
                No additional recommendations available.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JDMatchCard;