
const AgentCard = ({ agentInfo, onShowTasks }) => {
  // Destructure agent details from props
  const { name, countryCode, mobNumber, email } = agentInfo;
  console.log(name, mobNumber, email); // Debugging info

  return (
    // Container with border, padding, and shadow for card styling
    <div className="border border-teal-300 rounded-lg shadow-sm bg-white p-3 text-sm space-y-1">
      {/* Agent name styled bold and colored */}
      <div className="font-semibold text-emerald-800">{name}</div>
      
      {/* Display phone number with country code */}
      <div className="text-gray-700">📞 {countryCode}{mobNumber}</div>
      
      {/* Display email */}
      <div className="text-gray-700">✉️ {email}</div>

      {/* Button container, centered */}
      <div className="flex justify-center">
        {/* Button to trigger showing tasks, calls onShowTasks with agent info */}
        <button
          onClick={() => onShowTasks(agentInfo)}
          className="px-2 py-1 text-xs bg-emerald-500 text-white rounded hover:bg-emerald-600"
        >
          Tasks
        </button>
      </div>
    </div>
  );
};

export default AgentCard;

