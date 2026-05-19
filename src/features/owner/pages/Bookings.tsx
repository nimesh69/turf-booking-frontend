export default function Bookings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-600 mt-1">Manage all your venue bookings</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 flex gap-4 flex-wrap">
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Venues</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
        <input 
          type="date" 
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Booking ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Venue</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                No bookings yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
