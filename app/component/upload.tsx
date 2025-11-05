'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from '../context/FormContext';

export default function Upload() {
  const { formData, updateFormData } = useForm();
  // State to track uploaded files (arrays for multiple files)
  const [files, setFiles] = useState<{
    currentJamabandi: File[];
    ownersId: File[];
    registryCopy: File[];
    landMap: File[];
  }>({
    currentJamabandi: formData.currentJamabandi || [],
    ownersId: formData.ownersId || [],
    registryCopy: formData.registryCopy || [],
    landMap: formData.landMap || [],
  });
  
  const [comments, setComments] = useState<string>(formData.comments || '');

  useEffect(() => {
    updateFormData({
      currentJamabandi: files.currentJamabandi,
      ownersId: files.ownersId,
      registryCopy: files.registryCopy,
      landMap: files.landMap,
      comments,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, comments]);

  // Refs for file inputs
  const currentJamabandiRef = useRef<HTMLInputElement>(null);
  const ownersIdRef = useRef<HTMLInputElement>(null);
  const registryCopyRef = useRef<HTMLInputElement>(null);
  const landMapRef = useRef<HTMLInputElement>(null);

  // Allowed file types
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/jfif'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.jfif'];

  // Validate file type
  const isValidFile = (file: File): boolean => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    return (
      allowedTypes.includes(file.type.toLowerCase()) ||
      allowedExtensions.includes(fileExtension)
    );
  };

  // Handle file selection (multiple files)
  const handleFileSelect = (
    selectedFiles: FileList | null,
    type: 'currentJamabandi' | 'ownersId' | 'registryCopy' | 'landMap'
  ) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (isValidFile(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      alert(`Please upload only JPG, GIF, PNG, or JFIF files. Invalid files: ${invalidFiles.join(', ')}`);
    }

    if (validFiles.length > 0) {
      setFiles((prev) => ({
        ...prev,
        [type]: [...prev[type], ...validFiles],
      }));
    }

    // Reset input to allow selecting the same file again
    const refs = {
      currentJamabandi: currentJamabandiRef,
      ownersId: ownersIdRef,
      registryCopy: registryCopyRef,
      landMap: landMapRef,
    };
    if (refs[type].current) {
      refs[type].current.value = '';
    }
  };

  // Handle upload button click
  const handleUploadClick = (type: 'currentJamabandi' | 'ownersId' | 'registryCopy' | 'landMap') => {
    const refs = {
      currentJamabandi: currentJamabandiRef,
      ownersId: ownersIdRef,
      registryCopy: registryCopyRef,
      landMap: landMapRef,
    };
    refs[type].current?.click();
  };

  // Handle file input change
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'currentJamabandi' | 'ownersId' | 'registryCopy' | 'landMap'
  ) => {
    handleFileSelect(e.target.files, type);
  };

  // Remove a specific file
  const handleRemoveFile = (
    type: 'currentJamabandi' | 'ownersId' | 'registryCopy' | 'landMap',
    index: number
  ) => {
    setFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  // Helper component to render document upload section
  const DocumentUploadSection = ({
    title,
    type,
    fileList,
    inputRef,
  }: {
    title: string;
    type: 'currentJamabandi' | 'ownersId' | 'registryCopy' | 'landMap';
    fileList: File[];
    inputRef: React.RefObject<HTMLInputElement | null>;
  }) => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-base text-[#292929] font-[var(--font-open-sans)]">{title}</span>
            {fileList.length > 0 && (
              <span className="text-xs text-gray-500 mt-1 font-[var(--font-open-sans)]">
                {fileList.length} file{fileList.length > 1 ? 's' : ''} uploaded
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={inputRef}
              accept=".jpg,.jpeg,.png,.gif,.jfif,image/jpeg,image/png,image/gif"
              onChange={(e) => handleFileChange(e, type)}
              multiple
              className="hidden"
            />
            <button
              onClick={() => handleUploadClick(type)}
              className="px-6 py-2 rounded-lg bg-[#2E7D32] text-white font-semibold cursor-pointer text-sm font-[var(--font-open-sans)] hover:bg-[#1B5E20] transition-colors"
            >
              {fileList.length > 0 ? 'Add More' : 'Upload'}
            </button>
          </div>
        </div>
        {/* File list */}
        {fileList.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            {fileList.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <svg
                    className="w-5 h-5 text-gray-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-700 font-[var(--font-open-sans)] truncate">{file.name}</span>
                  <span className="text-xs text-gray-500 font-[var(--font-open-sans)] flex-shrink-0">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveFile(type, index)}
                  className="ml-2 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                  title="Remove file"
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
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full px-4 lg:px-8 py-8 bg-white">
      {/* UPLOAD DOCUMENTS Section */}
      <div className="mb-8">
        <h2 className="mb-4 font-bold text-xl leading-[160%] tracking-[0.2px] uppercase text-[#292929] font-[var(--font-open-sans)]">
          UPLOAD DOCUMENTS
        </h2>

        {/* Light green dashed border box */}
        <div className="p-6 rounded-lg border-2 border-dashed bg-[#E8F5E9] border-[#C8E6C9]">
          {/* Document Items */}
          <div className="space-y-6">
            <DocumentUploadSection
              title="Current Jamabandi"
              type="currentJamabandi"
              fileList={files.currentJamabandi}
              inputRef={currentJamabandiRef}
            />

            <DocumentUploadSection
              title="Owners ID"
              type="ownersId"
              fileList={files.ownersId}
              inputRef={ownersIdRef}
            />

            <DocumentUploadSection
              title="Registry Copy"
              type="registryCopy"
              fileList={files.registryCopy}
              inputRef={registryCopyRef}
            />

            <DocumentUploadSection
              title="Land Map"
              type="landMap"
              fileList={files.landMap}
              inputRef={landMapRef}
            />
          </div>
        </div>
      </div>

      {/* FINAL SECTION- NOTE */}
      <div>
        <h2 className="mb-4 font-bold text-xl leading-[160%] tracking-[0.2px] uppercase text-[#292929] font-[var(--font-open-sans)]">
          FINAL SECTION- NOTE
        </h2>

        <div>
          <label className="block mb-2 text-sm text-[#292929] font-[var(--font-open-sans)]">Comments</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#E0E0E0] resize-none bg-[#F5F5F5] text-[#292929] font-[var(--font-open-sans)] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            rows={5}
            placeholder=""
          />
        </div>
      </div>
    </div>
  );
}

