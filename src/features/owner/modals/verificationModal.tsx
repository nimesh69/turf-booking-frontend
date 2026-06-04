import {VenueVerification} from "@/types/turf.types";
export function VerificationModal({
  status,
  onClose,
}: {
  status: VenueVerification;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Verification Status
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-lg ${status.verified ? "bg-green-50" : "bg-red-50"}`}
          >
            <span className="text-2xl">{status.verified ? "✅" : "❌"}</span>
            <div>
              <p
                className={`font-semibold ${status.verified ? "text-green-700" : "text-red-700"}`}
              >
                {status.verified ? "Verified" : "Not Verified"}
              </p>
            </div>
          </div>

          {status.rejectionReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-medium text-red-800 mb-1">
                Rejection Reason
              </p>
              <p className="text-sm text-red-700">{status.rejectionReason}</p>
              <button className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition">
                Edit & Resubmit Information
              </button>
            </div>
          )}

          {status.id && (
            <p className="text-xs text-gray-400">
              Verification ID: {status.id}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}