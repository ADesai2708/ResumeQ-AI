const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
    </div>
  );
};

export default EmptyState;