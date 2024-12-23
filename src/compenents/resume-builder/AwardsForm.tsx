// src/components/resume-builder/AwardsForm.tsx

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import type { Award } from '../../types/resume';
import FormNavigation from './FormNavigation';

const AwardsForm = () => {
  const { resumeData, updateResumeData } = useResume();
  const { awards } = resumeData;

  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      title: '',
      date: '',
      awarder: '',
      summary: '',
    };
    updateResumeData('awards', [...awards, newAward]);
  };

  const updateAward = (index: number, field: keyof Award, value: string) => {
    const updatedAwards = [...awards];
    updatedAwards[index] = { ...updatedAwards[index], [field]: value };
    updateResumeData('awards', updatedAwards);
  };

  const removeAward = (index: number) => {
    const updatedAwards = awards.filter((_, i) => i !== index);
    updateResumeData('awards', updatedAwards);
  };

  return (
    <div className="space-y-6">
      {awards.map((award, index) => (
        <div key={award.id} className="p-4 border rounded space-y-4 relative">
          <button
            onClick={() => removeAward(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            title="Remove award"
          >
            ×
          </button>

          <div>
            <label className="block text-sm font-medium mb-1">Award Title</label>
            <input
              type="text"
              value={award.title}
              onChange={(e) => updateAward(index, 'title', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Name of the award"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Awarder</label>
            <input
              type="text"
              value={award.awarder}
              onChange={(e) => updateAward(index, 'awarder', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Organization that gave the award"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="text"
              value={award.date}
              onChange={(e) => updateAward(index, 'date', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="YYYY-MM-DD"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              value={award.summary}
              onChange={(e) => updateAward(index, 'summary', e.target.value)}
              className="w-full p-2 border rounded h-32"
              placeholder="Describe the award and its significance..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Use bullet points starting with * for multiple points
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={addAward}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
      >
        + Add Award or Certification
      </button>
      <FormNavigation />
    </div>
  );
};

export default AwardsForm;
