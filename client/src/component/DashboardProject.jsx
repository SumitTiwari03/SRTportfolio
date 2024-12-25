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

  const openPopup = (project) => {
    setSelectedProject(project);
    setIsOpen(true);
    console.log("Project details", project);
  };

  // edit project function
  const editProject = async () => {
    try {
      const response = await axios.put('https://sumit-dev-api.onrender.com/api/dashboard/editproject', selectedProject)
      console.log("response data:- ",response.data)
      console.log("SuccessFully updated:- ", response.data)
      console.log("Project details:-", selectedProject);
      setSelectedProject(null);
      setIsOpen(false);
    } catch (err) {
      console.log("Error while Project edit", err);
    }
    
  };
  // delete project function
  const deleteProject = async() => {
    
    try {
      const response = await axios.delete('https://sumit-dev-api.onrender.com/api/dashboard/deleteproject', {data: { _id: selectedProject._id }})
      console.log("Project id:-", selectedProject._id);
      console.log("Project successFully delete:- ", response.data);
      
      setSelectedProject(null);
      setIsOpen(false);
    } catch (err) {
      console.log("Error while deleting the project", err);
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
                            href={project.link}
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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">EDIT PROJECT</h2>
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
              <span className="text-gray-700">TectStack:</span>
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
            <div className="flex justify-end space-x-2">
              <Button onClick={editProject}>Save</Button>
              <Button onClick={deleteProject}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardProject;
