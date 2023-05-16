import { IoLocationOutline } from "react-icons/io5";
import { BsBuilding,BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../../data/Data.js";
import './Projects.css'

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="projects">
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
        {projects.map((project, i) => {
          return (
            <div className="card" key={i}>
              <img src={project.image} alt="image" />
              <div className="card-text">
                <h1>{project.name}</h1>
                <h3>
                  <IoLocationOutline />&nbsp;
                  <span>{project.address}</span>
                </h3>
                <p>{project.desc}</p>
              </div>
              <div>
                <Link to={`/projects/${project.name}`}>
                  <span>View Property</span>&nbsp;
                  <BsArrowRightShort/>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;