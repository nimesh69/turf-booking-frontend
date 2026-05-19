export default function Finance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Finance & Earnings</h1>
        <p className="text-gray-600 mt-1">Track your revenue and payouts</p>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold text-gray-900">₹0</p>
          <p className="text-gray-500 text-xs mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">This Month</h3>
          <p className="text-3xl font-bold text-gray-900">₹0</p>
          <p className="text-gray-500 text-xs mt-2">Current month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending Payout</h3>
          <p className="text-3xl font-bold text-gray-900">₹0</p>
          <p className="text-gray-500 text-xs mt-2">Awaiting transfer</p>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Booking ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Venue</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No transactions yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
