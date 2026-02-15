import { Job } from "../types";

export const mockJobs: Omit<Job, "matchScore">[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    salary: "$120k - $160k",
    description: "We're looking for an experienced Frontend Developer to join our team and build amazing user experiences.",
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of modern JavaScript",
      "Experience with state management (Redux, MobX, etc.)",
      "Excellent problem-solving skills",
      "Bachelor's degree in Computer Science or related field"
    ],
    keywords: ["react", "typescript", "javascript", "frontend", "developed", "experience", "bachelor", "problem-solving"],
    matchScore: 0
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $180k",
    description: "Join our fast-growing startup and help build scalable web applications from the ground up.",
    requirements: [
      "3+ years of full-stack development experience",
      "Proficient in Node.js, React, and SQL databases",
      "Experience with AWS or similar cloud platforms",
      "Strong communication and teamwork skills",
      "Agile development experience"
    ],
    keywords: ["node.js", "react", "sql", "aws", "developed", "experience", "agile", "teamwork", "communication"],
    matchScore: 0
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudSystems Ltd.",
    location: "Austin, TX (Hybrid)",
    type: "Full-time",
    salary: "$110k - $150k",
    description: "We need a DevOps Engineer to manage our infrastructure and improve our deployment pipelines.",
    requirements: [
      "4+ years of DevOps experience",
      "Expert knowledge of Docker and Kubernetes",
      "Experience with CI/CD pipelines",
      "AWS or Azure certification preferred",
      "Bachelor's degree or equivalent experience"
    ],
    keywords: ["docker", "kubernetes", "aws", "devops", "implemented", "experience", "bachelor", "expert"],
    matchScore: 0
  },
  {
    id: "4",
    title: "Python Data Engineer",
    company: "DataFlow Analytics",
    location: "Seattle, WA (Remote)",
    type: "Full-time",
    salary: "$115k - $155k",
    description: "Build and optimize data pipelines for our analytics platform using Python and modern data tools.",
    requirements: [
      "3+ years of Python development experience",
      "Strong SQL skills and database design knowledge",
      "Experience with data pipeline tools (Airflow, Spark, etc.)",
      "Analytical mindset and attention to detail",
      "Master's degree in Computer Science or related field preferred"
    ],
    keywords: ["python", "sql", "developed", "experience", "analytical", "master", "designed"],
    matchScore: 0
  },
  {
    id: "5",
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$90k - $130k",
    description: "Create beautiful and intuitive user interfaces for our suite of products.",
    requirements: [
      "4+ years of UI/UX design experience",
      "Proficient in Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating design thinking",
      "Experience working with development teams",
      "Bachelor's degree in Design or related field"
    ],
    keywords: ["designed", "creative", "experience", "bachelor", "collaboration", "proficient"],
    matchScore: 0
  },
  {
    id: "6",
    title: "Product Manager",
    company: "Innovation Labs",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    salary: "$125k - $170k",
    description: "Lead product strategy and development for our flagship SaaS platform.",
    requirements: [
      "5+ years of product management experience",
      "Strong leadership and communication skills",
      "Experience with agile methodologies",
      "Technical background preferred",
      "MBA or Bachelor's degree required"
    ],
    keywords: ["leadership", "communication", "agile", "managed", "experience", "bachelor"],
    matchScore: 0
  },
  {
    id: "7",
    title: "Backend Developer (Java)",
    company: "Enterprise Solutions Inc.",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$105k - $145k",
    description: "Develop and maintain our enterprise-level Java applications and microservices.",
    requirements: [
      "4+ years of Java development experience",
      "Experience with Spring Boot and microservices",
      "Strong understanding of REST APIs",
      "SQL and NoSQL database experience",
      "Bachelor's degree in Computer Science"
    ],
    keywords: ["java", "developed", "api", "rest", "sql", "experience", "bachelor"],
    matchScore: 0
  },
  {
    id: "8",
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    location: "San Jose, CA (Remote)",
    type: "Full-time",
    salary: "$140k - $190k",
    description: "Build and deploy machine learning models to solve complex business problems.",
    requirements: [
      "3+ years of ML engineering experience",
      "Strong Python skills and ML frameworks (TensorFlow, PyTorch)",
      "Experience with cloud platforms (AWS, GCP)",
      "PhD or Master's in Computer Science, Mathematics, or related field",
      "Strong analytical and problem-solving skills"
    ],
    keywords: ["python", "aws", "master", "analytical", "problem-solving", "developed", "experience"],
    matchScore: 0
  },
  {
    id: "9",
    title: "Frontend React Developer",
    company: "WebApps Co.",
    location: "Miami, FL (Remote)",
    type: "Contract",
    salary: "$80k - $110k",
    description: "Join our team to build responsive and performant React applications.",
    requirements: [
      "2+ years of React development experience",
      "Good understanding of JavaScript and TypeScript",
      "Experience with modern build tools",
      "Git version control proficiency",
      "Portfolio of previous work required"
    ],
    keywords: ["react", "javascript", "typescript", "developed", "experience", "git", "proficient"],
    matchScore: 0
  },
  {
    id: "10",
    title: "Senior Project Manager",
    company: "Consulting Group Ltd.",
    location: "Washington, DC",
    type: "Full-time",
    salary: "$115k - $155k",
    description: "Oversee multiple client projects and lead cross-functional teams to deliver successful outcomes.",
    requirements: [
      "6+ years of project management experience",
      "PMP or similar certification",
      "Excellent leadership and communication skills",
      "Experience with agile and waterfall methodologies",
      "Bachelor's degree required, Master's preferred"
    ],
    keywords: ["project management", "leadership", "communication", "agile", "managed", "experience", "bachelor", "master", "delivered", "senior"],
    matchScore: 0
  },
  {
    id: "11",
    title: "Cloud Architect",
    company: "CloudTech Solutions",
    location: "Denver, CO (Hybrid)",
    type: "Full-time",
    salary: "$150k - $200k",
    description: "Design and implement cloud infrastructure solutions for enterprise clients.",
    requirements: [
      "7+ years of cloud architecture experience",
      "AWS or Azure certification required",
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Strong technical leadership skills",
      "Bachelor's or Master's degree in Computer Science"
    ],
    keywords: ["aws", "designed", "implemented", "leadership", "experience", "bachelor", "master", "advanced"],
    matchScore: 0
  },
  {
    id: "12",
    title: "Junior Software Developer",
    company: "Tech Startups Inc.",
    location: "Portland, OR",
    type: "Full-time",
    salary: "$70k - $90k",
    description: "Start your career in software development with our mentorship program.",
    requirements: [
      "0-2 years of programming experience",
      "Knowledge of JavaScript, Python, or Java",
      "Bachelor's degree in Computer Science or related field",
      "Eager to learn and grow",
      "Good teamwork and communication skills"
    ],
    keywords: ["javascript", "python", "java", "bachelor", "teamwork", "communication", "junior"],
    matchScore: 0
  }
];
