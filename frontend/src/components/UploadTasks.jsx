import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const UploadAndDistribute = () => {
  // State to store raw data extracted from the uploaded file
  const [rawData, setRawData] = useState([]);
  // Loading state during distribution process
  const [loading, setLoading] = useState(false);
  // State to track upload progress percentage
  const [uploadProgress, setUploadProgress] = useState(0);
  // Message to display status or errors to user
  const [message, setMessage] = useState('');
  // State to hold list of agents fetched from API
  const [agents, setAgents] = useState([]);

  // API URL from environment variables
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch agents on component mount
  useEffect(() => {
    getAllAgents();
  }, []);

  // Handler to process uploaded file
  const handleFile = (e) => {
    const file = e.target.files[0];
    // Allowed file types for upload
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    // Validate file presence and type
    if (!file || !validTypes.includes(file.type)) {
      return alert('Only .csv, .xls, .xlsx files are allowed.');
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      // Read workbook from binary string
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      // Take the first sheet in workbook
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Convert sheet data to JSON array
      const data = XLSX.utils.sheet_to_json(sheet);

      // Validate that every row contains required fields
      const isValid = data.every(row =>
        row.FirstName && row.Phone && row.Notes
      );

      if (!isValid) {
        setMessage("Error need valid required fields !")
        return;
      }

      // Store extracted data in state
      setRawData(data);
    };

    // Read file as binary string to parse with XLSX
    reader.readAsBinaryString(file);
  };

  // Fetch all agents from backend API
  const getAllAgents = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/agents`);
      const data = await res.json();

      // Validate response
      if (!res.ok || !Array.isArray(data)) {
        throw new Error(data.message || 'Failed to fetch agents.');
      }

      // Save agents data in state
      setAgents(data);
    } catch (err) {
      setMessage(`Error fetching agents: ${err.message}`);
    }
  };

  // Distribute raw data tasks evenly among agents and send to backend
  const handleDistribute = async () => {
    // Validate that rawData and agents are loaded
    if (rawData.length === 0 || agents.length === 0) {
      setMessage('Make sure agents are loaded and file is uploaded.');
      return;
    }

    setLoading(true);
    setMessage('');
    setUploadProgress(0);

    // Create empty arrays for each agent to hold tasks
    const distributed = Array.from({ length: agents.length }, () => []);

    // Distribute tasks evenly using modulo operator
    rawData.forEach((item, index) => {
      const target = index % agents.length;
      distributed[target].push({
        firstName: item.FirstName,
        mobNumber: item.Phone,
        notes: item.Notes,
      });
    });

    try {
      // Loop through each agent and send their tasks to the API
      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];
        const res = await fetch(`${apiUrl}/api/assign-task/${agent._id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(distributed[i]),
        });

        if (!res.ok) throw new Error(`Failed to assign tasks to ${agent.name}`);

        // Update progress bar percentage
        setUploadProgress(((i + 1) / agents.length) * 100);
      }

      // Success message and clear uploaded data
      setMessage('Tasks distributed and saved successfully!');
      setRawData([]);
    } catch (err) {
      console.error(err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-emerald-800">Upload & Distribute Tasks</h2>

      {/* File input for CSV/XLS/XLSX */}
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleFile}
        className="block mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
      />

      {/* Show table and distribute button only if data is loaded */}
      {rawData.length > 0 && (
        <>
          <button
            onClick={handleDistribute}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded shadow mb-4"
          >
            {loading ? 'Distributing...' : 'Distribute Tasks'}
          </button>

          {/* Display uploaded data in table */}
          <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-emerald-100 text-emerald-800">
                <tr>
                  <th className="px-6 py-3">First Name</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {rawData.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-3">{row.FirstName}</td>
                    <td className="px-6 py-3">{row.Phone}</td>
                    <td className="px-6 py-3">{row.Notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Progress bar for upload status */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {/* Message display area (error or success) */}
      {message && (
        <p className={`mt-2 font-medium ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadAndDistribute;





