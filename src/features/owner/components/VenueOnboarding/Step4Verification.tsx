import { useState } from 'react';
import { ChevronRight, Upload } from 'lucide-react';

interface Step4Props {
  onNext: (data: VerificationData) => void;
  onBack: () => void;
}

export interface VerificationData {
  documents: {
    citizenshipFront?: File;
    citizenshipBack?: File;
    panCard?: File;
    businessRegistration?: File;
  };
}

interface DocumentUpload {
  id: string;
  label: string;
  icon: string;
  description: string;
  file?: File;
}

export default function Step4Verification({ onNext, onBack }: Step4Props) {
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    {
      id: 'citizenship_front',
      label: 'Citizenship Front',
      icon: 'branding_watermark',
      description: 'JPG, PNG or PDF (Max. 5MB)',
    },
    {
      id: 'citizenship_back',
      label: 'Citizenship Back',
      icon: 'branding_watermark',
      description: 'JPG, PNG or PDF (Max. 5MB)',
    },
    {
      id: 'pan_card',
      label: 'PAN Card',
      icon: 'id_card',
      description: 'Official government issued ID',
    },
    {
      id: 'business_registration',
      label: 'Business Registration',
      icon: 'description',
      description: 'Company certificate document',
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocuments(docs =>
        docs.map(doc => (doc.id === docId ? { ...doc, file } : doc))
      );
    }
  };

  const handleNext = () => {
    const allDocumentsUploaded = documents.every(doc => doc.file);
    if (allDocumentsUploaded) {
      onNext({
        documents: {
          citizenshipFront: documents.find(d => d.id === 'citizenship_front')?.file,
          citizenshipBack: documents.find(d => d.id === 'citizenship_back')?.file,
          panCard: documents.find(d => d.id === 'pan_card')?.file,
          businessRegistration: documents.find(d => d.id === 'business_registration')?.file,
        },
      });
    }
  };

  return (
    <main className="min-h-screen pt-6 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-6">
        {/* Step Indicator */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">Step 4 of 5</span>
              <h1 className="text-4xl font-bold text-blue-600 mt-2">Identity & Business Verification</h1>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-600">80% Complete</span>
            </div>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-4/5 transition-all duration-500 ease-out"></div>
          </div>
          <p className="text-gray-700">Please upload the required documents to verify your venue ownership.</p>
        </div>

        {/* Verification Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {documents.map(doc => (
            <div
              key={doc.id}
              className="group cursor-pointer bg-white border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center mb-4 transition-colors">
                <span className="material-symbols-outlined text-4xl text-gray-600 group-hover:text-blue-600">
                  {doc.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold text-blue-600 mb-1">{doc.label}</h3>
              <p className="text-sm text-gray-600 mb-4">{doc.description}</p>

              <input
                type="file"
                id={doc.id}
                onChange={e => handleFileUpload(e, doc.id)}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
              />

              {doc.file ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="text-sm">{doc.file.name}</span>
                </div>
              ) : (
                <label htmlFor={doc.id} className="flex items-center gap-2 text-blue-600 font-bold text-sm cursor-pointer">
                  <Upload size={18} />
                  <span>Browse files</span>
                </label>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-green-50 rounded-xl p-4 flex gap-3 items-start border border-green-200 mt-8">
          <span className="material-symbols-outlined text-green-600 flex-shrink-0">verified_user</span>
          <div className="space-y-1">
            <p className="font-bold text-green-900">Secure Data Handling</p>
            <p className="text-sm text-green-800">
              Your documents are encrypted and stored securely. We only use them for verification purposes as per our privacy policy.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-between items-center px-6 py-4 bg-white border-t border-gray-200 shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50 font-semibold"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          disabled={documents.some(doc => !doc.file)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 active:scale-95 transition-all shadow-md font-semibold disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight size={20} />
        </button>
      </nav>
    </main>
  );
}
