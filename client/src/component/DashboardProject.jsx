import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent, Badge, AddProject } from "./index";
import { ExternalLink, BadgePlus, Pencil } from "lucide-react";
import axios from "axios";

function DashboardProject() {
  // const projects = [
  //   {
  //     id: 1,
  //     title: "Zaika",
  //     description:
  //       "A hotel website named Zaika Hotel's website offers an enticing showcase of delicious cuisines, easy online reservations, and contact information. It also has the chef's side, which can be accessed by clicking on the logo of the cart page.",
  //     tech: ["React", "Node.js", "MongoDB"],
  //     image: "/zaika.png",
  //     link: "https://zaikahotel.netlify.app",
  //   },
  //   {
  //     id: 2,
  //     title: "Organiser Todos",
  //     description:
  //       "A React-based todo app, where a user can add, edit, and delete todos. It also keeps track of all your tasks by allowing you to check and uncheck them. The data is stored in Local Storage.",
  //     tech: ["React", "Tailwind"],
  //     image: "/todo.jpg",
  //     link: "https://organiser-todo.vercel.app/",
  //   },
  //   // Add more projects as needed
  // ];

  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([])
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const openPopup = (project) => {
    setSelectedProject(project);
    setIsOpen(true);
    setImagePreview(null);
    setNewImage(null);
    console.log("Project details", project);
  };

  const closePopup = () => {
    setSelectedProject(null);
    setIsOpen(false);
    setImagePreview(null);
    setNewImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // edit project function
  const editProject = async () => {
    try {
      const formData = new FormData();

      // Add all project fields
      formData.append('_id', selectedProject._id);
      formData.append('title', selectedProject.title);
      formData.append('description', selectedProject.description);
      formData.append('projectUrl', selectedProject.projectUrl);
      formData.append('gitUrl', selectedProject.gitUrl);
      formData.append('techStack', JSON.stringify(selectedProject.techStack));

      // Add new image if selected
      if (newImage) {
        formData.append('image', newImage);
      }

      const response = await axios.put('https://sumit-dev-api.onrender.com/api/dashboard/editproject', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log("Project updated successfully", response.data);
      closePopup();

      // Refresh projects list
      const updatedProjects = await axios.get('https://sumit-dev-api.onrender.com/api/dashboard/getproject');
      setProjects(updatedProjects.data);
    } catch (err) {
      console.log("Error while Project edit", err);
      alert("Failed to update project. Please try again.");
    }
  };
  // delete project function
  const deleteProject = async() => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await axios.delete('https://sumit-dev-api.onrender.com/api/dashboard/deleteproject', {data: { _id: selectedProject._id }})
      console.log("Project id:-", selectedProject._id);
      console.log("Project successFully delete:- ", response.data);

      closePopup();

      // Refresh projects list
      const updatedProjects = await axios.get('https://sumit-dev-api.onrender.com/api/dashboard/getproject');
      setProjects(updatedProjects.data);
    } catch (err) {
      console.log("Error while deleting the project", err);
      alert("Failed to delete project. Please try again.");
    }
  }

  const handleAdd = () => {
    setIsAddOpen(true)
  }
  useEffect(() => {
    axios.get('https://sumit-dev-api.onrender.com/api/dashboard/getproject').then(async (res) => {
      console.log(res.data)
      const project = res.data
      await setProjects(res.data)
    }).catch((err) => {
      console.log("Error while getting the projects ", err);
    })
  }, [])

  // const editProject = async (id, selectedProject) => {
  //   try {
  //     const response = await axios.put('https://sumit-dev-api.onrender.com/api/dashboard/editproject', id, selectedProject)
  //     console.log("SuccessFully updated:- ", response.data)
  //   } catch (err) {
  //     console.log("Error while Project edit", err);
  //   }
  // }
  
  return (
    <>
      <div className="flex w-full justify-between p-10 h-20 items-center ">
        <h2 className="text-2xl">
          Be <span className="text-yellow-500 font-bold">Passionate</span>{" "}
          <span className="text-red-500 font-bold">Creative</span>{" "}
          <span className="text-blue-500 font-bold">Consistent</span>
        </h2>
        <Button
          variant="outline"
          size="sm"
          asChild
          onClick={handleAdd}
          className="w-full flex justify-center items-center"
        >
          <BadgePlus className="mr-2 h-6 w-6" /> Add Project
        </Button>
      </div>
      <hr className="w-full border border-black mt-2" />
      <div className="relative bg-gray-100 flex flex-col justify-center items-center">
        <section id="projects" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`h-full transition-colors`}>
                    <CardContent className="p-6">
                      <div className="h-80 w-full object-cover rounded-md mb-4">
                        <img
                          src={project.img.url}
                          alt={project.title}
                          className="w-full h-fit object-cover rounded-md mb-4"
                        />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                          <Badge key={project.id} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex w-full justify-between">
                        <Button variant="outline" size="sm" asChild className="w-full">
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            className="flex justify-center items-center"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" /> Visit Project
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => openPopup(project)}
                        >
                          <p className="flex justify-center items-center cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" /> Edit Project
                          </p>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Add project dialog box */}
      {isAddOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <AddProject />
        </div>
      )}

      {/* Popup */}
      {/* {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="flex-col justify-center items-center bg-white p-6 rounded shadow-lg w-1/2 text-center relative">
            <form action="" className="w-full flex-col justify-center items-center">
              <input type="text" className="border mb-2 w-full" value={selectedProject.title} onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })} />
              <input type="text" className="border mb-2 w-full" value={selectedProject.description} onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })} />
              <div className="flex justify-between w-full">
              <Button onClick={closePopup}>Save</Button>
              <Button onClick={closePopup}>Delete</Button> 
              </div>
            </form>
          </div>
        </div>
      )} */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-y-auto my-8">
            <h2 className="text-xl font-semibold mb-4">EDIT PROJECT</h2>

            {/* Image Preview and Upload */}
            <label className="block mb-4">
              <span className="text-gray-700 font-medium">Project Image:</span>
              <div className="mt-2">
                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden mb-2">
                  <img
                    src={imagePreview || selectedProject.img.url}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a new image to replace the current one
                </p>
              </div>
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">Title:</span>
              <input
                type="text"
                value={selectedProject.title}
                onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Project URL:</span>
              <input
                type="text"
                value={selectedProject.projectUrl}
                onChange={(e) => setSelectedProject({ ...selectedProject, projectUrl: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Github URL:</span>
              <input
                type="text"
                value={selectedProject.gitUrl}
                onChange={(e) => setSelectedProject({ ...selectedProject, gitUrl: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">TechStack:</span>
              <input
                type="text"
                value={selectedProject.techStack}
                onChange={(e) => setSelectedProject({ ...selectedProject, techStack: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Description:</span>
              <textarea
                rows="5"
                value={selectedProject.description}
                onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </label>
            <div className="flex justify-between space-x-2">
              <div className="flex gap-2">
                <Button onClick={editProject} className="bg-green-600 hover:bg-green-700 text-white">
                  Save Changes
                </Button>
                <Button onClick={closePopup} className="bg-gray-500 hover:bg-gray-600 text-white">
                  Cancel
                </Button>
              </div>
              <Button onClick={deleteProject} className="bg-red-600 hover:bg-red-700 text-white">
                Delete Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardProject;
