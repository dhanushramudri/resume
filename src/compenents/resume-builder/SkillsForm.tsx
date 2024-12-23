// src/components/resume-builder/SkillsForm.tsx

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import type { Skills } from '../../types/resume';
import FormNavigation from './FormNavigation';

const SkillsForm = () => {
  const { resumeData, updateResumeData, errors } = useResume();
  const { skills } = resumeData;
  const formErrors = errors.skills || {};

  const handleSkillChange = (category: keyof Skills, index: number, value: string) => {
    const updatedSkills = { ...skills };
    updatedSkills[category][index].name = value;
    updateResumeData('skills', updatedSkills);
  };

  const addSkill = (category: keyof Skills) => {
    const updatedSkills = { ...skills };
    updatedSkills[category] = [...skills[category], { name: '', level: 1 }];
    updateResumeData('skills', updatedSkills);
  };

  const renderFieldError = (fieldName: string) => {
    return formErrors[fieldName] ? (
      <p className="text-red-500 text-sm mt-1">{formErrors[fieldName]}</p>
    ) : null;
  };

  return (
    <div className="space-y-6">
      {(Object.keys(skills) as Array<keyof Skills>).map((category) => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-medium capitalize">{category}</h3>
          {renderFieldError(category)}
          {skills[category].map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillChange(category, index, e.target.value)}
                className="w-full p-2 border rounded"
                placeholder={`Add ${category} skill`}
              />
            </div>
          ))}
          <button onClick={() => addSkill(category)} className="text-blue-500 hover:text-blue-600">
            + Add {category.slice(0, -1)}
          </button>
        </div>
      ))}
      <FormNavigation />
    </div>
  );
};

export default SkillsForm;
