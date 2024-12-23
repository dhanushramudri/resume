// src/context/ResumeContext.tsx

import React, { createContext, useContext, useState } from 'react';
import type { ResumeData } from '../types/resume';

interface FormErrors {
  [key: string]: {
    [key: string]: string;
  };
}

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (section: keyof ResumeData, data: any) => void;
  currentStep: string;
  setCurrentStep: (step: StepType) => void;
  resetForm: () => void;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  validateAndNavigate: (nextStep: string | null) => void;
  isSubmitting: boolean;
  submitForm: () => void;
}

const steps = [
  'basics',
  'skills',
  'work',
  'education',
  'activities',
  'volunteer',
  'certifications & awards',
] as const;

export type StepType = (typeof steps)[number];

const initialState: ResumeData = {
  basics: {
    firstName: '',
    lastName: '',
    name: '',
    label: '',
    image: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    college: '',
    specialization: '',
    course: '',
    branch: '',
    passOutYear: '',
    cgpa: '',
    gender: '',
    genderOther: '',
    dateOfBirth: '',
    jobPreferredCountries: [],
    jobPreferredStates: [],
    jobPreferredCities: [],
    location: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
    },
    relExp: '',
    totalExp: '',
    objective: '',
    profiles: [
      {
        network: 'linkedin',
        username: '',
        url: '',
      },
      {
        network: 'github',
        username: '',
        url: '',
      },
    ],
  },
  skills: {
    languages: [],
    frameworks: [],
    technologies: [],
    libraries: [],
    databases: [],
    practices: [],
    tools: [],
  },
  work: [],
  education: [],
  activities: {
    involvements: '',
    achievements: '',
  },
  volunteer: [],
  awards: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialState);
  const [currentStep, setCurrentStep] = useState<StepType>('basics');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateBasics = () => {
    const newErrors: FormErrors = { basics: {} };
    const { basics } = resumeData;

    if (!basics.firstName.trim()) newErrors.basics.firstName = 'First name is required';
    if (!basics.lastName.trim()) newErrors.basics.lastName = 'Last name is required';
    if (!basics.college.trim()) newErrors.basics.college = 'College name is required';
    if (!basics.specialization.trim())
      newErrors.basics.specialization = 'Specialization is required';
    if (!basics.course.trim()) newErrors.basics.course = 'Course is required';
    if (!basics.branch.trim()) newErrors.basics.branch = 'Branch/Stream is required';
    if (!basics.passOutYear.trim()) newErrors.basics.passOutYear = 'Pass-out year is required';
    if (!basics.cgpa.trim()) {
      newErrors.basics.cgpa = 'CGPA/Percentage is required';
    } else {
      const cgpaValue = parseFloat(basics.cgpa);
      if (isNaN(cgpaValue) || (cgpaValue > 10 && cgpaValue > 100) || cgpaValue < 0) {
        newErrors.basics.cgpa = 'Invalid CGPA/Percentage value';
      }
    }
    if (!basics.gender.trim()) newErrors.basics.gender = 'Gender is required';
    if (basics.gender === 'other' && !basics.genderOther.trim()) {
      newErrors.basics.genderOther = 'Please specify gender';
    }
    if (!basics.dateOfBirth.trim()) newErrors.basics.dateOfBirth = 'Date of birth is required';

    // Job preferences validation
    if (!basics.jobPreferredCountries.length) {
      newErrors.basics.jobPreferredCountries = 'Select at least one preferred country';
    } else if (basics.jobPreferredCountries.length > 3) {
      newErrors.basics.jobPreferredCountries = 'Maximum 3 countries allowed';
    }

    if (!basics.jobPreferredStates.length) {
      newErrors.basics.jobPreferredStates = 'Select at least one preferred state';
    } else if (basics.jobPreferredStates.length > 3) {
      newErrors.basics.jobPreferredStates = 'Maximum 3 states allowed';
    }

    if (!basics.jobPreferredCities.length) {
      newErrors.basics.jobPreferredCities = 'Select at least one preferred city';
    } else if (basics.jobPreferredCities.length > 6) {
      newErrors.basics.jobPreferredCities = 'Maximum 6 cities allowed';
    }

    // Existing validations
    if (!basics.label.trim()) newErrors.basics.label = 'Job title is required';
    if (!basics.email.trim()) {
      newErrors.basics.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basics.email)) {
      newErrors.basics.email = 'Invalid email format';
    }
    if (!basics.phone.trim()) newErrors.basics.phone = 'Phone is required';
    if (!basics.summary.trim()) newErrors.basics.summary = 'Summary is required';
    if (!basics.location.city.trim()) newErrors.basics.city = 'City is required';
    if (!basics.relExp.trim()) newErrors.basics.relExp = 'Relevant experience is required';
    if (!basics.totalExp.trim()) newErrors.basics.totalExp = 'Total experience is required';

    // Profile validation
    basics.profiles.forEach((profile, index) => {
      if (!profile.url.trim()) {
        newErrors.basics[`${profile.network}_url`] = `${profile.network} profile URL is required`;
      } else if (!isValidUrl(profile.url)) {
        newErrors.basics[`${profile.network}_url`] = `Invalid ${profile.network} URL format`;
      }
    });

    return Object.keys(newErrors.basics).length === 0 ? null : newErrors;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateSkills = () => {
    const newErrors: FormErrors = { skills: {} };
    const { skills } = resumeData;

    // At least one language is required
    if (skills.languages.length === 0 || !skills.languages[0].name) {
      newErrors.skills.languages = 'At least one programming language is required';
    }

    // At least one framework is required
    if (skills.frameworks.length === 0 || !skills.frameworks[0].name) {
      newErrors.skills.frameworks = 'At least one framework is required';
    }

    return Object.keys(newErrors.skills).length === 0 ? null : newErrors;
  };

  const validateWork = () => {
    const newErrors: FormErrors = { work: {} };
    const { work } = resumeData;
    newErrors.work.experience = 'At least one work experience is required';
    newErrors.work.f = 'f';
    if (!work.length) {
      newErrors.work.experience = 'At least one work experience is required';
    } else {
      work.forEach((exp, index) => {
        if (!exp.name.trim()) newErrors.work[`${index}_company`] = 'Company name is required';
        if (!exp.position.trim()) newErrors.work[`${index}_position`] = 'Position is required';
        if (!exp.startDate.trim()) newErrors.work[`${index}_startDate`] = 'Start date is required';
        if (!exp.isWorkingHere && !exp.endDate?.trim()) {
          newErrors.work[`${index}_endDate`] = 'End date is required';
        }
      });
    }

    return Object.keys(newErrors.work).length === 0 ? null : newErrors;
  };

  const validateEducation = () => {
    const newErrors: FormErrors = { education: {} };
    const { education } = resumeData;

    // At least one education entry is required
    if (education.length === 0) {
      newErrors.education.entry = 'At least one education entry is required';
    } else {
      education.forEach((edu, index) => {
        if (!edu.institution.trim())
          newErrors.education[`${index}_institution`] = 'Institution is required';
        if (!edu.studyType.trim())
          newErrors.education[`${index}_studyType`] = 'Degree type is required';
        if (!edu.area.trim()) newErrors.education[`${index}_area`] = 'Field of study is required';
      });
    }

    return Object.keys(newErrors.education).length === 0 ? null : newErrors;
  };

  const validateSection = (section: StepType) => {
    switch (section) {
      case 'basics':
        return validateBasics();
      case 'skills':
        return validateSkills();
      case 'work':
        return validateWork();
      case 'education':
        return validateEducation();
      default:
        return null;
    }
  };

  const validateAndNavigate = (nextStep: string | null) => {
    const currentErrors = validateSection(currentStep);

    if (currentErrors) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});

    if (nextStep) {
      setCurrentStep(nextStep as StepType);
    } else {
      // This is the final submit
      submitForm();
    }
  };

  const submitForm = () => {
    setIsSubmitting(true);

    // Validate all sections
    for (const step of steps) {
      const stepErrors = validateSection(step);
      if (stepErrors) {
        setErrors(stepErrors);
        setCurrentStep(step);
        setIsSubmitting(false);
        return;
      }
    }

    // If we get here, all sections are valid
    console.log('Form submitted successfully:', resumeData);
    // Here you would typically send the data to your backend

    setIsSubmitting(false);
  };

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
    // Clear errors for the field being updated
    if (errors[section]) {
      setErrors((prev) => ({
        ...prev,
        [section]: {},
      }));
    }
  };

  const resetForm = () => {
    setResumeData(initialState);
    setCurrentStep('basics');
    setErrors({});
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        currentStep,
        setCurrentStep,
        resetForm,
        errors,
        setErrors,
        validateAndNavigate,
        isSubmitting,
        submitForm,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export { steps };
