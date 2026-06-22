import ScoreGaugeCard from "../analytics/ScoreGaugeCard";
import FeatureBarChart from "../analytics/FeatureBarChart";
import ImprovementLeaderboard from "../analytics/ImprovementLeaderboard";
import FeatureSummaryCard from "./FeatureSummaryCard";
import SuggestionsCard from "./SuggestionCard";
import SimulationCard from "./SimulationCard";
import StatCard from "../common/StatCard";

const ResumeAnalysisOverview = ({ resume }) => {
  if (!resume) return null;

  const features = resume.features || {};
  const simulation = resume.improvementSimulation || {};
  const detectedSkillsCount = features.detectedSkills?.length || 0;

  return (
    <div className="space-y-6">
      {/* Top summary row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ScoreGaugeCard score={resume.predictedScore || 0} />

        <div className="grid grid-cols-1 gap-6">
          <StatCard
            label="Detected Skills"
            value={detectedSkillsCount}
            subtitle="Skills found from the uploaded resume"
            accent="blue"
          />
          <StatCard
            label="Projects + Internships"
            value={(features.projectsCount || 0) + (features.internshipCount || 0)}
            subtitle="Experience-heavy ATS signals"
            accent="green"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <StatCard
            label="Certifications"
            value={features.certificationCount || 0}
            subtitle="Certifications detected in the resume"
            accent="amber"
          />
          <StatCard
            label="Impact Metrics"
            value={features.metricsCount || 0}
            subtitle="Numbers, percentages, or measurable outcomes"
            accent="purple"
          />
        </div>
      </div>

      {/* Existing summary */}
      <FeatureSummaryCard features={features} />

      {/* Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FeatureBarChart features={features} />
        <ImprovementLeaderboard simulationData={simulation} />
      </div>

      {/* Existing cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SuggestionsCard suggestions={resume.suggestions || []} />
        <SimulationCard simulationData={simulation} />
      </div>
    </div>
  );
};

export default ResumeAnalysisOverview;