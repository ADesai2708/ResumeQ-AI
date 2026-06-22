const FeatureSummaryCard = ({ features }) => {
  if (!features) return null;

  const items = [
    { label: "Skills", value: features.skillsCount ?? 0 },
    { label: "Projects", value: features.projectsCount ?? 0 },
    { label: "Internships", value: features.internshipCount ?? 0 },
    { label: "Certifications", value: features.certificationCount ?? 0 },
    { label: "Metrics", value: features.metricsCount ?? 0 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Feature Summary
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 p-4 bg-slate-50"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {features.detectedSkills?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">
            Detected Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {features.detectedSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureSummaryCard;