import React, { useContext } from 'react';

import { VolunteerSection } from '../modern/components/Volunteer';
import { SummarySection } from '../modern/components/Summary';
import { AwardSection } from '../modern/components/Awards';

import { StateContext } from '../../modules/builder/resume/ResumeLayout';
import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import BasicIntro from '../professional/components/BasicIntro';
import { EducationSection } from '../modern/components/Education';
import { WorkSection } from '../modern/components/Work';
import { SkillsSection } from '../modern/components/Skills';
import { Objective } from '../modern/components/Objective';

export default function DeedyTemplate() {
  const resumeData = useContext(StateContext);

  return (
    <div className="p-2">
      {/* Name Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {resumeData.basics?.name || 'Your Name'}
        </h1>
        <p className="text-gray-600">{resumeData.basics?.headline || ''}</p>
      </div>

      {/* Pass the entire basics object to BasicIntro */}
      <BasicIntro basics={resumeData.basics} />

      <div className="flex">
        <div className="basis-[60%] p-3">
          <SectionValidator value={resumeData.basics.summary}>
            <SummarySection summary={resumeData.basics.summary} />
          </SectionValidator>

          <SectionValidator value={resumeData.work}>
            <WorkSection experience={resumeData.work} />
          </SectionValidator>

          <SectionValidator value={resumeData.awards}>
            <AwardSection awardsReceived={resumeData.awards} />
          </SectionValidator>
        </div>

        <div className="basis-[40%] p-3">
          <SectionValidator value={resumeData.basics.objective}>
            <Objective objective={resumeData.basics.objective} />
          </SectionValidator>

          <SectionValidator value={resumeData.skills.languages}>
            <SkillsSection title="Languages" list={resumeData.skills.languages} />
          </SectionValidator>

          <SectionValidator value={resumeData.skills.technologies}>
            <SkillsSection title="Technologies" list={resumeData.skills.technologies} />
          </SectionValidator>

          <SectionValidator value={resumeData.skills.frameworks}>
            <SkillsSection
              title="Frameworks & Libraries"
              list={resumeData.skills.frameworks.concat(resumeData.skills.libraries)}
            />
          </SectionValidator>

          <SectionValidator value={resumeData.skills.tools}>
            <SkillsSection title="Tools" list={resumeData.skills.tools} />
          </SectionValidator>

          <SectionValidator value={resumeData.education}>
            <EducationSection education={resumeData.education} />
          </SectionValidator>

          <SectionValidator value={resumeData.volunteer}>
            <VolunteerSection volunteer={resumeData.volunteer} />
          </SectionValidator>
        </div>
      </div>
    </div>
  );
}
