import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext.jsx';
import ShowAgents from '../components/ShowAgents.jsx';
import AddAgents from '../components/AddAgents.jsx';
import UploadTasks from '../components/UploadTasks.jsx';

const AdminPage = () => {
  // State to control sidebar open/close on small screens
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State to track which component is currently active/displayed
  const [activeComponent, setActiveComponent] = useState('showAgents');

  // Get user data and setUser function from context
  const { user, setUser } = useUser();

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Handle logout: clear user from localStorage and context, then navigate to login page
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Render different components based on current activeComponent state
  const renderContent = () => {
    switch (activeComponent) {
      case 'showAgents':
        return <ShowAgents />;
      case 'addAgents':
        return <AddAgents />;
      case 'uploadTasks':
        return <UploadTasks />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar navigation */}
      <div
        className={`fixed md:static z-20 inset-y-0 left-0 w-64 bg-gradient-to-b from-emerald-700 via-teal-700 to-teal-800 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 shadow-xl`}
      >
        {/* Sidebar header with title and close button (on mobile) */}
        <div className="flex items-center justify-between h-16 bg-emerald-900 px-4 shadow-md">
          <span className="text-white font-bold uppercase tracking-wide">Admin Panel</span>
          <button className="text-white md:hidden" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {/* Sidebar navigation links */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-2">
            {[
              { id: 'showAgents', label: 'Show Agents' },
              { id: 'addAgents', label: 'Add Agents' },
              { id: 'uploadTasks', label: 'Upload Tasks' },
            ].map(item => (
              <a
                key={item.id}
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setActiveComponent(item.id); // Set active component when clicking a link
                }}
                className={`flex items-center px-4 py-2 rounded-lg cursor-pointer text-white transition duration-200 ease-in-out hover:bg-teal-600 ${
                  activeComponent === item.id ? 'bg-teal-700 shadow-md' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Top Navbar */}
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
          <div className="flex items-center">
            {/* Button to open sidebar on small screens */}
            <button
              className="text-gray-500 focus:outline-none md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              {/* Empty button content - you may add hamburger icon here */}
            </button>
          </div>

          {/* User info and logout button */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-semibold hidden sm:inline">
              {/* Show user's name or fallback to "Admin" */}
              Welcome, {user?.name || "Admin"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Render the selected component */}
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPage;




