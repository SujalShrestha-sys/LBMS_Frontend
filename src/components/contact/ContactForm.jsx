import React, { useState } from "react";
import { Mail, User, MessageSquare, Edit3, Send, Inbox } from "lucide-react";
import { toast } from "react-toastify";
import { createMessage } from "../../services/contactServices";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await createMessage(formData);
      console.log("Message: ", data)

      if (data.success) {
        toast.success(data.message || "Message submitted successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 rounded-xl shadow-lg max-w-lg mx-auto mb-4 border-gray-200">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-2">
        <Inbox className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Get in Touch</h2>
      </div>
      <p className="text-gray-600 mb-8 text-sm">
        Have questions or feedback? Drop us a message and we’ll respond as soon
        as possible.
      </p>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500">
            <User className="w-5 h-5 text-blue-500 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500">
            <Mail className="w-5 h-5 text-blue-500 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500">
            <Edit3 className="w-5 h-5 text-blue-500 mr-3" />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <div className="flex items-start bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500">
            <MessageSquare className="w-5 h-5 text-blue-500 mt-1 mr-3" />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700 resize-none h-28"
            />
          </div>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white w-full py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md"
        >
          {loading ? "Sending..." : "Send Message"}
          {!loading && <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
