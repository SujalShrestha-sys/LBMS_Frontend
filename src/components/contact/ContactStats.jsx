import React, { useEffect, useState } from "react";
import { Mail, Clock, CheckCircle, Archive } from "lucide-react";
import { getAllStats } from "../../services/contactServices";
import { toast } from "react-toastify";

const ContactStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    replied: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAllStats();
        if (response.data.success) {
          const { total, pending, replied, resolved } = response.data;
          setStats({ total, pending, replied, resolved });
        } else {
          console.error("Failed to fetch stats:", response.data.message);
          toast.error("Failed to fetch stats data");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Messages",
      value: stats.total,
      icon: Mail,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Replied",
      value: stats.replied,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: Archive,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  if (loading) return <p className="text-gray-500">Loading stats...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map(({ title, value, icon: Icon, color }) => (
        <div
          key={title}
          className="bg-white rounded-lg p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition transform duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold mb-1">{value}</p>
          <p className="text-xs text-gray-500">Updated just now</p>
        </div>
      ))}
    </div>
  );
};

export default ContactStats;
