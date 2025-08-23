import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Mail, User, Phone, Key, Calendar } from "lucide-react";
import {
  getLibrarianProfile,
  updateLibrarianProfile,
} from "../../services/profileServices.js";
import { useAuth } from "../../context/AuthContext.jsx";

const LibrarianProfile = () => {
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(true);

  // Saved data from backend (what we show on profile card)
  const [profileData, setProfileData] = useState({
    fullName: "",
    phone: "",
    email: "",
    memberSince: "",
  });

  // Editable form (temporary values before saving)
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getLibrarianProfile();
        const user = res.user;

        if (user) {
          setProfileData({
            fullName: user.name || "",
            phone: user.phone || "",
            email: user.email || "",
            memberSince: user.createdAt,
          });

          // initialize edit form with same values
          setEditFormData({
            fullName: user.name || "",
            phone: user.phone || "",
            email: user.email || "",
            oldPassword: "",
            newPassword: "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit updates (text & password only)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editFormData.oldPassword) {
      toast.error("Old password is required for any changes");
      return;
    }

    try {
      const res = await updateLibrarianProfile({
        name: editFormData.fullName,
        email: editFormData.email,
        phone: editFormData.phone,
        oldPassword: editFormData.oldPassword,
        newPassword: editFormData.newPassword,
      });

      // Update UI only after success
      setProfileData({
        fullName: res.user.name,
        email: res.user.email,
        phone: res.user.phone || "",
        memberSince: res.user.createdAt,
      });

      // Update AuthContext for navbar and other components
      updateUser(res.user);

      // Reset password fields
      setEditFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
      }));

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  // image upload for profile card only
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
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
                <span className="text-4xl text-gray-400">
                  {profileData.fullName ? profileData.fullName[0] : "JD"}
                </span>
              )}
              <label
                htmlFor="upload-avatar"
                className="absolute bottom-5 right-6 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer transition-shadow shadow-md"
              >
                <input
                  type="file"
                  id="upload-avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                ✎
              </label>
            </div>

            <h3 className="mt-4 text-xl text-gray-800 font-semibold">
              {profileData.fullName}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{profileData.email}</p>
            <p className="text-gray-600 text-sm mt-2">{profileData.phone}</p>
            <div className="flex items-center mt-4 text-gray-400 text-xs">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                Member since{" "}
                {profileData.memberSince &&
                  new Date(profileData.memberSince).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                    }
                  )}
              </span>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-full max-w-[525px] h-[580px]">
            {loading ? (
              <div className="animate-pulse space-y-6">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : (
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
                      <User className="w-4 h-4 mr-2 text-gray-400" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" /> Phone
                      Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

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
                        value={editFormData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 flex items-center">
                        <Key className="w-4 h-4 mr-2 text-gray-400" /> Old
                        Password
                      </label>
                      <input
                        type="password"
                        name="oldPassword"
                        value={editFormData.oldPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 flex items-center">
                        <Key className="w-4 h-4 mr-2 text-gray-400" /> New
                        Password (optional)
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={editFormData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg"
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
