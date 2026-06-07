import { ChevronRight, X } from "lucide-react";
import VerificationCard from "../components/VerificationCard";
import { useDocumentUpload, DocumentFiles } from "../hooks/useDocumentUpload";
export function VerificationEditModal({
  onSubmit,
  onCancel,
  isLoading = false,
}:{
    onSubmit: (documents: Required<DocumentFiles>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}) {
  const { documents, handleFileUpload, getDocumentFiles, allUploaded } =
    useDocumentUpload();

  const handleSubmit = () => {
    if (allUploaded) {
      const files = getDocumentFiles();
      onSubmit(files as Required<DocumentFiles>);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">
              Re-submit Documents
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Upload updated documents for verification
            </p>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 text-2xl disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {documents.map((doc) => (
            <VerificationCard
              key={doc.id}
              doc={doc}
              handleFileUpload={handleFileUpload}
            />
          ))}
        </div>

        {/* Security Note */}
        <div className="bg-green-50 rounded-lg p-4 flex gap-3 items-start border border-green-200 mb-6">
          <span className="material-symbols-outlined text-green-600 flex-shrink-0">
            verified_user
          </span>
          <div className="space-y-1">
            <p className="font-semibold text-green-900 text-sm">
              Secure Data Handling
            </p>
            <p className="text-xs text-green-800">
              Your documents are encrypted and stored securely. We only use them
              for verification purposes.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={documents.some((doc) => !doc.file) || isLoading}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition font-semibold disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Submit Documents"}
            {!isLoading && <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
