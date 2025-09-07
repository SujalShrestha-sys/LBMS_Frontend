import React from "react";

const BorrowerTabs = ({
  activeTab,
  setActiveTab,
  pendingCount,
  historyCount,
}) => {
  const colorMap = {
    blue: {
      active: "border-b-3 border-blue-500 text-blue-600",
      badge: "bg-blue-100 text-blue-800",
    },
    violet: {
      active: "border-b-3 border-violet-500 text-violet-600",
      badge: "bg-violet-100 text-violet-800",
    },
  };

  const tabs = [
    {
      key: "pending",
      label: "Pending Requests",
      count: pendingCount,
      color: "blue",
    },
    {
      key: "history",
      label: "Borrowing History",
      count: historyCount,
      color: "violet",
    },
  ];

  return (
    <div className="border-b border-slate-200 bg-blue-50/50">
      <nav className="px-6 py-2.5" role="tablist">
        <div className="flex space-x-5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const colors = colorMap[tab.color];

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                role="tab"
                aria-selected={isActive}
                className={`pb-3 px-2 text-base font-semibold transition-all duration-200 ${
                  isActive
                    ? colors.active
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span
                    className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default BorrowerTabs;
