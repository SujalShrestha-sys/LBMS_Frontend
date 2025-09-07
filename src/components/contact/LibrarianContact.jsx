import { useState, useEffect } from "react";
import { Inbox, Clock, CheckCircle, Archive, Eye } from "lucide-react";
import { toast } from "react-toastify";
import { getAllMessages } from "../../services/contactServices.js"; // Fetch messages
import { replyToMessage, markResolved } from "../../services/contactServices.js";

const LibrarianContact = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await getAllMessages();
      if (res.data.success) {
        setMessages(res.data.data);
      } else {
        toast.error("Failed to load messages");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (msg) => {
    setSelectedMessage(msg);
    setReplyText(msg.reply || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
    setReplyText("");
  };

  const handleSendReply = async () => {
    if (!replyText) {
      toast.warning("Reply cannot be empty");
      return;
    }

    try {
      const res = await replyToMessage(selectedMessage._id, replyText);
      console.log(res);
      if (res.data.success) {
        toast.success("Reply sent successfully");
        fetchMessages();
        closeModal();
      }
    } catch (err) {
      toast.error("Failed to send reply");
      console.log(err.message);
    }
  };

  const handleMarkResolved = async () => {
    try {
      const res = await markResolved(selectedMessage._id);
      if (res.data.success) {
        toast.success("Message marked as resolved");
        fetchMessages();
        closeModal();
      }
    } catch (err) {
      toast.error("Failed to mark as resolved");
      console.log(err)
    }
  };

  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800">
        <Inbox className="w-6 h-6 text-blue-600" /> Borrower Messages
      </h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-blue-50 text-gray-700 text-sm">
              <th className="px-4 py-3 font-semibold text-center">Name</th>
              <th className="px-4 py-3 font-semibold text-center">Email</th>
              <th className="px-4 py-3 font-semibold text-center">Subject</th>
              <th className="px-4 py-3 font-semibold text-center">Status</th>
              <th className="px-4 py-3 font-semibold text-center">Date</th>
              <th className="px-4 py-3 font-semibold text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg, idx) => (
              <tr
                key={msg._id}
                className={`transition hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 text-center text-gray-700 font-medium truncate">
                  {msg.name}
                </td>
                <td className="px-4 py-3 text-center text-gray-600 truncate">
                  {msg.email}
                </td>
                <td className="px-4 py-3 text-center text-gray-600 truncate">
                  {msg.subject}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`flex items-center justify-center gap-1 px-3 py-1 rounded-full text-xs font-semibold w-fit mx-auto ${
                      msg.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : msg.status === "Replied"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {msg.status === "Pending" && <Clock size={14} />}
                    {msg.status === "Replied" && <CheckCircle size={14} />}
                    {msg.status === "Resolved" && <Archive size={14} />}
                    {msg.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-gray-500 text-sm">
                  {new Date(msg.createdAt).toLocaleDateString()}
                  <br />
                  <span className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => openModal(msg)}
                    className="flex items-center justify-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition mx-auto"
                  >
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-blue-200/30 backdrop-blur-xs flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-6 text-gray-400 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <Inbox className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-800">
                Message Details
              </h3>
            </div>

            {/* Message Details */}
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedMessage.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedMessage.email}
              </p>
              <p>
                <span className="font-semibold">Subject:</span>{" "}
                {selectedMessage.subject}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedMessage.status}
              </p>
              <p>
                <span className="font-semibold">Message:</span>{" "}
                {selectedMessage.message}
              </p>
            </div>

            {/* Librarian Reply */}
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mt-4"
              rows={4}
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            {/* Footer Buttons */}
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleSendReply}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Send Reply
              </button>
              <button
                onClick={handleMarkResolved}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibrarianContact;
