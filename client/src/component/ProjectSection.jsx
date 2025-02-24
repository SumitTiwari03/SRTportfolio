import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CardContent, Card } from './cards';
import Button from './button';
import { Badge } from './badge';
import { ExternalLink } from 'lucide-react';

const ProjectSection = ({ isDarkMode }) => {
  // const projects = [
  //   {
  //     id: 1,
  //     title: 'Zaika',
  //     description: "A MERN based full-stack hotel website named Zaika Hotel's website offers an enticing showcase of delicious cuisines, easy online reservations, and contact information.",
  //     tech: ['React', 'Node.js', 'MongoDB'],
  //     image: '/zaika.png',
  //     link: 'https://zaikahotel.netlify.app',
  //   },
  //   {
  //     id: 2,
  //     title: 'Youtube clone',
  //     description: 'A youtube clone website developed to practice my API skills.',
  //     tech: ['Html', 'CSS', 'JavaScript'],
  //     image: '/youtubeclone.png',
  //     link: 'https://youtube0309.netlify.app/',
  //   },
  //   {
  //     id: 3,
  //     title: 'Crypto Tracker',
  //     description: 'Real-time cryptocurrency tracking and portfolio management app.',
  //     tech: ['React Native', 'Redux', 'Crypto APIs'],
  //     image: '/wheatherforcasting.png',
  //     link: 'https://whatweather03.netlify.app/',
  //   },
  //   {
  //     id: 4,
  //     title: 'Cnv Holidays',
  //     description: 'A holiday-based website.',
  //     tech: ['Raspberry Pi', 'Python', 'MQTT'],
  //     image: 'https://example.com/placeholder-image-4.jpg',
  //     link: 'https://cnvholidays.netlify.app',
  //   },
  // ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
        <div className="flex gap-8 overflow-x-auto pb-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="min-w-[300px] flex-shrink-0"
            >
              <Card className="h-full w-[300px]">
                <CardContent className="p-6">
                  <div className="h-48 w-full object-cover rounded-md mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <h3 className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} text-2xl font-semibold mb-2`}>
                    {project.title}
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center">
                      <ExternalLink className="mr-2 h-4 w-4" /> Visit Project
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
