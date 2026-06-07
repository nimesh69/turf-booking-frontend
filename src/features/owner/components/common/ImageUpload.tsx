type ImageUploadProps = {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  maxSizeMB?: number;
  disabled?: boolean;
};

export default function ImageUpload({
  label,
  value,
  onChange,
  maxSizeMB = 5,
  disabled = false,
}: ImageUploadProps) {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const maxSize = maxSizeMB * 1024 * 1024;

    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    onChange(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {value && (
        <img
          src={URL.createObjectURL(value)}
          alt="Preview"
          className="mt-4 h-40 w-full object-cover rounded-lg"
        />
      )}
    </div>
  );
}