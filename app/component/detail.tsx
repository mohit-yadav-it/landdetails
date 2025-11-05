'use client';
import { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';

export default function Detail() {
  const { formData, updateFormData } = useForm();
  
  const [multipleOwnership, setMultipleOwnership] = useState<'yes' | 'no' | null>(formData.multipleOwnership);
  const [ownershipCount, setOwnershipCount] = useState<number>(formData.ownershipCount);
  const [multipleKhasra, setMultipleKhasra] = useState<'yes' | 'no' | null>(formData.multipleKhasra);
  const [khasraCount, setKhasraCount] = useState<number>(formData.khasraCount);
  const [owners, setOwners] = useState<Array<{name: string; age: string}>>(formData.owners || []);
  const [khasras, setKhasras] = useState<Array<{number: string}>>(formData.khasras || []);
  
  // New form states
  const [bhunakshaVerified, setBhunakshaVerified] = useState<string | null>(formData.bhunakshaVerified);
  const [ownershipConfirmed, setOwnershipConfirmed] = useState<string | null>(formData.ownershipConfirmed);
  const [nocsCollected, setNocsCollected] = useState<string | null>(formData.nocsCollected);
  const [shareholderCount, setShareholderCount] = useState<number>(formData.shareholderCount);
  const [shareholderNames, setShareholderNames] = useState<string[]>(formData.shareholderNames.length > 0 ? formData.shareholderNames : ['']);
  const [titleSearchCompleted, setTitleSearchCompleted] = useState<string | null>(formData.titleSearchCompleted);
  
  // Sync with context
  useEffect(() => {
    updateFormData({
      multipleOwnership,
      ownershipCount,
      owners,
      multipleKhasra,
      khasraCount,
      khasras,
      bhunakshaVerified,
      ownershipConfirmed,
      nocsCollected,
      shareholderCount,
      shareholderNames,
      titleSearchCompleted,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multipleOwnership, ownershipCount, owners, multipleKhasra, khasraCount, khasras, bhunakshaVerified, ownershipConfirmed, nocsCollected, shareholderCount, shareholderNames, titleSearchCompleted]);

  const handleOwnershipChange = (value: 'yes' | 'no') => {
    setMultipleOwnership(value);
    if (value === 'no') {
      setOwnershipCount(0);
    }
  };

  const handleKhasraChange = (value: 'yes' | 'no') => {
    setMultipleKhasra(value);
    if (value === 'no') {
      setKhasraCount(0);
    }
  };

  const handleOwnershipCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    setOwnershipCount(Math.max(0, count));
    // Initialize owners array
    setOwners(Array.from({ length: count }, (_, i) => owners[i] || { name: '', age: '' }));
  };

  const handleKhasraCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    setKhasraCount(Math.max(0, count));
    // Initialize khasras array
    setKhasras(Array.from({ length: count }, (_, i) => khasras[i] || { number: '' }));
  };

  const handleShareholderCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    setShareholderCount(Math.max(0, count));
    setShareholderNames(Array.from({ length: Math.max(0, count) }, (_, i) => shareholderNames[i] || ''));
  };

  const handleShareholderNameChange = (index: number, value: string) => {
    const newNames = [...shareholderNames];
    newNames[index] = value;
    setShareholderNames(newNames);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4  pb-12">
      {/* Title */}
      <h1 className="mb-4 text-xl md:text-[30px] font-bold leading-[160%] tracking-[0.2px] text-center uppercase text-black" style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}>
        LAND DETAILS FORM
      </h1>

      {/* Subtitle */}
      <p className="mb-8 text-sm md:text-base font-normal leading-[160%] tracking-[0.3px] text-center text-black" style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif' }}>
        Please fill in the complete land details below to help us verify your <br className="hidden md:block" />property quickly and ensure a smooth listing experience.
      </p>

      {/* Form Container - Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {/* Left Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Multiple Ownership Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <label className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                Multiple ownership
              </label>
              
              <button
                type="button"
                onClick={() => handleOwnershipChange('yes')}
                className={`px-3 py-1 transition-colors text-sm md:text-base font-normal tracking-[0.5px] bg-transparent cursor-pointer rounded ${
                  multipleOwnership === 'yes' ? 'text-green-600 border-2 border-green-600' : 'text-gray-600 border-2 border-gray-400 hover:text-gray-800 hover:border-gray-600'
                }`}
                style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
              >
                Yes
              </button>
              
              {multipleOwnership === 'yes' && (
                <>
                  <span className="text-sm md:text-base font-normal tracking-[0.5px] text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                    Enter no
                  </span>
                  <div className="relative inline-block w-[100px]">
                    <input
                      type="number"
                      min="0"
                      value={ownershipCount || ''}
                      onChange={handleOwnershipCountChange}
                      className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                      style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
                  </div>
                </>
              )}
              
              <button
                type="button"
                onClick={() => handleOwnershipChange('no')}
                className={`px-3 py-1 transition-colors text-sm md:text-base font-normal tracking-[0.5px] bg-transparent cursor-pointer rounded ${
                  multipleOwnership === 'no' ? 'text-gray-800 border-2 border-gray-800' : 'text-gray-600 border-2 border-gray-400 hover:text-gray-800 hover:border-gray-600'
                }`}
                style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
              >
                No
              </button>
            </div>

            {/* Owner Details - Dynamic based on count */}
            {ownershipCount > 0 && Array.from({ length: ownershipCount }).map((_, index) => (
              <div key={index} className="flex items-start gap-4 flex-wrap">
                <div className="space-y-1">
                  <label className="block text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                    Enter Name
                  </label>
                  <div className="relative w-[200px]">
                    <input
                      type="text"
                      value={owners[index]?.name || ''}
                      onChange={(e) => {
                        const newOwners = [...owners];
                        newOwners[index] = { ...newOwners[index], name: e.target.value };
                        setOwners(newOwners);
                      }}
                      className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                      style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                    Age
                  </label>
                  <div className="relative w-[150px]">
                    <select
                      value={owners[index]?.age || ''}
                      onChange={(e) => {
                        const newOwners = [...owners];
                        newOwners[index] = { ...newOwners[index], age: e.target.value };
                        setOwners(newOwners);
                      }}
                      className="w-full outline-none bg-transparent pb-1 appearance-none pr-6 cursor-pointer text-sm md:text-base tracking-[0.5px] border-none"
                      style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
                    >
                      <option value="">Age</option>
                      {Array.from({ length: 100 }, (_, i) => i + 1).map(age => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
                    <div
                      className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none pr-1"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 4L6 8L10 4"
                          stroke="#737B7D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="block text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
              Location
            </label>
            <div className="relative max-w-[516px]">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateFormData({ location: e.target.value })}
                className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
              />
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
            </div>
          </div>

          {/* District & State */}
          <div className="space-y-1">
            <label className="block text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
              District & State
            </label>
            <div className="relative max-w-[516px]">
              <input
                type="text"
                value={formData.districtState}
                onChange={(e) => updateFormData({ districtState: e.target.value })}
                className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
              />
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Multiple Khasra/Khata Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <label className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                Multiple Khasra/Khata
              </label>
              
              <button
                type="button"
                onClick={() => handleKhasraChange('yes')}
                className={`px-3 py-1 transition-colors text-sm md:text-base font-normal tracking-[0.5px] bg-transparent cursor-pointer rounded ${
                  multipleKhasra === 'yes' ? 'text-green-600 border-2 border-green-600' : 'text-gray-600 border-2 border-gray-400 hover:text-gray-800 hover:border-gray-600'
                }`}
                style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
              >
                Yes
              </button>
              
              {multipleKhasra === 'yes' && (
                <>
                  <span className="text-sm md:text-base font-normal tracking-[0.5px] text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                    Enter no
                  </span>
                  <div className="relative inline-block w-[100px]">
                    <input
                      type="number"
                      min="0"
                      value={khasraCount || ''}
                      onChange={handleKhasraCountChange}
                      className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                      style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
                  </div>
                </>
              )}
              
              <button
                type="button"
                onClick={() => handleKhasraChange('no')}
                className={`px-3 py-1 transition-colors text-sm md:text-base font-normal tracking-[0.5px] bg-transparent cursor-pointer rounded ${
                  multipleKhasra === 'no' ? 'text-gray-800 border-2 border-gray-800' : 'text-gray-600 border-2 border-gray-400 hover:text-gray-800 hover:border-gray-600'
                }`}
                style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
              >
                No
              </button>
            </div>

            {/* Khasra/Khata Number - Dynamic based on count */}
            {khasraCount > 0 && Array.from({ length: khasraCount }).map((_, index) => (
              <div key={index} className="space-y-1">
                <label className="block text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                  Khasra/Khata Number
                </label>
                <div className="relative w-[200px]">
                  <input
                    type="text"
                    value={khasras[index]?.number || ''}
                    onChange={(e) => {
                      const newKhasras = [...khasras];
                      newKhasras[index] = { number: e.target.value };
                      setKhasras(newKhasras);
                    }}
                    className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                    style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
                </div>
              </div>
            ))}
          </div>

          {/* Village & Tehsil */}
          <div className="space-y-1">
            <label className="block text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
              Village & Tehsil
            </label>
            <div className="relative max-w-[516px]">
              <input
                type="text"
                value={formData.villageTehsil}
                onChange={(e) => updateFormData({ villageTehsil: e.target.value })}
                className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
              />
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
              Email
            </label>
            <div className="relative max-w-[516px]">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
              />
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
            </div>
          </div>
        </div>
      </div>

      {/* New Verification Form Section */}
      <div className="mt-8 space-y-6">
        {/* Question 1: Bhunaksha map verification */}
        <div className="space-y-2">
          <label className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
            Have you verified Bhunaksha map & Jamabandi? <span className="text-black">*</span>
          </label>
          <div className="flex gap-2 md:gap-100 flex-wrap items-center">
            {['Yes', 'No', 'Pending'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBhunakshaVerified(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {bhunakshaVerified === option && (
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
                <span className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Question 2: Ownership & mutation status */}
        <div className="space-y-2">
          <label className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
            Is ownership & mutation status confirmed? <span className="text-black">*</span>
          </label>
          <div className="flex gap-2 md:gap-100 flex-wrap items-center">
            {['Yes', 'No', 'Pending'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOwnershipConfirmed(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {ownershipConfirmed === option && (
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
                <span className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Question 3: NOCs collected */}
        <div className="space-y-2">
          <label className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
            NOCs collected from all co-owners? <span className="text-black">*</span>
          </label>
          <div className="flex gap-2 md:gap-50 flex-wrap items-center">
            {['Yes', 'No', 'In Progress', 'Not applicable'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNocsCollected(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {nocsCollected === option && (
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
                <span className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Question 4: Total number of shareholders */}
        <div className="space-y-4">
          <label className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
            Total number of shareholders identified <span className="text-black">*</span>
          </label>
          <input
            type="number"
            min="0"
            value={shareholderCount || ''}
            onChange={handleShareholderCountChange}
            placeholder="Enter number"
            className="outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
            style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
          />
          <div className="w-[516px] max-w-full h-px bg-[#737B7D] opacity-100" />
          
          {/* Dynamic Name fields */}
          {shareholderCount > 0 && Array.from({ length: shareholderCount }).map((_, index) => (
            <div key={index} className="space-y-1">
              <label className="block text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
                Name
              </label>
              <div className="relative max-w-[516px]">
                <input
                  type="text"
                  value={shareholderNames[index] || ''}
                  onChange={(e) => handleShareholderNameChange(index, e.target.value)}
                  className="w-full outline-none bg-transparent pb-1 text-sm md:text-base tracking-[0.5px] border-none"
                  style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}
                />
                <div className="absolute bottom-0 left-0 w-full h-px bg-[#737B7D] opacity-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Question 5: 52-year title search */}
        <div className="space-y-2">
          <label className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
            52-year title search completed? <span className="text-black">*</span>
          </label>
          <div className="flex gap-2 md:gap-100 flex-wrap items-center">
            {['Yes', 'No', 'In Progress'].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTitleSearchCompleted(option)}
                  className="flex items-center justify-center transition-colors w-[45px] h-6 border border-[#087E53] rounded-lg bg-transparent cursor-pointer p-0"
                >
                  {titleSearchCompleted === option && (
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
                <span className="text-sm md:text-base font-normal leading-[160%] tracking-[0.5px] align-middle text-black" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
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

