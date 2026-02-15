import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText, Sparkles } from "lucide-react";
import { calculateATSScore, calculateJobMatch } from "../utils/atsCalculator";
import { mockJobs } from "../data/mockJobs";
import { ResumeAnalysis } from "../types";

export function Home() {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setResumeText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);

    // Simulate analysis delay
    setTimeout(() => {
      const { score, detectedKeywords, suggestions } = calculateATSScore(resumeText);
      
      // Calculate job matches
      const matchedJobs = mockJobs
        .map(job => ({
          ...job,
          matchScore: calculateJobMatch(detectedKeywords, job.keywords)
        }))
        .sort((a, b) => b.matchScore - a.matchScore);

      const analysis: ResumeAnalysis = {
        text: resumeText,
        atsScore: score,
        detectedKeywords,
        suggestions,
        matchedJobs
      };

      // Store in sessionStorage
      sessionStorage.setItem("resumeAnalysis", JSON.stringify(analysis));

      setIsAnalyzing(false);
      navigate("/analysis");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ATS Compatibility Tracker
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Optimize Your Resume for ATS
            </h2>
            <p className="text-xl text-gray-600">
              Get instant feedback on your resume's ATS compatibility and discover jobs that match your profile
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700">
                <Upload className="w-5 h-5" />
                Upload Resume (TXT file)
              </label>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  file:cursor-pointer cursor-pointer"
              />
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700">
                <FileText className="w-5 h-5" />
                Or Paste Your Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here...&#10;&#10;Include your work experience, skills, education, and contact information."
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              />
              <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                {resumeText.length} characters
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <div className="text-center">
            <button
              onClick={handleAnalyze}
              disabled={!resumeText.trim() || isAnalyzing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Analyze Resume"
              )}
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">ATS Score Analysis</h3>
              <p className="text-gray-600 text-sm">
                Get detailed insights on how well your resume performs with ATS systems
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Keyword Optimization</h3>
              <p className="text-gray-600 text-sm">
                Identify important keywords and suggestions to improve your resume
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Job Matching</h3>
              <p className="text-gray-600 text-sm">
                Find job openings that best match your resume and skills
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
