export function generateJobBoardLinks(title: string, company: string, location: string) {
  // Clean location - remove "(Remote)", "(Hybrid)", etc.
  const cleanLocation = location.replace(/\s*\([^)]*\)/g, '').trim();
  
  // Create search query
  const query = `${title} ${company}`;
  
  // LinkedIn Jobs URL
  const linkedinUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(cleanLocation)}`;
  
  // Indeed URL
  const indeedUrl = `https://www.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(cleanLocation)}`;
  
  // Glassdoor URL
  const glassdoorUrl = `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(query)}&locT=C&locId=&jobType=`;
  
  return {
    linkedinUrl,
    indeedUrl,
    glassdoorUrl
  };
}
