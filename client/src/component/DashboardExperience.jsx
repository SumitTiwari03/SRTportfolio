import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "./index";
import { Plus, Pencil, Trash2, Briefcase, ExternalLink } from "lucide-react";
import axios from "axios";

function DashboardExperience() {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    Duration: "",
    letter: "",
    link: ""
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get("https://sumit-dev-api.onrender.com/api/experiences");
      setExperiences(response.data);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put("https://sumit-dev-api.onrender.com/api/dashboard/experience/edit", formData);
      } else {
        await axios.post("https://sumit-dev-api.onrender.com/api/dashboard/experience/add", formData);
      }
      closeModal();
      fetchExperiences();
    } catch (err) {
      console.error("Error submitting experience:", err);
      alert("Failed to save experience");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;

    try {
      await axios.delete("https://sumit-dev-api.onrender.com/api/dashboard/experience/delete", {
        data: { _id: id }
      });
      fetchExperiences();
    } catch (err) {
      console.error("Error deleting experience:", err);
      alert("Failed to delete experience");
    }
  };

  const openModal = (experience = null) => {
    if (experience) {
      setFormData(experience);
      setIsEditing(true);
    } else {
      setFormData({ company: "", role: "", Duration: "", letter: "", link: "" });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ company: "", role: "", Duration: "", letter: "", link: "" });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Experience Management
            </h1>
            <p className="text-gray-600">Showcase your professional journey</p>
          </div>
          <Button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Experience
          </Button>
        </div>

        {/* Experiences List */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-2xl transition-all bg-white border-l-4 border-indigo-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 flex-1">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        <Briefcase className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{exp.company}</h3>
                        <p className="text-lg text-indigo-600 font-semibold mb-2">{exp.role}</p>
                        <p className="text-gray-600 mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                            {exp.Duration}
                          </span>
                        </p>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {exp.letter}
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(exp)}
                        className="p-3 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {isEditing ? "Edit Experience" : "Add New Experience"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g., Google Inc."
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role / Position
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.Duration}
                    onChange={(e) => setFormData({ ...formData, Duration: e.target.value })}
                    placeholder="e.g., Jan 2022 - Present"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Document Name
                  </label>
                  <input
                    type="text"
                    value={formData.letter}
                    onChange={(e) => setFormData({ ...formData, letter: e.target.value })}
                    placeholder="e.g., Experience Letter"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Document Link
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                >
                  {isEditing ? "Update Experience" : "Add Experience"}
                </Button>
                <Button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 text-lg font-semibold"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardExperience;
