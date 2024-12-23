import React, { useContext } from 'react';
import { StateContext } from '../../modules/builder/resume/ResumeLayout';
import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import BasicIntro from '../professional/components/BasicIntro';
import { EducationSection } from '../modern/components/Education';
import { WorkSection } from '../modern/components/Work';
import { SkillsSection } from '../modern/components/Skills';
import { Objective } from '../modern/components/Objective';

export default function ElegantTemplate() {
  const resumeData = useContext(StateContext);

  // Ensure that resumeData and basics are available
  if (!resumeData || !resumeData.basics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-6 max-w-[1000px] mx-auto">
      {/* Left column: Basic Info */}
      <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        {/* Displaying the Name */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">{resumeData.basics.name}</h1>
        </div>

        <BasicIntro basics={resumeData.basics} />

        <SectionValidator value={resumeData.skills.languages}>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Skills</h2>
            <SkillsSection
              title="Skills"
              list={resumeData.skills.languages.concat(resumeData.skills.technologies)}
            />
          </div>
        </SectionValidator>

        <SectionValidator value={resumeData.education}>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Education</h2>
            <EducationSection education={resumeData.education} />
          </div>
        </SectionValidator>
      </div>

      {/* Right column: Sections like Summary, Objective, Work Experience */}
      <div className="col-span-2 bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
        <SectionValidator value={resumeData.basics.summary}>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Summary</h2>
            <p>{resumeData.basics.summary}</p>
          </div>
        </SectionValidator>

        <SectionValidator value={resumeData.basics.objective}>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Objective</h2>
            <Objective objective={resumeData.basics.objective} />
          </div>
        </SectionValidator>

        <SectionValidator value={resumeData.work}>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Work Experience</h2>
            <WorkSection experience={resumeData.work} />
          </div>
        </SectionValidator>
      </div>
    </div>
  );
}
