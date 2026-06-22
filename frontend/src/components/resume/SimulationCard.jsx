const SimulationCard = ({ simulationData }) => {
  const simulations = simulationData?.simulations || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Score Improvement Simulator
        </h2>

        {simulationData?.currentScore !== undefined && (
          <span className="text-sm text-slate-500">
            Current Score:{" "}
            <span className="font-semibold text-slate-900">
              {simulationData.currentScore}
            </span>
          </span>
        )}
      </div>

      {simulations.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No simulation data available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <th className="py-3 pr-4">Suggested Change</th>
                <th className="py-3 pr-4">New Score</th>
                <th className="py-3 pr-4">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {simulations.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-3 pr-4 text-slate-800">{item.change}</td>
                  <td className="py-3 pr-4 text-slate-700">{item.newScore}</td>
                  <td className="py-3 pr-4 font-semibold text-green-600">
                    +{item.improvement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SimulationCard;