import { useEffect, useState } from "react";
import {
  getAvailableRolesApi,
  roleMatchResumeApi,
} from "../../services/api";

const RoleMatchCard = ({ resumeId }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const fetchRoles = async () => {
    try {
      setLoadingRoles(true);
      setError("");

      const response = await getAvailableRolesApi();
      const rolesData = response.data || [];

      setRoles(rolesData);

      if (rolesData.length > 0) {
        setSelectedRole(rolesData[0]);
      }
    } catch (err) {
      console.error("Failed to fetch roles:", err);
      setError(
        err?.response?.data?.message || "Failed to load available roles."
      );
    } finally {
      setLoadingRoles(false);
    }
  };

  const handleAnalyzeRole = async () => {
    if (!selectedRole) return;

    try {
      setAnalyzing(true);
      setError("");

      const response = await roleMatchResumeApi({
        resumeId,
        targetRole: selectedRole,
      });

      setResult(response.data);
    } catch (err) {
      console.error("Role match failed:", err);
      setError(
        err?.response?.data?.message || "Failed to analyze role match."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Role Match</h2>
        <p className="text-sm text-slate-600 mt-1">
          Compare this resume against a target role and identify missing skills.
        </p>
      </div>

      {loadingRoles ? (
        <p className="text-sm text-slate-500">Loading roles...</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-3">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <button
            onClick={handleAnalyzeRole}
            disabled={!selectedRole || analyzing}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {analyzing ? "Analyzing..." : "Analyze Role Match"}
          </button>
        </div>
      )}

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
                <p className="text-sm text-slate-500">Target Role</p>
                <h3 className="text-xl font-semibold text-slate-900">
                  {result.targetRole}
                </h3>
              </div>

              <div className="text-left md:text-right">
                <p className="text-sm text-slate-500">Role Match Score</p>
                <p className="text-3xl font-bold text-blue-600">
                  {result.matchScore}%
                </p>
              </div>
            </div>
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
                  No missing skills. Strong role alignment.
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

export default RoleMatchCard;