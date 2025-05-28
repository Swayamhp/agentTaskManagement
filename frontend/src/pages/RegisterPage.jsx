import { useState } from "react";
import SmallSpinner from '../components/SmallSpinner.jsx';

const RegisterPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Registration successful! You can now log in.");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white border border-teal-300 rounded-xl shadow-lg p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-emerald-900 mb-6 text-center">
          Create Your Admin Account
        </h2>

        {error && (
          <div className="mb-6 text-sm text-red-800 font-semibold bg-red-100 border border-red-300 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 text-sm text-teal-800 font-semibold bg-teal-100 border border-teal-300 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <label htmlFor="name" className="sm:w-32 text-emerald-900 font-medium mb-2 sm:mb-0">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="flex-1 border border-teal-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <label htmlFor="email" className="sm:w-32 text-emerald-900 font-medium mb-2 sm:mb-0">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="flex-1 border border-teal-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <label htmlFor="password" className="sm:w-32 text-emerald-900 font-medium mb-2 sm:mb-0">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="flex-1 border border-teal-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <label htmlFor="confirmPassword" className="sm:w-32 text-emerald-900 font-medium mb-2 sm:mb-0">
              Confirm
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="flex-1 border border-teal-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? <SmallSpinner /> : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-emerald-700 hover:underline font-semibold"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;


