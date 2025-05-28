import { useState } from 'react';
import SmallSpinner from './SmallSpinner.jsx';

const AddAgents = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+1',
    mobNumber: '',
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.mobNumber || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.message);
      }

      console.log('Agent submitted:', formData);
      setSuccess('Agent added successfully!');
    } catch (err) {
      setError(err.message);
    }

    setFormData({
      name: '',
      countryCode: '+1',
      mobNumber: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white border-teal-300 rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-emerald-900 mb-6">Add New Agent</h2>

        {success && (
          <div className="mb-6 text-sm text-teal-800 font-semibold bg-teal-100 border border-teal-300 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 text-sm text-red-800 font-semibold bg-red-100 border border-red-300 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label htmlFor="name" className="w-28 text-emerald-900 font-medium shrink-0">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full border border-teal-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter agent name"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label htmlFor="number" className="w-28 text-emerald-900 font-medium shrink-0">
              Phone Number
            </label>
            <div className="flex w-full">
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

          {/* Email */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label htmlFor="email" className="w-28 text-emerald-900 font-medium shrink-0">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full border border-teal-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label htmlFor="password" className="w-28 text-emerald-900 font-medium shrink-0">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full border border-teal-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          {/* Submit */}
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



