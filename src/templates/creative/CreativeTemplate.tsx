import React, { useContext } from 'react';
import { StateContext } from '../../modules/builder/resume/ResumeLayout';
import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import BasicIntro from '../professional/components/BasicIntro';
import { EducationSection } from '../modern/components/Education';
import { WorkSection } from '../modern/components/Work';
import { SkillsSection } from '../modern/components/Skills';
import { Objective } from '../modern/components/Objective';
import Achievements from '../professional/components/Achievements';

export default function CreativeTemplate() {
  const resumeData = useContext(StateContext);
  const achievements = resumeData.activities?.achievements || [];

  return (
    <div className="bg-gradient-to-r from-gray-200 via-white to-gray-200 p-6 rounded-lg shadow-md">
      <div className="max-w-[1000px] mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Name Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {resumeData.basics?.name || 'Your Name'}
          </h1>
          <p className="text-gray-600">{resumeData.basics?.headline || ''}</p>
        </div>

        {/* Basic Intro */}
        <div className="text-center">
          <BasicIntro basics={resumeData.basics} />
        </div>

        {/* Summary */}
        <SectionValidator value={resumeData.basics.summary}>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
            <p className="text-gray-600">{resumeData.basics.summary}</p>
          </div>
        </SectionValidator>

        {/* Work Experience */}
        <SectionValidator value={resumeData.work}>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
            <WorkSection experience={resumeData.work} />
          </div>
        </SectionValidator>

        {/* Education */}
        <SectionValidator value={resumeData.education}>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Education</h2>
            <EducationSection education={resumeData.education} />
          </div>
        </SectionValidator>

        {/* Skills */}
        <SectionValidator value={resumeData.skills.languages}>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
            <SkillsSection
              title="Skills"
              list={resumeData.skills.languages.concat(resumeData.skills.technologies)}
            />
          </div>
        </SectionValidator>

        {/* Achievements */}
        <SectionValidator value={resumeData.achievements}>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Achievements</h2>
            <Achievements achievements={achievements} />
          </div>
        </SectionValidator>
      </div>
    </div>
  );
}
