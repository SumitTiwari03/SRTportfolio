import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaUpload, FaTimes, FaImage } from "react-icons/fa";
import { Button, TextAreaField, InputField } from "./index";
import axios from "axios";

const skills = [
    "JavaScript", "CSS", "HTML", "Python", "React", "Express", "MongoDB",
    "Node.js", "TypeScript", "Vue.js", "Angular", "Java", "C++", "Ruby",
    "PHP", "Swift", "Kotlin", "Go", "Rust", "SQL", "GraphQL", "Docker", 
    "Spline", "Three.js", "Next.js", "GSAP",
];

export default function AddProject() {
    const [project, setProject] = useState({
        title: "",
        description: "",
        projectUrl: "",
    });

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skillSearch, setSkillSearch] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleSkillSelect = (skill) => {
        if (!selectedSkills.includes(skill)) {
            setSelectedSkills([...selectedSkills, skill]);
        }
        setSkillSearch("");
    };

    const handleSkillRemove = (skill) => {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    };

    const filteredSkills = skills.filter(
        (skill) =>
            skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
            !selectedSkills.includes(skill)
    );

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = async () => {
        const formData = new FormData();
        formData.append("image", fileInputRef.current.files[0]);
        formData.append("title", project.title);
        formData.append("description", project.description);
        formData.append("techStack", JSON.stringify(selectedSkills));
        formData.append("projectUrl", project.projectUrl);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/dashboard/addproject",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log("Project added to portfolio:", response.data);
            setIsAddOpen(false);
            window.location.reload(false);
        } catch (err) {
            console.error("Error while uploading the project:", err);
        }
    };

    return (
        <div className="bg-gray-100 py-3 px-3 sm:px-3 lg:px-3 w-10/12 overflow-auto" style={{ maxHeight: "98%" }}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8" style={{ maxHeight: "95%" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white shadow-xl rounded-lg flex-1"
                    >
                        <div className="px-4 py-5 sm:p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                                <FaUpload className="mr-2" /> Upload Your Project
                            </h2>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <InputField
                                    label="Project Title"
                                    name="title"
                                    value={project.title}
                                    onChange={handleChange}
                                    placeholder="Enter your project title"
                                    required
                                />
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                                    <div className="mt-1 flex items-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleImageSelect}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current.click()}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            <FaImage className="mr-2" />
                                            Select Image
                                        </button>
                                        {selectedImage && <span className="ml-2 text-sm text-gray-600">Image selected</span>}
                                    </div>
                                </div>
                                <InputField
                                    label="Project URL"
                                    name="projectUrl"
                                    value={project.projectUrl}
                                    onChange={handleChange}
                                    placeholder="Enter your project's live URL"
                                    required
                                />
                                <TextAreaField
                                    label="Project Description"
                                    name="description"
                                    value={project.description}
                                    onChange={handleChange}
                                    placeholder="Describe your project"
                                    required
                                />
                                <div className="mb-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Technical Skills</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {selectedSkills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="bg-red-600 text-white text-sm font-medium px-1 py-1 rounded flex items-center"
                                            >
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={() => handleSkillRemove(skill)}
                                                    className="ml-1 hover:text-black"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={skillSearch}
                                            onChange={(e) => setSkillSearch(e.target.value)}
                                            placeholder="Search skills..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                        {skillSearch && (
                                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                                                {filteredSkills.map((skill) => (
                                                    <li
                                                        key={skill}
                                                        onClick={() => handleSkillSelect(skill)}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-center items-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAdd}
                                        className="w-full flex justify-center items-center"
                                    >
                                        Add Project
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
