import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineVisibility } from "react-icons/md";
import { BiTargetLock } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa";
import { useEffect } from "react";
import "./About.css"
import {motion} from 'framer-motion'
import { containerVariants } from "../../animations/animation.js";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="about">
      <div className="about-starting">
        <div>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IoPeopleOutline />
            &nbsp;
            <span>About Us</span>
          </h1>
          <p>
            We founded this platform to make investment in Real Estate Asaan and
            provide Returns
          </p>
        </div>
      </div>
      <div className="vision-mission">
        <div className="vision">
          <h1
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <MdOutlineVisibility />
            &nbsp; Our Vision
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ab
            minima reiciendis officiis, recusandae inventore consequuntur libero
            dolor perspiciatis iste eius ullam sint expedita, commodi nulla rem
            sed nam laborum.
          </p>
        </div>
        <div className="mission">
          <h1
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <BiTargetLock />
            &nbsp; Our Mission
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et fugit
            unde assumenda quasi numquam tempora veniam minus esse suscipit.
            Ipsam nesciunt culpa eveniet inventore quo mollitia quis, nemo
            molestiae facilis?
          </p>
        </div>
      </div>
      <div className="services">
        <div>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaHandshake />
            &nbsp; Services
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            ipsum quia fuga quos eligendi quasi ex tempore fugiat soluta,
            recusandae sunt cumque blanditiis saepe veritatis voluptatibus
            repellendus commodi. Sint, tempora. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Tempore ea sed odit magnam
            exercitationem eum hic quos alias, dolorem debitis laudantium
            corporis harum? Optio recusandae culpa dicta similique ipsum quae?
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
