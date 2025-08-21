import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, User, Phone, Key, Calendar } from "lucide-react";

const LibrarianProfile = () => {
  const [loading, setLoading] = useState(true); // 🔹 control skeleton
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    phone: "+977-9800925222",
    email: "john122@gmail.com",
    oldPassword: "",
    newPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  // 🔹 Simulate backend fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData, profileImage);
    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-8xl mx-auto">
        <div className="mb-6 text-left">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Librarian Profile
          </h2>
          <p className="text-gray-600">Manage your library account settings</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center border border-gray-200 w-full max-w-[400px] h-[580px]">
            <div className="relative w-52 h-52 rounded-full bg-gray-50 flex items-center justify-center border-4 border-blue-200 overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-4xl text-gray-400">JD</span>
              )}
              <label
                htmlFor="upload-avatar"
                className="absolute bottom-5 right-6 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer transition-shadow shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <input
                  type="file"
                  id="upload-avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <h3 className="mt-4 text-xl text-gray-800 font-semibold">
              {formData.fullName}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{formData.email}</p>
            <div className="flex items-center mt-4 text-gray-400 text-xs">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Member since January 2024</span>
            </div>
          </div>

          {/* Account Information / Skeleton */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-full max-w-[525px] h-[580px]">
            {loading ? (
              // 🔹 Skeleton Loader
              <div className="animate-pulse space-y-6">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
                <div className="h-20 bg-gray-200 rounded mt-6"></div>
                <div className="h-12 bg-gray-200 rounded mt-4"></div>
              </div>
            ) : (
              // 🔹 Actual Form
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-1">
                    Account Information
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Update your personal details
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Login Credentials */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <h4 className="text-lg text-gray-800 font-semibold">
                      Login Credentials
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 flex items-center">
                        <Key className="w-4 h-4 mr-2 text-gray-400" />
                        Old Password
                      </label>
                      <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 flex items-center">
                        <Key className="w-4 h-4 mr-2 text-gray-400" />
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LibrarianProfile;
