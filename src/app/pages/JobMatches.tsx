import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, Briefcase, DollarSign, TrendingUp, ExternalLink } from "lucide-react";
import { ResumeAnalysis } from "../types";

export function JobMatches() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "high" | "medium">("all");

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

  const getMatchColor = (score: number) => {
    if (score >= 70) return "text-green-600 bg-green-100";
    if (score >= 50) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getMatchLabel = (score: number) => {
    if (score >= 70) return "High Match";
    if (score >= 50) return "Medium Match";
    return "Low Match";
  };

  const filteredJobs = analysis.matchedJobs.filter(job => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "high") return job.matchScore >= 70;
    if (selectedFilter === "medium") return job.matchScore >= 50 && job.matchScore < 70;
    return true;
  });

  const highMatchCount = analysis.matchedJobs.filter(j => j.matchScore >= 70).length;
  const mediumMatchCount = analysis.matchedJobs.filter(j => j.matchScore >= 50 && j.matchScore < 70).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/analysis")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Analysis
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Job Matches</h1>
            <p className="text-gray-600">Jobs ranked by compatibility with your resume</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{analysis.matchedJobs.length}</div>
              <div className="text-gray-600">Total Jobs</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{highMatchCount}</div>
              <div className="text-gray-600">High Matches (70%+)</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{mediumMatchCount}</div>
              <div className="text-gray-600">Medium Matches (50-69%)</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Jobs ({analysis.matchedJobs.length})
              </button>
              <button
                onClick={() => setSelectedFilter("high")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === "high"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                High Match ({highMatchCount})
              </button>
              <button
                onClick={() => setSelectedFilter("medium")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === "medium"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Medium Match ({mediumMatchCount})
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                    <p className="text-xl text-gray-700 mb-3">{job.company}</p>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${getMatchColor(job.matchScore)}`}>
                      <TrendingUp className="w-4 h-4" />
                      {job.matchScore}%
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{getMatchLabel(job.matchScore)}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{job.description}</p>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-gray-900">Requirements:</h3>
                  <ul className="space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex flex-wrap gap-2">
                    {job.keywords.slice(0, 5).map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-xl text-gray-600">No jobs found matching your filter criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
