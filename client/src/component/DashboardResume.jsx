import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "./index";
import { Upload, FileText, Download, Trash2, Eye, CheckCircle } from "lucide-react";
import axios from "axios";

function DashboardResume() {
  const [resume, setResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await axios.get("https://sumit-dev-api.onrender.com/api/resume");
      setResume(response.data);
    } catch (err) {
      console.log("No resume found or error:", err);
      setResume(null);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please select a PDF file");
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await axios.post(
        "https://sumit-dev-api.onrender.com/api/dashboard/resume/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        }
      );

      console.log("Resume uploaded successfully", response.data);
      setSelectedFile(null);
      fetchResume();
    } catch (err) {
      console.error("Error uploading resume:", err);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await axios.delete("https://sumit-dev-api.onrender.com/api/dashboard/resume/delete", {
        data: { _id: resume._id },
      });
      setResume(null);
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Failed to delete resume");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
            Resume Management
          </h1>
          <p className="text-gray-600">Upload and manage your resume file</p>
        </div>

        <div className="grid gap-6">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white shadow-xl border-t-4 border-violet-500">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Upload className="h-6 w-6 text-violet-600" />
                  Upload New Resume
                </h2>

                <div className="space-y-6">
                  {/* File Input */}
                  <div className="border-2 border-dashed border-violet-300 rounded-xl p-8 text-center hover:border-violet-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex flex-col items-center gap-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {selectedFile ? selectedFile.name : "Click to select PDF file"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Maximum file size: 10MB
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      "Uploading..."
                    ) : (
                      <>
                        <Upload className="mr-2 h-5 w-5" />
                        Upload Resume
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Resume Section */}
          {resume && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="bg-white shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    Current Resume
                  </h2>

                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <FileText className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {resume.fileName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => window.open(resume.url, "_blank")}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = resume.url;
                          link.download = resume.fileName;
                          link.click();
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Info Card */}
          <Card className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm">
                <li>• Keep your resume updated with latest skills and experiences</li>
                <li>• Use a clean, ATS-friendly format</li>
                <li>• File size should be under 10MB for best performance</li>
                <li>• Only PDF format is accepted</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardResume;
