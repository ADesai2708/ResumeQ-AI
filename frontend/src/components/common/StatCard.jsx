const StatCard = ({
  label,
  value,
  subtitle,
  accent = "blue",
}) => {
  const accentMap = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    amber: "text-amber-600 bg-amber-50",
    red: "text-red-600 bg-red-50",
    purple: "text-purple-600 bg-purple-50",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
          )}
        </div>

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentMap[accent]}`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-current" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;