const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          {subtitle && (
            <p className="text-slate-600 mt-2 max-w-3xl">{subtitle}</p>
          )}
        </div>

        {action && <div>{action}</div>}
      </div>
    </div>
  );
};

export default PageHeader;