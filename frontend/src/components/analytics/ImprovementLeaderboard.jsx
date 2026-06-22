const ImprovementLeaderboard = ({ simulationData }) => {
  const items = simulationData?.simulations || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Top Score Improvement Opportunities
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Ranked changes that could most improve the ATS score.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500">
          No improvement opportunities available yet.
        </p>
      ) : (
        <div className="space-y-4">
          {items.slice(0, 5).map((item, index) => (
            <div
              key={`${item.change}-${index}`}
              className="rounded-xl border border-slate-200 p-4 bg-slate-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">
                    #{index + 1} recommendation
                  </p>
                  <h3 className="text-base font-semibold text-slate-900 mt-1">
                    {item.change}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    New score: {item.newScore}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">Potential gain</p>
                  <p className="text-2xl font-bold text-green-600">
                    +{item.improvement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImprovementLeaderboard;