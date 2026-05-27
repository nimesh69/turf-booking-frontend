import { useState } from 'react';
import { ChevronRight, Upload, X } from 'lucide-react';
import type { Court } from './Step2AddCourts';

interface Step3Props {
  courts: Court[];
  onNext: (data: MediaData) => void;
  onBack: () => void;
}

export interface UploadedCourtImage {
  file: File;
  previewUrl: string;
}

export interface MediaData {
  courtImages: { [courtId: string]: UploadedCourtImage[] };
}

export default function Step3MediaUpload({ courts, onNext, onBack }: Step3Props) {
  const [uploadedImages, setUploadedImages] = useState<MediaData['courtImages']>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, courtId: string) => {
    addFiles(e.target.files, courtId);
    e.target.value = '';
  };

  const addFiles = (fileList: FileList | null, courtId: string) => {
    if (!fileList) return;

    const newImages = Array.from(fileList)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({ file, previewUrl: URL.createObjectURL(file) }));

    setUploadedImages(prev => ({
      ...prev,
      [courtId]: [...(prev[courtId] || []), ...newImages].slice(0, 5),
    }));
  };

  const removeImage = (courtId: string, index: number) => {
    setUploadedImages(prev => ({
      ...prev,
      [courtId]: prev[courtId].filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    onNext({ courtImages: uploadedImages });
  };

  return (
    <main className="flex-grow pt-6 pb-24 px-6 container mx-auto max-w-4xl">
      {/* Progress Indicator */}
      <div className="mt-6 mb-8">
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="font-semibold text-blue-600 uppercase tracking-wider text-sm">Step 3 of 5</span>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">Media Upload</h2>
          </div>
          <span className="font-semibold text-blue-600 text-sm">60% Complete</span>
        </div>
        <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: '60%' }}></div>
        </div>
      </div>

      {/* Instructional Tip */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 mb-8">
        <span className="material-symbols-outlined text-blue-600 text-2xl flex-shrink-0">lightbulb</span>
        <p className="text-gray-800">
          <span className="font-bold">High-quality photos increase bookings by 40%</span>. Upload clear images of your
          courts, amenities, and entrance to help athletes feel confident in their choice.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {courts.map((court, index) => {
          const courtImages = uploadedImages[court.id] || [];
          const inputId = `file-input-${court.id}`;

          return (
            <section key={court.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                  <h3 className="text-2xl font-bold">
                    Court {index + 1}: {court.name}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-gray-100 rounded text-gray-700">
                  {court.sportType}
                </span>
              </div>

              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-all cursor-pointer bg-gray-50 group"
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  addFiles(e.dataTransfer.files, court.id);
                }}
              >
                <input
                  type="file"
                  id={inputId}
                  multiple
                  accept="image/*"
                  onChange={e => handleImageUpload(e, court.id)}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <Upload size={48} className="text-gray-400 group-hover:scale-110 transition-transform duration-200 mb-3" />
                  <p className="text-gray-900 font-semibold">Drag & drop images here</p>
                  <p className="text-gray-600 text-sm">
                    or{' '}
                    <label htmlFor={inputId} className="text-blue-600 underline cursor-pointer">
                      browse files
                    </label>
                  </p>
                  <p className="mt-2 text-xs text-gray-600">Max 5 images per court (PNG, JPG up to 5MB)</p>
                </div>
              </div>

              {courtImages.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Uploaded ({courtImages.length}/5)
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-4">
                    {courtImages.map((image, idx) => (
                      <div key={image.previewUrl} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                        <img alt="Court preview" src={image.previewUrl} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeImage(court.id, idx)}
                          className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 gap-4 fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 py-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    </main>
  );
}
