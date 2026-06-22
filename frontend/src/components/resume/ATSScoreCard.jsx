const ATSScoreCard = ({ score }) => {
  const getScoreLabel = (value) => {
    if (value >= 85) return "Excellent";
    if (value >= 70) return "Strong";
    if (value >= 55) return "Moderate";
    return "Needs Improvement";
  };

  const getScoreColor = (value) => {
    if (value >= 85) return "text-green-600";
    if (value >= 70) return "text-blue-600";
    if (value >= 55) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">ATS Score</h2>

      <div className="flex items-center justify-between">
        <div>
          <p className={`text-5xl font-bold ${getScoreColor(score)}`}>
            {score?.toFixed?.(2) ?? score}
          </p>
          <p className="text-slate-500 mt-2">Predicted ATS Score</p>
        </div>

        <div className="text-right">
          <p className={`text-lg font-semibold ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Resume strength based on extracted features and ML score prediction
          </p>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreCard;