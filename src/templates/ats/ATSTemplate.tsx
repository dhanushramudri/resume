import { StateContext } from '../../modules/builder/resume/ResumeLayout';
import { WorkSection } from '../modern/components/Work';
import { SkillsSection } from '../modern/components/Skills';
import { useContext } from 'react';
import { SectionValidator } from '../../helpers/common/components/ValidSectionRenderer';
import { EducationSection } from '../modern/components/Education';
import { Objective } from '../modern/components/Objective';
import Achievements from '../professional/components/Achievements';
import Involvement from '../professional/components/Involvement'; // Added Involvement component

// Use the StateContext for managing the resume state
export default function ATSTemplate() {
  const resumeData = useContext(StateContext) || {};

  const skills = resumeData.skills || {
    languages: [],
    frameworks: [],
    libraries: [],
    technologies: [],
    tools: [],
  };

  const involvements = resumeData.activities?.involvements || []; // Use activities from resumeData
  const achievements = resumeData.achievements || [];

  return (
    <div className=" p-8 max-w-[1000px] mx-auto rounded-lg shadow-xl">
      {/* Header Section */}
      <div>
        {/* Personal Information */}
        <h1 className="text-2xl font-semibold">{resumeData.basics?.name || ''}</h1>
        {/* You can add contact details here */}
      </div>

      <div className="flex flex-col md:flex-row space-y-8 md:space-x-8">
        {/* Left Column */}
        <div className="md:w-2/3 space-y-8">
          {/* Objective Section */}
          <SectionValidator value={resumeData.objective}>
            <Section title="Career Objective">
              <Objective objective={resumeData.objective || ''} />
            </Section>
          </SectionValidator>

          {/* Education Section */}
          <SectionValidator value={resumeData.education}>
            <Section title="Education">
              <EducationSection education={resumeData.education || []} />
            </Section>
          </SectionValidator>

          {/* Work Experience Section */}
          <SectionValidator value={resumeData.work}>
            <Section title="Work Experience">
              <WorkSection experience={resumeData.work || []} />
            </Section>
          </SectionValidator>

          {/* Key Projects / Involvements Section */}
          <SectionValidator value={involvements}>
            <Section title="Key Projects / Involvements">
              <Involvement data={involvements} />
            </Section>
          </SectionValidator>
        </div>

        {/* Right Column */}
        <div className="md:w-1/3 space-y-8">
          {/* Technical Skills Section */}
          <SectionValidator value={[...skills.languages, ...skills.frameworks]}>
            <Section title="Languages & Frameworks">
              <SkillsSection list={[...skills.languages, ...skills.frameworks]} />
            </Section>
          </SectionValidator>

          <SectionValidator value={[...skills.technologies, ...skills.libraries]}>
            <Section title="Technologies & Libraries">
              <SkillsSection list={[...skills.technologies, ...skills.libraries]} />
            </Section>
          </SectionValidator>

          <SectionValidator value={skills.tools}>
            <Section title="Tools">
              <SkillsSection list={skills.tools} />
            </Section>
          </SectionValidator>

          {/* Achievements Section */}
          <SectionValidator value={achievements}>
            <Section title="Certificates and Awards">
              <Achievements data={achievements} />
            </Section>
          </SectionValidator>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
