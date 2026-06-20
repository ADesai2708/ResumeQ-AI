export const generateResumeSuggestionsFromSimulations = (simulationResult) => {
  const { simulations } = simulationResult;

  return simulations
    .filter((item) => item.improvement > 0)
    .slice(0, 5)
    .map((item) => {
      return `${item.change} can improve your ATS score by approximately +${item.improvement} points.`;
    });
};