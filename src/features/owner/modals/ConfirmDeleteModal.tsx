interface ConfirmDeleteModalProps {
  title: string;
  message: string;
  itemName?: string;
  password: string;
  onPasswordChange: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  error?: string;
}

export default function ConfirmDeleteModal({
  title,
  message,
  itemName,
  password,
  onPasswordChange,
  onCancel,
  onConfirm,
  isDeleting = false,
  error,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {message}
          {itemName && (
            <>
              {" "}
              <span className="font-medium text-gray-900">"{itemName}"</span>?
            </>
          )}
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm your password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          disabled={isDeleting}
          autoFocus
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Password"
        />
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting || !password}
            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}