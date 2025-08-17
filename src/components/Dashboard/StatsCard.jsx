import React from "react";

const StatsCard = ({ title, value, subtitle, icon: Icon, color }) => {
  return (
    <div 
      className={`rounded-lg p-4 px-8 shadow-md text-center ${color} text-gray-800`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <h4 className="text-x font-medium">{title || "Title"}</h4>
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mb-2">
        <p className="text-2xl font-bold text-start">{value || "0"}</p>
      </div>
      <p className="text-xs text-start">{subtitle || "No subtitle"}</p>
    </div>
  );
};

export default StatsCard;