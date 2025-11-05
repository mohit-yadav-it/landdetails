'use client';

import { useForm } from '../context/FormContext';

export default function Disclaimer() {
  const { submitForm, isSubmitting } = useForm();

  const handleSubmit = async () => {
    await submitForm();
  };

  return (
    <section className="w-full bg-white flex flex-col items-center">
      {/* Container */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-8 pb-8 px-4">
        {/* Title */}
        <h2
          className="font-bold text-xl leading-[160%] tracking-[0.2px] text-center uppercase text-black"
          style={{
            fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
          }}
        >
          DISCLAIMER
        </h2>

        {/* Content */}
        <p
          className="max-w-3xl font-normal text-base leading-[160%] tracking-[0.5px] text-center align-middle text-black"
          style={{
            fontFamily: 'var(--font-inter), "Inter", sans-serif',
          }}
        >
          The information provided in this form has been collected from publicly available online sources and is intended for preliminary reference only. While every effort has been made to ensure accuracy, the data may contain errors or omissions. Users are advised to independently verify all details through official government records or authorized sources before making any decisions based on this information.
        </p>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`flex items-center justify-center gap-2 h-9 bg-[#087E53] rounded-[20px] border-none cursor-pointer font-normal text-base leading-[160%] tracking-[0.5px] text-center align-middle text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-[#066943] active:scale-95 px-6 ${isSubmitting ? 'min-w-[160px]' : 'w-[137px]'}`}
          style={{
            fontFamily: 'var(--font-inter), "Inter", sans-serif',
          }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>

      {/* Bottom Border Bar */}
      <div className="w-full mt-8 h-[47px] bg-[#087E53]" />
    </section>
  );
}

