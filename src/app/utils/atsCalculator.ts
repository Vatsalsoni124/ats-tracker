import { ATSScore } from "../types";

const commonATSKeywords = [
  // Technical Skills
  "javascript", "python", "java", "react", "typescript", "node.js", "sql",
  "aws", "docker", "kubernetes", "git", "api", "rest", "graphql",
  // Soft Skills
  "leadership", "communication", "problem-solving", "teamwork", "agile",
  "collaboration", "project management", "analytical", "creative",
  // Action Verbs
  "developed", "managed", "led", "implemented", "designed", "created",
  "improved", "achieved", "delivered", "optimized", "coordinated",
  // Common Requirements
  "bachelor", "master", "degree", "certified", "experience", "years",
  "proficient", "expert", "advanced", "senior", "junior"
];

export function calculateATSScore(resumeText: string): {
  score: ATSScore;
  detectedKeywords: string[];
  suggestions: string[];
} {
  const text = resumeText.toLowerCase();
  const suggestions: string[] = [];
  
  // Calculate keyword score
  const detectedKeywords = commonATSKeywords.filter(keyword => 
    text.includes(keyword.toLowerCase())
  );
  const keywordScore = Math.min(100, (detectedKeywords.length / commonATSKeywords.length) * 200);
  
  if (keywordScore < 50) {
    suggestions.push("Add more relevant industry keywords and skills to your resume");
  }
  
  // Calculate formatting score
  let formattingScore = 100;
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(resumeText);
  const hasPhone = /\d{3}[-.]?\d{3}[-.]?\d{4}/.test(resumeText);
  const hasBulletPoints = resumeText.includes("•") || resumeText.includes("-") || resumeText.includes("*");
  const hasSpecialChars = /[#$%^&*()]/g.test(resumeText);
  
  if (!hasEmail) {
    formattingScore -= 20;
    suggestions.push("Include your email address");
  }
  if (!hasPhone) {
    formattingScore -= 15;
    suggestions.push("Include your phone number");
  }
  if (!hasBulletPoints) {
    formattingScore -= 15;
    suggestions.push("Use bullet points to list your achievements");
  }
  if (hasSpecialChars) {
    formattingScore -= 10;
    suggestions.push("Avoid special characters that may confuse ATS systems");
  }
  
  // Calculate experience score
  const experienceMatches = text.match(/(\d+)\+?\s*(years?|yrs?)/gi);
  let experienceScore = 50;
  if (experienceMatches && experienceMatches.length > 0) {
    experienceScore = Math.min(100, 50 + (experienceMatches.length * 15));
  } else {
    suggestions.push("Clearly mention your years of experience");
  }
  
  // Calculate skills score
  const skillsSections = /(skills|technologies|technical skills|core competencies)/i.test(text);
  let skillsScore = 60;
  if (skillsSections) {
    skillsScore = 85;
  } else {
    suggestions.push("Add a dedicated Skills or Technical Skills section");
  }
  
  // Calculate education score
  const educationKeywords = ["bachelor", "master", "phd", "degree", "university", "college", "education"];
  const hasEducation = educationKeywords.some(keyword => text.includes(keyword));
  let educationScore = 50;
  if (hasEducation) {
    educationScore = 85;
  } else {
    suggestions.push("Include your education details");
  }
  
  // Calculate overall score
  const overall = Math.round(
    (keywordScore * 0.3) +
    (formattingScore * 0.2) +
    (experienceScore * 0.2) +
    (skillsScore * 0.15) +
    (educationScore * 0.15)
  );
  
  return {
    score: {
      overall,
      keywords: Math.round(keywordScore),
      formatting: Math.round(formattingScore),
      experience: Math.round(experienceScore),
      skills: Math.round(skillsScore),
      education: Math.round(educationScore),
    },
    detectedKeywords,
    suggestions: suggestions.slice(0, 5), // Limit to top 5 suggestions
  };
}

export function calculateJobMatch(resumeKeywords: string[], jobKeywords: string[]): number {
  const resumeSet = new Set(resumeKeywords.map(k => k.toLowerCase()));
  const matchCount = jobKeywords.filter(keyword => 
    resumeSet.has(keyword.toLowerCase())
  ).length;
  
  return Math.min(100, Math.round((matchCount / jobKeywords.length) * 100));
}
