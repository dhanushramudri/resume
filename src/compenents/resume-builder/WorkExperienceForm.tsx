import React from 'react';
import { useResume } from '../../context/ResumeContext';
import type { Work } from '../../types/resume';
import FormNavigation from './FormNavigation';

const WorkExperienceForm = () => {
  const { resumeData, updateResumeData, errors } = useResume();
  const { work } = resumeData;
  const formErrors = errors.work || {};

  const addWorkExperience = () => {
    const newWork: Work = {
      id: Date.now().toString(),
      name: '',
      position: '',
      url: '',
      startDate: '',
      endDate: '',
      isWorkingHere: false,
      summary: '',
      highlights: [],
      years: '',
    };
    updateResumeData('work', [...work, newWork]);
  };

  const updateWorkExperience = (index: number, field: keyof Work, value: any) => {
    const updatedWork = [...work];
    updatedWork[index] = { ...updatedWork[index], [field]: value };
    updateResumeData('work', updatedWork);
  };

  const renderFieldError = (fieldName: string) => {
    return formErrors[fieldName] ? (
      <p className="text-red-500 text-sm mt-1">{formErrors[fieldName]}</p>
    ) : null;
  };

  return (
    <>
      <div className="space-y-6">
        {work.map((job, index) => (
          <div key={job.id} className="p-4 border rounded space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                value={job.name}
                onChange={(e) => updateWorkExperience(index, 'name', e.target.value)}
                className="w-full p-2 border rounded"
              />
              {renderFieldError('name')}
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium mb-1">Position</label>
              <input
                type="text"
                value={job.position}
                onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                className="w-full p-2 border rounded"
              />
              {renderFieldError('position')}
            </div>

            {/* Company URL */}
            <div>
              <label className="block text-sm font-medium mb-1">Company URL</label>
              <input
                type="text"
                value={job.url}
                onChange={(e) => updateWorkExperience(index, 'url', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="https://example.com"
              />
              {renderFieldError('url')}
            </div>

            {/* Start and End Date */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="text"
                  value={job.startDate}
                  onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="MM/YYYY"
                />
                {renderFieldError('startDate')}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="text"
                  value={job.endDate || ''}
                  onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="MM/YYYY"
                  disabled={job.isWorkingHere}
                />
                {renderFieldError('endDate')}
              </div>
            </div>

            {/* Currently Working Checkbox */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={job.isWorkingHere}
                  onChange={(e) => updateWorkExperience(index, 'isWorkingHere', e.target.checked)}
                />
                <span className="text-sm">Currently working here</span>
              </label>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium mb-1">Summary</label>
              <textarea
                value={job.summary}
                onChange={(e) => updateWorkExperience(index, 'summary', e.target.value)}
                className="w-full p-2 border rounded h-32"
              />
              {renderFieldError('summary')}
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-sm font-medium mb-1">Highlights</label>
              <textarea
                value={job.highlights.join('\n')}
                onChange={(e) =>
                  updateWorkExperience(index, 'highlights', e.target.value.split('\n'))
                }
                className="w-full p-2 border rounded h-24"
                placeholder="Enter one highlight per line"
              />
              {renderFieldError('highlights')}
            </div>

            {/* Total Years */}
            <div>
              <label className="block text-sm font-medium mb-1">Total Years</label>
              <input
                type="text"
                value={job.years}
                onChange={(e) => updateWorkExperience(index, 'years', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g., 2 years"
              />
              {renderFieldError('years')}
            </div>
          </div>
        ))}
        <button onClick={addWorkExperience} className="text-blue-500 hover:text-blue-600">
          + Add Work Experience
        </button>
      </div>
      <FormNavigation />
    </>
  );
};

export default WorkExperienceForm;
