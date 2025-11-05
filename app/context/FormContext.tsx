'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Form data types
export interface OwnerDetail {
  name: string;
  age: string;
}

export interface KhasraDetail {
  number: string;
}

export interface FormData {
  // Detail component
  multipleOwnership: 'yes' | 'no' | null;
  ownershipCount: number;
  owners: OwnerDetail[];
  location: string;
  districtState: string;
  multipleKhasra: 'yes' | 'no' | null;
  khasraCount: number;
  khasras: KhasraDetail[];
  villageTehsil: string;
  email: string;
  bhunakshaVerified: string | null;
  ownershipConfirmed: string | null;
  nocsCollected: string | null;
  shareholderCount: number;
  shareholderNames: string[];
  titleSearchCompleted: string | null;
  
  // Due component
  landUseVerified: string | null;
  litigationFound: string | null;
  litigationComments: string;
  taxesPaid: string | null;
  taxesComments: string;
  priorAgreements: string | null;
  
  // Registry component
  tokenBooked: string | null;
  documentsPrepared: string | null;
  registryCompleted: string | null;
  
  // Upload component
  currentJamabandi: File[];
  ownersId: File[];
  registryCopy: File[];
  landMap: File[];
  comments: string;
}

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
}

const initialFormData: FormData = {
  multipleOwnership: null,
  ownershipCount: 0,
  owners: [],
  location: '',
  districtState: '',
  multipleKhasra: null,
  khasraCount: 0,
  khasras: [],
  villageTehsil: '',
  email: '',
  bhunakshaVerified: null,
  ownershipConfirmed: null,
  nocsCollected: null,
  shareholderCount: 0,
  shareholderNames: [],
  titleSearchCompleted: null,
  landUseVerified: null,
  litigationFound: null,
  litigationComments: '',
  taxesPaid: null,
  taxesComments: '',
  priorAgreements: null,
  tokenBooked: null,
  documentsPrepared: null,
  registryCompleted: null,
  currentJamabandi: [],
  ownersId: [],
  registryCopy: [],
  landMap: [],
  comments: '',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    const startTime = Date.now();
    
    try {
      const submissionData = {
        ...formData,
        // Store file names and sizes instead of full files
        currentJamabandiFiles: formData.currentJamabandi.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
        ownersIdFiles: formData.ownersId.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
        registryCopyFiles: formData.registryCopy.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
        landMapFiles: formData.landMap.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
        // Remove File objects from submission (they can't be serialized)
        currentJamabandi: [],
        ownersId: [],
        registryCopy: [],
        landMap: [],
        timestamp: new Date().toISOString(),
      };

      // Submit form data
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await response.json();
      
      // Ensure minimum 2 seconds delay for better UX
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsedTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      // Show success modal
      setShowSuccessModal(true);
      resetForm();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      // Ensure minimum delay even on error
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsedTime);
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      alert(`Failed to submit form: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        submitForm,
        isSubmitting,
        showSuccessModal,
        setShowSuccessModal,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}

