export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Location {
  address?: string;
  postalCode?: string;
  city: string;
  countryCode?: string;
  region?: string;
}

export interface Basics {
  firstName: string;
  lastName: string;
  name: string; // Will be computed from firstName + lastName
  label: string;
  email: string;
  image: string;
  phone: string;
  url: string;
  summary: string;
  college: string;
  specialization: string;
  course: string;
  branch: string;
  passOutYear: string;
  cgpa: string;
  gender: '' | 'male' | 'female' | 'other';
  genderOther: string;
  dateOfBirth: string;
  jobPreferredCountries: string[];
  jobPreferredStates: string[];
  jobPreferredCities: string[];
  location: Location;
  relExp: string;
  totalExp: string;
  objective: string;
  profiles: Profile[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface Skills {
  languages: Skill[];
  frameworks: Skill[];
  technologies: Skill[];
  libraries: Skill[];
  databases: Skill[];
  practices: Skill[];
  tools: Skill[];
}

export interface Work {
  id: string;
  name: string;
  position: string;
  url?: string;
  startDate: string;
  endDate: string | null;
  isWorkingHere: boolean;
  summary: string;
  highlights?: string[];
  years?: string; // Added
}

export interface Education {
  id: string;
  institution: string;
  url?: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
  isStudyingHere: boolean; // Added
  score: string;
  courses?: string[]; // Added
}

export interface Activities {
  involvements: string;
  achievements: string;
}

export interface Volunteer {
  id: string;
  organization: string;
  position: string;
  url?: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights?: string[]; // Added
  isVolunteeringNow: boolean; // Added
}

export interface Award {
  id: string;
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

export interface ResumeData {
  basics: Basics;
  skills: Skills;
  work: Work[];
  education: Education[];
  activities: Activities;
  volunteer: Volunteer[];
  awards: Award[];
}
