import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-slate-900">
          ResumeQ AI
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link to="/" className="hover:text-blue-600">
            Upload
          </Link>
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;