import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "./index";
import { Plus, Pencil, Trash2, Trophy, Award } from "lucide-react";
import axios from "axios";

function DashboardAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    college: "",
    fest: "",
    ranker: "",
    date: "",
    letter: "",
    link: ""
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get("https://sumit-dev-api.onrender.com/api/achievements");
      setAchievements(response.data);
    } catch (err) {
      console.error("Error fetching achievements:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put("https://sumit-dev-api.onrender.com/api/dashboard/achievement/edit", formData);
      } else {
        await axios.post("https://sumit-dev-api.onrender.com/api/dashboard/achievement/add", formData);
      }
      closeModal();
      fetchAchievements();
    } catch (err) {
      console.error("Error submitting achievement:", err);
      alert("Failed to save achievement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) return;

    try {
      await axios.delete("https://sumit-dev-api.onrender.com/api/dashboard/achievement/delete", {
        data: { _id: id }
      });
      fetchAchievements();
    } catch (err) {
      console.error("Error deleting achievement:", err);
      alert("Failed to delete achievement");
    }
  };

  const openModal = (achievement = null) => {
    if (achievement) {
      setFormData(achievement);
      setIsEditing(true);
    } else {
      setFormData({ college: "", fest: "", ranker: "", date: "", letter: "", link: "" });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ college: "", fest: "", ranker: "", date: "", letter: "", link: "" });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Achievements & Awards
            </h1>
            <p className="text-gray-600">Celebrate your accomplishments</p>
          </div>
          <Button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Achievement
          </Button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-2xl transition-all bg-white border-t-4 border-amber-500">
                <CardContent className="p-6">
                  <div className="flex gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                      <Trophy className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{achievement.college}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-4 w-4 text-orange-600" />
                        <p className="text-orange-600 font-semibold">{achievement.fest}</p>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">{achievement.ranker}</p>
                      <p className="text-sm text-gray-500 mb-3">{achievement.date}</p>
                      {achievement.link && (
                        <a
                          href={achievement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium text-sm"
                        >
                          View {achievement.letter}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => openModal(achievement)}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(achievement._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {isEditing ? "Edit Achievement" : "Add New Achievement"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    College / Institution
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g., Nagindas Khandwala College"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event / Competition
                  </label>
                  <input
                    type="text"
                    value={formData.fest}
                    onChange={(e) => setFormData({ ...formData, fest: e.target.value })}
                    placeholder="e.g., Zestech 2023"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Achievement / Position
                  </label>
                  <input
                    type="text"
                    value={formData.ranker}
                    onChange={(e) => setFormData({ ...formData, ranker: e.target.value })}
                    placeholder="e.g., First Place, Runner Up"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., Apr 2023 - Sep 2023"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Certificate Name
                  </label>
                  <input
                    type="text"
                    value={formData.letter}
                    onChange={(e) => setFormData({ ...formData, letter: e.target.value })}
                    placeholder="e.g., Certificate of Excellence"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Certificate Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 text-lg font-semibold"
                >
                  {isEditing ? "Update Achievement" : "Add Achievement"}
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

export default DashboardAchievements;
