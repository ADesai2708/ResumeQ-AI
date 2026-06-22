import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const FeatureBarChart = ({ features }) => {
  if (!features) return null;

  const data = [
    { name: "Skills", value: features.skillsCount ?? 0 },
    { name: "Projects", value: features.projectsCount ?? 0 },
    { name: "Internships", value: features.internshipCount ?? 0 },
    { name: "Certifications", value: features.certificationCount ?? 0 },
    { name: "Metrics", value: features.metricsCount ?? 0 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Resume Feature Breakdown
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Distribution of core ATS-impacting resume features.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeatureBarChart;