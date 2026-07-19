import { ChevronRight } from "lucide-react";
import VerificationCard from "../VerificationCard";
import { useDocumentUpload } from "../../hooks/useDocumentUpload";
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
export default function Step4Verification({ onNext, onBack }: Step4Props) {
  const { documents, handleFileUpload, getDocumentFiles, allUploaded } =
    useDocumentUpload();

  const handleNext = () => {
    if (allUploaded) {
      onNext({ documents: getDocumentFiles() });
    }
  };

  return (
    <main className="min-h-screen pt-6 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-6">
        {/* Step Indicator */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
                Step 4 of 5
              </span>
              <h1 className="text-4xl font-bold text-blue-600 mt-2">
                Identity & Business Verification
              </h1>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-600">
                80% Complete
              </span>
            </div>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-4/5 transition-all duration-500 ease-out"></div>
          </div>
          <p className="text-gray-700">
            Please upload the required documents to verify your venue ownership.
          </p>
        </div>

        {/* Verification Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {documents.map((doc) => (
            <VerificationCard
              key={doc.id}
              doc={doc}
              handleFileUpload={handleFileUpload}
            />
          ))}
        </div>
        {/* Disclaimer */}
        <div className="bg-green-50 rounded-xl p-4 flex gap-3 items-start border border-green-200 mt-8">
          <span className="material-symbols-outlined text-green-600 flex-shrink-0">
            verified_user
          </span>
          <div className="space-y-1">
            <p className="font-bold text-green-900">Secure Data Handling</p>
            <p className="text-sm text-green-800">
              Your documents are encrypted and stored securely. We only use them
              for verification purposes as per our privacy policy.
            </p>
          </div>
        </div>
      {/* Bottom Navigation */}
      <nav className="flex justify-between items-center mt-8 gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50 font-semibold"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          disabled={documents.some((doc) => !doc.file)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 active:scale-95 transition-all shadow-md font-semibold disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight size={20} />
        </button>
      </nav>
      </div>

    </main>
  );
}
