const ScoreBadge = ({ score }) => {
  const getMeta = (value = 0) => {
    if (value >= 85) {
      return {
        label: "Excellent",
        className:
          "bg-green-50 text-green-700 border border-green-200",
      };
    }

    if (value >= 70) {
      return {
        label: "Strong",
        className:
          "bg-blue-50 text-blue-700 border border-blue-200",
      };
    }

    if (value >= 55) {
      return {
        label: "Moderate",
        className:
          "bg-amber-50 text-amber-700 border border-amber-200",
      };
    }

    return {
      label: "Needs Improvement",
      className:
        "bg-red-50 text-red-700 border border-red-200",
    };
  };

  const meta = getMeta(score);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${meta.className}`}
    >
      {meta.label}
    </span>
  );
};

export default ScoreBadge;