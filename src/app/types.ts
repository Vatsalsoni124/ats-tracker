export interface ATSScore {
  overall: number;
  keywords: number;
  formatting: number;
  experience: number;
  skills: number;
  education: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  keywords: string[];
  matchScore: number;
}

export interface ResumeAnalysis {
  text: string;
  atsScore: ATSScore;
  detectedKeywords: string[];
  suggestions: string[];
  matchedJobs: Job[];
}
