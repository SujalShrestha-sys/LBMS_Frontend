import React, { useState } from "react";
import { Mail, Phone, Lock, Eye, EyeOff, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../../services/authServices";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);

    try {
      const res = await signupApi(formData);
      console.log("signup response: ", res.data);

      if (res.data.success) {
        alert("Signup successful! Please login to continue.");
        navigate("/login");
      } else {
        alert("Signup failed: Please try again.");
      }
    } catch (error) {
      console.error("Signup error: ", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        {/* Logo + Heading */}
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen color="green" />
            <h1 className="text-xl font-bold ">BookHive</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Create an account
          </h2>
          <p className="text-gray-500 text-sm">
            Join BookHive and start your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-black-600 flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-gray-400" />
              Name
            </label>
            <input
              type="name"
              name="name"
              placeholder="eg: John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-black-600 flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-gray-400" />
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="someone@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-black-600 flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-gray-400" />
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-black-600 flex items-center gap-2 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
            >
              <option value="">Select a Role</option>
              <option value="librarian">Librarian</option>
              <option value="borrower">Borrower</option>
            </select>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an Account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
