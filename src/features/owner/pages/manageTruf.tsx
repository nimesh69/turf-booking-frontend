import { useParams, useNavigate } from "react-router-dom";
import { venueQueryKeys, useTurfDetail } from "../hooks/useTurfs";
import { useState } from "react";
const MAX = 5;
export default function ManageTruf() {
  const { turfName, turfId } = useParams<{
    turfName: string;
    turfId: string;
  }>();
  const { data: turf, isLoading, error } = useTurfDetail(turfId || "");

  //   const navigate = useNavigate();
  console.log("venueid is ", turfName, turfId, turf);
  if (!turfId) {
    throw new Error("Venue ID is required");
  }
  const navigate = useNavigate();
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);
  // 2. Allow the state to hold a string (the object URL) or null
  // 1. Allow the state to hold a File object or null
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const openReplace = (id: number) => {
    setSelectedImageId(id);
    setPreviewUrl(null);
    setSelectedFile(null);
    setReplaceModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // preview before upload
  };

  const confirmReplace = () => {
    // TODO: upload `selectedFile` to API, then refresh images
    // on success: close modal, clear state
  };
  const handleDelete = (imageId: number) => {};
  if (!turfId) {
    return (
      <main className="flex-1 p-xl lg:px-xxl overflow-y-auto">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Please select a venue</p>
          <button
            onClick={() => navigate("/owner/venues")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Venues
          </button>
        </div>
      </main>
    );
  }
  if (isLoading) {
    return (
      <main className="flex-1 p-xl lg:px-xxl overflow-y-auto">
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600 text-lg">Loading venue and turfs...</p>
        </div>
      </main>
    );
  }
  if (error || !turf) {
    return (
      <main className="flex-1 p-xl lg:px-xxl overflow-y-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
          <p className="font-semibold">Error loading venue</p>
          <p className="text-sm mt-1">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <button
            onClick={() => navigate("/owner/venues")}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Back to Venues
          </button>
        </div>
      </main>
    );
  }
  return (
    <main className="flex-1 p-xl lg:px-xxl overflow-y-auto">
      {/* Breadcrumb and Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-lg mb-xxl">
        <div>
          <nav className="flex items-center gap-xs text-on-surface-variant mb-xs">
            <span
              onClick={() => navigate("/owner/venues")}
              className="font-caption text-caption cursor-pointer hover:underline"
            >
              My Venues
            </span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
            <span
              onClick={() => navigate(`/owner/turfs/${turf.venue}`)}
              className="font-caption text-caption cursor-pointer hover:underline"
            >
              {turf.venueName}
            </span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
            <span className="font-caption text-caption font-bold text-primary">
              {turf.name}
            </span>
          </nav>
          <h1 className="font-h1 text-h1 text-primary">Gallery Management</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {turf?.images.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <img
              alt={image.turf}
              src={image.image}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => {
                  setCurrentImageUrl(image.image);
                  openReplace(image.id);
                }}
                className="p-2.5 bg-white/90 backdrop-blur rounded-lg text-gray-700 hover:text-blue-600 transition-all shadow-lg"
                title="Replace"
              >
                {/* Replace icon */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(image.id)}
                className="p-2.5 bg-white/90 backdrop-blur rounded-lg text-gray-700 hover:text-red-600 transition-all shadow-lg"
                title="Delete"
              >
                {/* Delete icon */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            {/* Index badge */}
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur text-white text-xs font-medium rounded-md">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
      // Upload button
      <button
        disabled={turf?.images?.length >= MAX}
        onClick={() => setUploadModalOpen(true)}
        className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
          turf?.images?.length >= MAX
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        {turf?.images?.length >= MAX
          ? "Upload Image (Max reached 5)"
          : `Upload Image (${MAX - turf.images.length} remaining)`}
      </button>
      // Replace Modal
      {replaceModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Replace Image</h3>
              <button onClick={() => setReplaceModalOpen(false)}>...</button>
            </div>

            {/* Current image */}
            {currentImageUrl && (
              <img
                src={currentImageUrl}
                className="w-full h-48 object-cover rounded-xl"
              />
            )}

            {/* File input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />

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
                onClick={() => setReplaceModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmReplace}
                disabled={!selectedFile}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Replace Image
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
