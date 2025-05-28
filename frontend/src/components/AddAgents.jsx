import  { useState } from 'react';
import SmallSpinner from './SmallSpinner.jsx';

const AddAgents = () => {
  // API base URL from environment variable
  const apiUrl = import.meta.env.VITE_API_URL;

  // Loading state for the submit button
  const [loading, setLoading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+1',  // default country code
    mobNumber: '',
    email: '',
    password: '',
  });

  // State to handle success and error messages
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Update form data when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload
    setLoading(true);   // Show spinner

    // Basic validation
    if (!formData.name || !formData.mobNumber || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Send POST request to register endpoint
      const res = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setLoading(false); // Stop loading after response

      if (!res.ok) {
        throw new Error(data.message); // Handle server error
      }

      console.log('Agent submitted:', formData);
      setSuccess('Agent added successfully!'); // Show success message

    } catch (err) {
      setError(err.message); // Show error message
    }

    // Reset form after submission
    setFormData({
      name: '',
      countryCode: '+1',
      mobNumber: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white border-teal-300 rounded-xl shadow-lg p-6 w-full max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold text-emerald-900 mb-6">Add New Agent</h2>

        {/* Success Message */}
        {success && (
          <div className="mb-6 text-sm text-teal-800 font-semibold bg-teal-100 border border-teal-300 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 text-sm text-red-800 font-semibold bg-red-100 border border-red-300 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Agent Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="flex items-center space-x-4">
            <label htmlFor="name" className="w-28 text-emerald-900 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="flex-1 border border-teal-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter agent name"
            />
          </div>

          {/* Phone Number with Country Code */}
          <div className="flex items-center space-x-4">
            <label htmlFor="number" className="w-28 text-emerald-900 font-medium">
              Phone Number
            </label>
            <div className="flex flex-1">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border border-teal-300 rounded-l-lg bg-white text-emerald-900 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
<option value="+1">+1 (US)</option>
<option value="+44">+44 (UK)</option>
<option value="+91">+91 (IN)</option> 
<option value="+61">+61 (AU)</option>
<option value="+81">+81 (JP)</option>
<option value="+49">+49 (DE)</option>
<option value="+33">+33 (FR)</option>
<option value="+39">+39 (IT)</option>
<option value="+7">+7 (RU)</option>
<option value="+55">+55 (BR)</option>
<option value="+27">+27 (ZA)</option>
<option value="+86">+86 (CN)</option>
<option value="+64">+64 (NZ)</option>
                {/* Add more country codes as needed */}
              </select>
              <input
                id="number"
                type="tel"
                name="mobNumber"
                className="flex-grow border border-l-0 border-teal-300 rounded-r-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
                value={formData.mobNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex items-center space-x-4">
            <label htmlFor="email" className="w-28 text-emerald-900 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="flex-1 border border-teal-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center space-x-4">
            <label htmlFor="password" className="w-28 text-emerald-900 font-medium">
              Password
            </label>
            <input
              id="password"
              type="string"
              name="password"
              className="flex-1 border border-teal-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {loading ? <SmallSpinner /> : "Add Agent"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAgents;


