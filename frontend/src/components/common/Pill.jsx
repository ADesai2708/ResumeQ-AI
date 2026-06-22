const Pill = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-green-50 text-green-700 border border-green-100",
    danger: "bg-red-50 text-red-700 border border-red-100",
    info: "bg-blue-50 text-blue-700 border border-blue-100",
    warning: "bg-amber-50 text-amber-700 border border-amber-100",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export default Pill;