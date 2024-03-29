import { IoLocationOutline } from "react-icons/io5";
import { BsBuilding,BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { projects } from "../../data/Data.js";
import './Projects.css'
import {motion} from 'framer-motion'
import { containerVariants } from "../../animations/animation.js";
import axios from "axios";



const Projects = () => {

  const [properties, setProperties] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/api/user/properties")
        setProperties(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProperties()
  }, [])

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="projects">
      <div className="projects-starting">
        <div>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsBuilding />
            &nbsp;<span>Our Projects</span>
          </h1>
          <p>Investment in Real Estate with minimum capital and maximum transparency</p>
        </div>
      </div>
      <div className="card-container">
        {properties?.map((project, i) => {
          return (
            <motion.div initial={{y:50,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{ once: true }} transition={{duration:1}} className="card" key={i}>
              <img src={project.image} alt="image" />
              <div className="card-text">
                <h1>{project.name}</h1>
                <h3>
                  <IoLocationOutline />&nbsp;
                  <span>{project.location}</span>
                </h3>
                {/* <p>{project.desc}</p> */}
              </div>
              <div>
                <Link to={`/projects/${project.property_id}`}>
                  <span>View Property</span>&nbsp;
                  <BsArrowRightShort/>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Projects;