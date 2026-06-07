// components/VerificationCard.jsx
import { Upload } from "lucide-react";

const VerificationCard = ({
  doc,
  handleFileUpload,
}: {
  doc: {
    id: string;
    label: string;
    description: string;
    icon: string;
    file?: File;
  };
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    docId: string,
  ) => void;
}) => {
  return (
    <div className="group cursor-pointer bg-white border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300">
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
        onChange={(e) => handleFileUpload(e, doc.id)}
        className="hidden"
        accept=".jpg,.jpeg,.png,.pdf"
      />

      {doc.file ? (
        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <span className="material-symbols-outlined">check_circle</span>

          <span className="text-sm">{doc.file.name}</span>
        </div>
      ) : (
        <label
          htmlFor={doc.id}
          className="flex items-center gap-2 text-blue-600 font-bold text-sm cursor-pointer"
        >
          <Upload size={18} />
          <span>Browse files</span>
        </label>
      )}
    </div>
  );
};

export default VerificationCard;
