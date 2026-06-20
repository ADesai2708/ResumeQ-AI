const SKILL_ALIASES = {
  "node.js": "node",
  "node js": "node",
  "mongo db": "mongodb",
  "mongodb atlas": "mongodb",
  "restful api": "rest api",
  "restful apis": "rest api",
  "rest apis": "rest api",
  "ci/cd": "ci/cd",
  "ci cd": "ci/cd",
  "genai": "llm",
  "gen ai": "llm",
  "large language models": "llm",
  "machine-learning": "machine learning",
  "deep-learning": "deep learning",
};

export const normalizeSkill = (skill) => {
  const lower = skill.toLowerCase().trim();
  return SKILL_ALIASES[lower] || lower;
};