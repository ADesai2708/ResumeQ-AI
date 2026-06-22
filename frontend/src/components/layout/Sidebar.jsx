import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Upload Resume", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-4 hidden md:block">
      <h2 className="text-xl font-bold text-slate-900 mb-6">ResumeQ AI</h2>

      <div className="space-y-2">
        {links.map((link) => {
          const active = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                active
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;