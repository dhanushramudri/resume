import React, { useContext } from 'react';
import { StateContext } from '../../modules/builder/resume/ResumeLayout';
import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import BasicIntro from '../professional/components/BasicIntro';
import { EducationSection } from '../modern/components/Education';
import { WorkSection } from '../modern/components/Work';
import { SkillsSection } from '../modern/components/Skills';
import { Objective } from '../modern/components/Objective';

export default function MinimalistTemplate() {
  const resumeData = useContext(StateContext);

  if (!resumeData || !resumeData.basics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-[700px] mx-auto h-auto">
      {/* Render the BasicIntro component with the name and other basics */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">{resumeData.basics.name}</h1>
        {resumeData.basics.label && <p className="text-lg">{resumeData.basics.label}</p>}
        {resumeData.basics.location?.city && (
          <p className="text-sm text-gray-600">{resumeData.basics.location.city}</p>
        )}
        {resumeData.basics.phone && <p className="text-sm">{resumeData.basics.phone}</p>}
        {resumeData.basics.email && <p className="text-sm">{resumeData.basics.email}</p>}
      </div>

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
  );
}
