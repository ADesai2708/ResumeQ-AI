import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;

/* ---------------- Resume APIs ---------------- */

export const uploadResumeApi = async (formData) => {
  const response = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllResumesApi = async () => {
  const response = await api.get("/resume");
  return response.data;
};

export const getResumeByIdApi = async (resumeId) => {
  const response = await api.get(`/resume/${resumeId}`);
  return response.data;
};

export const simulateResumeScoreApi = async (resumeId) => {
  const response = await api.get(`/resume/${resumeId}/simulate-score`);
  return response.data;
};

/* ---------------- JD / Role APIs ---------------- */

export const getAvailableRolesApi = async () => {
  const response = await api.get("/jd/roles");
  return response.data;
};

export const roleMatchResumeApi = async (payload) => {
  const response = await api.post("/jd/role-match", payload);
  return response.data;
};

export const jdMatchResumeApi = async (payload) => {
  const response = await api.post("/jd/jd-match", payload);
  return response.data;
};