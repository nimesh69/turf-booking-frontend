import { useState } from "react";

export interface DocumentUpload {
  id: string;
  label: string;
  icon: string;
  description: string;
  file?: File;
}

export interface DocumentFiles {
  citizenshipFront?: File;
  citizenshipBack?: File;
  panCard?: File;
  businessRegistration?: File;
}

export const DEFAULT_DOCUMENTS: DocumentUpload[] = [
  { id: "citizenship_front", label: "Citizenship Front", icon: "branding_watermark", description: "JPG, PNG or PDF (Max. 5MB)" },
  { id: "citizenship_back", label: "Citizenship Back", icon: "branding_watermark", description: "JPG, PNG or PDF (Max. 5MB)" },
  { id: "pan_card", label: "PAN Card", icon: "id_card", description: "Official government issued ID" },
  { id: "business_registration", label: "Business Registration", icon: "description", description: "Company certificate document" },
];

export function useDocumentUpload() {
  const [documents, setDocuments] = useState<DocumentUpload[]>(DEFAULT_DOCUMENTS);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocuments((docs) => docs.map((doc) => (doc.id === docId ? { ...doc, file } : doc)));
    }
  };

  const getDocumentFiles = (): DocumentFiles => ({
    citizenshipFront: documents.find((d) => d.id === "citizenship_front")?.file,
    citizenshipBack: documents.find((d) => d.id === "citizenship_back")?.file,
    panCard: documents.find((d) => d.id === "pan_card")?.file,
    businessRegistration: documents.find((d) => d.id === "business_registration")?.file,
  });

  const allUploaded = documents.every((doc) => doc.file);

  return { documents, handleFileUpload, getDocumentFiles, allUploaded };
}