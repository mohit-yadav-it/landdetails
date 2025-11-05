'use client';
import { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';

export default function Due() {
  const { formData, updateFormData } = useForm();
  const [landUseVerified, setLandUseVerified] = useState<string | null>(formData.landUseVerified);
  const [litigationFound, setLitigationFound] = useState<string | null>(formData.litigationFound);
  const [litigationComments, setLitigationComments] = useState<string>(formData.litigationComments);
  const [taxesPaid, setTaxesPaid] = useState<string | null>(formData.taxesPaid);
  const [taxesComments, setTaxesComments] = useState<string>(formData.taxesComments);
  const [priorAgreements, setPriorAgreements] = useState<string | null>(formData.priorAgreements);

  useEffect(() => {
    updateFormData({
      landUseVerified,
      litigationFound,
      litigationComments,
      taxesPaid,
      taxesComments,
      priorAgreements,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landUseVerified, litigationFound, litigationComments, taxesPaid, taxesComments, priorAgreements]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 pt-4 pb-12">
      {/* Title */}
      <h1
        className="mb-4 text-xl md:text-[20px] font-bold leading-[160%] tracking-[0.2px] uppercase text-[#383C3E]"
        style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}
      >
        DUE DILIGENCE
      </h1>

      {/* Form Questions */}
      <div className="space-y-6 md:space-y-8">
        {/* Question 1: Land use/zoning verified */}
        <div className="space-y-2 md:space-y-3">
          <label
            className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black block"
            style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
          >
            Is Land use/zoning verified with town planning office?
          </label>
          <div className="flex gap-2 md:gap-100 flex-wrap items-center">
            {['Yes', 'No', 'In Progress'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLandUseVerified(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {landUseVerified === option && (
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

        {/* Question 2: Litigation or court cases */}
        <div className="space-y-2 md:space-y-3">
          <label
            className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black block"
            style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
          >
            Any Litigation or court cases found? <span className="text-black">*</span>
          </label>
          <div className="flex gap-2 md:gap-90 flex-wrap items-center">
            {['No', 'Yes-Ongoing', 'Yes-Resolved'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLitigationFound(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {litigationFound === option && (
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
          {/* Comments field */}
          <div className="space-y-1 mt-4">
            <label
              className="block text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black"
              style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
            >
              Comments
            </label>
            <div className="relative max-w-[516px]">
              <input
                type="text"
                value={litigationComments}
                onChange={(e) => setLitigationComments(e.target.value)}
                className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
              />
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
            </div>
          </div>
        </div>

        {/* Question 3: Land revenue & property taxes */}
        <div className="space-y-2 md:space-y-3">
          <label
            className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black block"
            style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
          >
            Are land revenue & property taxes fully paid? <span className="text-black">*</span>
          </label>
          <div className="flex gap-2 md:gap-100 flex-wrap items-center">
            {['Yes', 'No', 'Need Verification'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTaxesPaid(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {taxesPaid === option && (
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
          {/* Comments field */}
          <div className="space-y-1 mt-4">
            <label
              className="block text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black"
              style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
            >
              Comments
            </label>
            <div className="relative max-w-[516px]">
              <input
                type="text"
                value={taxesComments}
                onChange={(e) => setTaxesComments(e.target.value)}
                className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
              />
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
            </div>
          </div>
        </div>

        {/* Question 4: Prior Kachchi Registry or sale agreements */}
        <div className="space-y-2 md:space-y-3">
          <label
            className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black block"
            style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
          >
            Any prior Kachchi Registry or sale agreements found? <span className="text-black">*</span>
          </label>
          <div className="flex gap-2 md:gap-90 flex-wrap items-center">
            {['Yes-Verified', 'Yes-Needs Action', 'No'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPriorAgreements(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {priorAgreements === option && (
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

