import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import UploadResumePage from "./pages/UploadResumePage";
import DashboardPage from "./pages/DashboardPage";
import ResumeDetailsPage from "./pages/ResumeDetailsPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              <Routes>
                <Route path="/" element={<UploadResumePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/resume/:id" element={<ResumeDetailsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;