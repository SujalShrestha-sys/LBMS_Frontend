import React from "react";

const StatsCard = ({ title, value, subtitle, icon: Icon, color }) => {
  return (
    <div className={`rounded-lg p-5 shadow-sm ${color} text-gray-800`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        {Icon && <Icon className="w-4 h-4" />}
      </div>

      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs text-gray-600">{subtitle}</p>
    </div>
  );
};

export default StatsCard;
