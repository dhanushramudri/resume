import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';

import ResumeData from '@/helpers/constants/resume-data.json';
import userDetailsData from '../functions/userDetails';
import { useActivity } from './activity';
import { useAwards } from './awards';
import { useBasicDetails } from './basic';
import { useEducations } from './education';
import { useExperiences } from './experience';
import { useVoluteeringStore } from './volunteering';

export const useResumeStore = () => {
  console.log('user data is ', userDetailsData);
  const resumeData = userDetailsData?.resumeData || ResumeData; // Fallback logic

  return {
    ...resumeData,
    basics: useBasicDetails((state) => state.values),
    work: useExperiences((state) => state.experiences),
    education: useEducations((state) => state.academics),
    awards: useAwards((state) => state.awards),
    volunteer: useVoluteeringStore((state) => state.volunteeredExps),
    skills: {
      languages: useLanguages((state) => state.get()),
      frameworks: useFrameworks((state) => state.get()),
      technologies: useTechnologies((state) => state.get()),
      libraries: useLibraries((state) => state.get()),
      databases: useDatabases((state) => state.get()),
      practices: usePractices((state) => state.get()),
      tools: useTools((state) => state.get()),
    },
    activities: useActivity((state) => state.get()),
  };
};

/**
 * @description Reset all the stores
 */
export const resetResumeStore = () => {
  const resumeData = userDetailsData?.resumeData || ResumeData; // Fallback logic

  useBasicDetails.getState().reset(resumeData.basics);
  useLanguages.getState().reset(resumeData.skills.languages);
  useFrameworks.getState().reset(resumeData.skills.frameworks);
  useLibraries.getState().reset(resumeData.skills.libraries);
  useDatabases.getState().reset(resumeData.skills.databases);
  useTechnologies.getState().reset(resumeData.skills.technologies);
  usePractices.getState().reset(resumeData.skills.practices);
  useTools.getState().reset(resumeData.skills.tools);
  useExperiences.getState().reset(resumeData.work);
  useEducations.getState().reset(resumeData.education);
  useVoluteeringStore.getState().reset(resumeData.volunteer);
  useAwards.getState().reset(resumeData.awards);
  useActivity.getState().reset(resumeData.activities);
};
