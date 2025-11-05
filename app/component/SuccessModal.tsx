'use client';

import { useEffect } from 'react';
import { useForm } from '../context/FormContext';

export default function SuccessModal() {
  const { showSuccessModal, setShowSuccessModal } = useForm();

  // Close modal when clicking outside
  useEffect(() => {
    if (showSuccessModal) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowSuccessModal(false);
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showSuccessModal, setShowSuccessModal]);

  if (!showSuccessModal) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn"
      onClick={() => setShowSuccessModal(false)}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setShowSuccessModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
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

        {/* Content */}
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h2
            className="text-2xl font-bold text-gray-900 mb-3"
            style={{
              fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
            }}
          >
            Thank You!
          </h2>

          {/* Message */}
          <p
            className="text-gray-600 mb-6 leading-relaxed"
            style={{
              fontFamily: 'var(--font-inter), "Inter", sans-serif',
            }}
          >
            Thank you for submitting the form. Your data has been successfully Saved.
          </p>

          {/* Close Button */}
          <button
            onClick={() => setShowSuccessModal(false)}
            className="w-full bg-[#087E53] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#066943] transition-colors focus:outline-none focus:ring-2 focus:ring-[#087E53] focus:ring-offset-2"
            style={{
              fontFamily: 'var(--font-inter), "Inter", sans-serif',
            }}
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

