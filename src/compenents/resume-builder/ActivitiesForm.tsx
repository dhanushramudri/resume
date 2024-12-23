// src/components/resume-builder/ActivitiesForm.tsx

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormNavigation from './FormNavigation';

const ActivitiesForm = () => {
  const { resumeData, updateResumeData } = useResume();
  const { activities } = resumeData;

  const handleChange = (field: 'involvements' | 'achievements', value: string) => {
    updateResumeData('activities', {
      ...activities,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Involvements</label>
        <textarea
          value={activities.involvements}
          onChange={(e) => handleChange('involvements', e.target.value)}
          className="w-full p-2 border rounded h-32"
          placeholder="List your professional involvements..."
        />
        <p className="text-sm text-gray-500 mt-1">
          Use HTML list format: &lt;ul&gt;&lt;li&gt;Your involvement&lt;/li&gt;&lt;/ul&gt;
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Achievements</label>
        <textarea
          value={activities.achievements}
          onChange={(e) => handleChange('achievements', e.target.value)}
          className="w-full p-2 border rounded h-32"
          placeholder="List your achievements..."
        />
        <p className="text-sm text-gray-500 mt-1">
          Use HTML list format: &lt;ul&gt;&lt;li&gt;Your achievement&lt;/li&gt;&lt;/ul&gt;
        </p>
      </div>
      <FormNavigation />
    </div>
  );
};

export default ActivitiesForm;
