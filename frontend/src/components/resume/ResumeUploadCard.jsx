import { useState } from "react";

const ResumeUploadCard = ({ onUpload, loading }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) return;

    await onUpload(selectedFile);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-2">
        Upload Resume
      </h2>
      <p className="text-slate-600 text-sm mb-6">
        Upload your resume PDF to get ATS score, improvement suggestions, and
        role/JD match insights.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        {selectedFile && (
          <p className="text-sm text-slate-500">
            Selected file: <span className="font-medium">{selectedFile.name}</span>
          </p>
        )}

        <button
          type="submit"
          disabled={!selectedFile || loading}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing Resume..." : "Upload & Analyze"}
        </button>
      </form>
    </div>
  );
};

export default ResumeUploadCard;