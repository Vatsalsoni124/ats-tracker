import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, AlertCircle, CheckCircle2, Briefcase } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { ResumeAnalysis } from "../types";

export function Analysis() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("resumeAnalysis");
    if (stored) {
      setAnalysis(JSON.parse(stored));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!analysis) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  const radialData = [
    {
      name: "Score",
      value: analysis.atsScore.overall,
      fill: getScoreColor(analysis.atsScore.overall),
    },
  ];

  const categoryData = [
    { name: "Keywords", score: analysis.atsScore.keywords },
    { name: "Formatting", score: analysis.atsScore.formatting },
    { name: "Experience", score: analysis.atsScore.experience },
    { name: "Skills", score: analysis.atsScore.skills },
    { name: "Education", score: analysis.atsScore.education },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Resume Analysis Results</h1>
            <p className="text-gray-600">Here's how your resume performs against ATS systems</p>
          </div>

          {/* Overall Score Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Overall ATS Score</h2>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-bold" style={{ color: getScoreColor(analysis.atsScore.overall) }}>
                    {analysis.atsScore.overall}
                  </span>
                  <span className="text-3xl text-gray-400">/100</span>
                </div>
                <p className="text-xl font-semibold mb-4" style={{ color: getScoreColor(analysis.atsScore.overall) }}>
                  {getScoreLabel(analysis.atsScore.overall)}
                </p>
                <p className="text-gray-600">
                  Your resume has been analyzed across multiple criteria to determine its compatibility with Applicant Tracking Systems.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="100%"
                    barSize={30}
                    data={radialData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={30}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Score Breakdown by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" name="Score" radius={[8, 8, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Detected Keywords */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">Detected Keywords</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.detectedKeywords.slice(0, 20).map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-4">
                {analysis.detectedKeywords.length} relevant keywords found
              </p>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Improvement Suggestions</h2>
              </div>
              <ul className="space-y-3">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* View Jobs CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <Briefcase className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Job?</h2>
            <p className="text-xl mb-6 opacity-90">
              We've found {analysis.matchedJobs.filter(j => j.matchScore >= 50).length} job openings that match your resume
            </p>
            <button
              onClick={() => navigate("/jobs")}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              View Matching Jobs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
