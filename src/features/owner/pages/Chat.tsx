export default function Chat() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-1">Communicate with players and customers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Chat List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="overflow-y-auto">
            <div className="p-4 text-center text-gray-500">
              <p>No conversations yet</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow flex flex-col">
          <div className="flex-1 p-6 flex items-center justify-center text-gray-500">
            <p>Select a conversation to start messaging</p>
          </div>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                disabled
              />
              <button disabled className="px-4 py-2 bg-gray-300 text-white rounded-lg cursor-not-allowed">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
