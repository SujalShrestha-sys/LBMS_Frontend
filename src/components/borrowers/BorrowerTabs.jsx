const BorrowerTabs = ({
  activeTab,
  setActiveTab,
  pendingCount,
  historyCount,
}) => {
  return (
    <div className="border-b border-slate-200 bg-blue-50/50">
      <nav className="px-6 py-2.5">
        <div className="flex space-x-5">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-3 px-2 text-base font-semibold transition-all duration-200 ${
              activeTab === "pending"
                ? "border-b-3 border-blue-500 text-blue-600"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Pending Requests
            {pendingCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`pb-3 px-2 text-base font-semibold transition-all duration-200 ${
              activeTab === "history"
                ? "border-b-3 border-violet-500 text-violet-600"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Borrowing History
            {historyCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default BorrowerTabs;
