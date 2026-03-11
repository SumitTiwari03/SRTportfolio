import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "./index";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import axios from "axios";

function DashboardSkills() {
  const [skills, setSkills] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ category: "", items: [] });
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get("https://sumit-dev-api.onrender.com/api/skills");
      setSkills(response.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const handleAddSkill = async () => {
    try {
      await axios.post("https://sumit-dev-api.onrender.com/api/dashboard/skill/add", newSkill);
      setIsAddOpen(false);
      setNewSkill({ category: "", items: [] });
      setSkillInput("");
      fetchSkills();
    } catch (err) {
      console.error("Error adding skill:", err);
      alert("Failed to add skill category");
    }
  };

  const handleEditSkill = async () => {
    try {
      await axios.put("https://sumit-dev-api.onrender.com/api/dashboard/skill/edit", selectedSkill);
      setIsEditOpen(false);
      setSelectedSkill(null);
      fetchSkills();
    } catch (err) {
      console.error("Error editing skill:", err);
      alert("Failed to update skill category");
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill category?")) return;

    try {
      await axios.delete("https://sumit-dev-api.onrender.com/api/dashboard/skill/delete", {
        data: { _id: id }
      });
      fetchSkills();
    } catch (err) {
      console.error("Error deleting skill:", err);
      alert("Failed to delete skill category");
    }
  };

  const addItemToList = (isEdit = false) => {
    if (!skillInput.trim()) return;

    if (isEdit) {
      setSelectedSkill({
        ...selectedSkill,
        items: [...selectedSkill.items, skillInput.trim()]
      });
    } else {
      setNewSkill({
        ...newSkill,
        items: [...newSkill.items, skillInput.trim()]
      });
    }
    setSkillInput("");
  };

  const removeItemFromList = (index, isEdit = false) => {
    if (isEdit) {
      setSelectedSkill({
        ...selectedSkill,
        items: selectedSkill.items.filter((_, i) => i !== index)
      });
    } else {
      setNewSkill({
        ...newSkill,
        items: newSkill.items.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Skills Management</h1>
            <p className="text-gray-600">Manage your technical skills and expertise</p>
          </div>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Skill Category
          </Button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillCategory) => (
            <motion.div
              key={skillCategory._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-2xl transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{skillCategory.category}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedSkill(skillCategory);
                          setIsEditOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skillCategory._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add Skill Modal */}
        {isAddOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Skill Category</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    placeholder="e.g., Frontend, Backend"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addItemToList(false)}
                      placeholder="Add a skill"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      onClick={() => addItemToList(false)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newSkill.items.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {item}
                        <button onClick={() => removeItemFromList(index, false)}>
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleAddSkill}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Check className="mr-2 h-5 w-5" /> Add Category
                </Button>
                <Button
                  onClick={() => {
                    setIsAddOpen(false);
                    setNewSkill({ category: "", items: [] });
                    setSkillInput("");
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Skill Modal */}
        {isEditOpen && selectedSkill && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Skill Category</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={selectedSkill.category}
                    onChange={(e) => setSelectedSkill({ ...selectedSkill, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addItemToList(true)}
                      placeholder="Add a skill"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      onClick={() => addItemToList(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.items.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {item}
                        <button onClick={() => removeItemFromList(index, true)}>
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleEditSkill}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Check className="mr-2 h-5 w-5" /> Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedSkill(null);
                    setSkillInput("");
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
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

export default DashboardSkills;
