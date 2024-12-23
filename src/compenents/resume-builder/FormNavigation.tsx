import React, { useState } from 'react';
import { useResume, steps } from '../../context/ResumeContext';
import type { StepType } from '../../context/ResumeContext';
import { useUser } from '@clerk/nextjs';
import userDetailsData from '../../functions/userDetails.js';
import DomainPage from '@/pages/domain';

const FormNavigation = () => {
  const { currentStep, validateAndNavigate, isSubmitting, resumeData } = useResume();
  const { isLoaded, user } = useUser();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const currentIndex = steps.indexOf(currentStep as StepType);
  const isLastStep = currentIndex === steps.length - 1;
  const nextStep = isLastStep ? null : steps[currentIndex + 1];

  // Call getUserDetails() here to access the stored user data
  console.log('Fetched user details from localstorage:', userDetailsData); // You can use this for further logic if needed

  const handleSubmit = async () => {
    if (!isLoaded || !user) {
      console.error('User not loaded or not authenticated');
      return;
    }

    try {
      // First request: Update user form status
      const userResponse = await fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          filledForm: true,
        }),
      });

      if (!userResponse.ok) {
        throw new Error('Failed to update user status');
      }

      // Second request: Save user details
      const userDetailsResponse = await fetch('http://localhost:5000/user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          filledForm: true,
          resumeData, // Assuming resumeData is defined and holds the resume content
        }),
      });

      if (!userDetailsResponse.ok) {
        throw new Error('Failed to save user details');
      }

      // Retrieve response data after the successful POST request
      const data = await userDetailsResponse.json();
      console.log('Resume data saved successfully:', data);
      setFormSubmitted(true);

      // Handle successful submission (e.g., show success message, redirect, etc.)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message)
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      validateAndNavigate(nextStep);
    }
  };

  // If form is submitted, display DomainPage
  if (formSubmitted) {
    return <DomainPage />; // Display the DomainPage component
  }

  return (
    <div className="flex justify-end space-x-4 mt-8">
      {isLastStep ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Resume'}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Next: {nextStep ? nextStep.charAt(0).toUpperCase() + nextStep.slice(1) : ''}
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
