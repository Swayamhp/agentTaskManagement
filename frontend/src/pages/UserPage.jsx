import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext.jsx";

const UserPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user, setUser } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/agents/${user._id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch user info");
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserData();
    }
  }, [apiUrl, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-700">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  // Extract values safely
  const {
    name = "User",
    email = "Not Available",
    mobNumber = "N/A",
    tasks = [],
  } = userData || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-emerald-600 text-white px-6 py-4 shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-6">
            <p className="text-md">
              Welcome, <span className="font-bold">{name}</span>
            </p>
            <button
              onClick={handleLogout}
              className="bg-white text-emerald-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-8">
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-2">Your Info</h2>
          <div className="text-gray-700 space-y-1 text-sm">
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Mobile:</strong> {mobNumber}</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-emerald-800 mb-3">Your Tasks</h3>
          <ul className="space-y-2 text-sm">
            {tasks.length > 0 ? (
              tasks.map((task, idx) => (
                <li
                  key={idx}
                  className="border border-emerald-100 bg-emerald-50 p-3 rounded"
                >
                  ✅ {typeof task === "string" ? task : JSON.stringify(task)}
                </li>
              ))
            ) : (
              <li className="italic text-gray-500">You have no tasks assigned.</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default UserPage;



