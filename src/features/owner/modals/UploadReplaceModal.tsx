interface UploadReplaceModalProps {
  EmptyState: () => void;
  previewUrl: string | null;
  confirmUpload: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  currentImageUrl?: string | null;
  message?: string;
}
export default function UploadReplaceModal({
  EmptyState,
  previewUrl,
  message,
  confirmUpload,
  handleFileChange,
  selectedFile,
  currentImageUrl,
}: UploadReplaceModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {message || "Image"}
          </h3>
          <button onClick={() => EmptyState()}>...</button>
        </div>
        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
        {/* Current image */}
        {currentImageUrl && (
          <img
            src={currentImageUrl}
            className="w-full h-48 object-cover rounded-xl"
          />
        )}
        {/* Preview new image */}
        {previewUrl && (
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <img src={previewUrl} className="w-full h-48 object-cover" />
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500">New image preview</p>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => EmptyState()}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmUpload}
            disabled={!selectedFile}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {message || "Image"}
          </button>
        </div>
      </div>
    </div>
  );
}
