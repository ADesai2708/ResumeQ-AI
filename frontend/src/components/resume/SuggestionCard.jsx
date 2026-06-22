const SuggestionsCard = ({ suggestions = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Improvement Suggestions
      </h2>

      {suggestions.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No suggestions available yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionsCard;