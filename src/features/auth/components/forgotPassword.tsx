export default function ForgotPasswordModal({
  show,
  email,
  setEmail,
  onClose,
  onSend,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-[350px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded-md mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={onSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}