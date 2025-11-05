'use client';
import { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';

export default function Registry() {
  const { formData, updateFormData } = useForm();
  const [tokenBooked, setTokenBooked] = useState<string | null>(formData.tokenBooked);
  const [documentsPrepared, setDocumentsPrepared] = useState<string | null>(formData.documentsPrepared);
  const [registryCompleted, setRegistryCompleted] = useState<string | null>(formData.registryCompleted);

  useEffect(() => {
    updateFormData({
      tokenBooked,
      documentsPrepared,
      registryCompleted,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenBooked, documentsPrepared, registryCompleted]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 pt-4 pb-12">
      {/* Title */}
      <h1
        className="mb-4 text-xl md:text-[20px] font-bold leading-[160%] tracking-[0.2px] uppercase text-[#383C3E]"
        style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
      >
        REGISTRY EXECUTION
      </h1>

      {/* Form Questions */}
      <div className="space-y-6 md:space-y-8">
        {/* Question 1: Token booked for registry */}
        <div className="space-y-2 md:space-y-3">
          <label
            className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black block"
            style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
          >
            Token booked for registry at sub-registrar office?
          </label>
          <div className="flex gap-2 md:gap-100 flex-wrap items-center">
            {['Yes', 'No', 'Scheduled'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTokenBooked(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {tokenBooked === option && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 8L6 11L13 4"
                        stroke="#087E53"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span
                  className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black"
                  style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
                >
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Question 2: Documents prepared & verified */}
        <div className="space-y-2 md:space-y-3">
          <label
            className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black block"
            style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
          >
            Are all required documents prepared & verified? <span className="text-black">*</span>
          </label>
          <div className="flex gap-2 md:gap-100 flex-wrap items-center">
            {['Yes', 'No', 'In Progress'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDocumentsPrepared(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {documentsPrepared === option && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 8L6 11L13 4"
                        stroke="#087E53"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span
                  className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black"
                  style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
                >
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Question 3: Registry completed & deed collected */}
        <div className="space-y-2 md:space-y-3">
          <label
            className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black block"
            style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
          >
            Has registry been completed & deed collected? <span className="text-black">*</span>
          </label>
          <div className="flex gap-2 md:gap-100 flex-wrap items-center">
            {['Yes', 'No', 'In Progress'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRegistryCompleted(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {registryCompleted === option && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 8L6 11L13 4"
                        stroke="#087E53"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span
                  className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black"
                  style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
                >
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

