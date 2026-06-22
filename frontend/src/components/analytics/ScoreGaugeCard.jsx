import ScoreBadge from "../common/ScoreBadge";

const ScoreGaugeCard = ({ score = 0 }) => {
  const radius = 62;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.max(0, Math.min(score, 100));
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  const getColor = (value) => {
    if (value >= 85) return "#16a34a";
    if (value >= 70) return "#2563eb";
    if (value >= 55) return "#d97706";
    return "#dc2626";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-slate-900">ATS Score</h2>
        <ScoreBadge score={score} />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-40 h-40 -rotate-90">
            <circle
              stroke="#e2e8f0"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="80"
              cy="80"
            />
            <circle
              stroke={getColor(score)}
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx="80"
              cy="80"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-slate-900">
              {Number(score).toFixed(1)}
            </p>
            <p className="text-sm text-slate-500 mt-1">out of 100</p>
          </div>
        </div>

        <p className="text-sm text-slate-500 mt-5 text-center max-w-xs">
          Predicted ATS strength based on resume features, structure, and model
          scoring.
        </p>
      </div>
    </div>
  );
};

export default ScoreGaugeCard;