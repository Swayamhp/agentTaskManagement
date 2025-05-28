import  { useState, useEffect } from 'react';
import AgentCard from './AgentCard.jsx';
import BigLoadingSpinner from './BigLoadingSpinner.jsx';

const ShowAgents = () => {
  // API URL from environment variables
  const apiUrl = import.meta.env.VITE_API_URL;

  // State to hold fetched agents data
  const [demoAgents, setDemoAgents] = useState([]);
  // State for error messages
  const [error, setError] = useState('');
  // Loading state for fetch status
  const [loading, setLoading] = useState(true);

  // State to hold the currently selected agent for modal display
  const [selectedAgent, setSelectedAgent] = useState(null);
  // State to toggle the modal visibility
  const [showModal, setShowModal] = useState(false);

  // Fetch agents on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        setError(''); // Clear previous errors

        // Fetch agents from API
        const res = await fetch(`${apiUrl}/api/agents`);
        if (!res.ok) {
          throw new Error('Something went wrong fetching data');
        }

        // Parse JSON response
        const data = await res.json();

        // Store agents data in state
        setDemoAgents(data);
        console.log(data); // Debug output
      } catch (err) {
        setError(err.message); // Set error if fetch fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [apiUrl]);

  // Handler to open modal and set selected agent
  const handleShowTasks = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  // Handler to close modal and reset selected agent
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAgent(null);
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BigLoadingSpinner />
      </div>
    );
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <p className="text-center text-red-600 font-semibold p-4">{error}</p>
    );
  }

  // Show message if no agents found
  if (demoAgents.length === 0) {
    return (
      <p className="text-center text-gray-600 font-medium p-4">No agents found.</p>
    );
  }

  return (
    <div className="relative p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-emerald-900 mb-6">Agent List</h2>

      {/* Grid of agent cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoAgents.map((agent, index) => (
          <AgentCard
            key={index}           // Use index as key (consider better key if possible)
            agentInfo={agent}     // Pass agent data
            onShowTasks={handleShowTasks}  // Pass handler to show tasks modal
          />
        ))}
      </div>

      {/* Modal for displaying selected agent's tasks */}
      {showModal && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Modal header */}
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">
              Tasks for {selectedAgent.name}
            </h3>

            {/* Tasks list */}
            <ul className="space-y-2 text-sm text-gray-700 max-h-60 overflow-y-auto">
              {selectedAgent.tasks && selectedAgent.tasks.length > 0 ? (
                selectedAgent.tasks.map((task, index) => (
                  <li key={index} className="border p-2 rounded bg-emerald-50">
                    <p><strong>✅ {task.firstName}</strong></p>
                    <p>📞 {task.mobNumber}</p>
                    <p>📝 {task.notes}</p>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No tasks assigned</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowAgents;



