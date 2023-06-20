import { AiOutlinePhone } from "react-icons/ai";
import {
  BsFillHouseFill,
  BsFillTelephoneFill,
  BsEnvelopeFill,
} from "react-icons/bs";
import { useEffect } from "react";
import "./Contact.css"
import {motion} from 'framer-motion'
import { containerVariants } from "../../animations/animation.js";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="contact">
      <div className="contact-starting">
        <div>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AiOutlinePhone />
            &nbsp;
            <span>Contact Us</span>
          </h1>
          <p>We'd love to hear from you!</p>
        </div>
      </div>
      <div className="contact-info">
        <div>
          <h1>
            <BsFillHouseFill />
          </h1>
          <h3>VISIT US</h3>
          <p>
          You're welcome to visit our office and meet with our team members.
          </p>
          <h3>F-5, Club Street, Karachi</h3>
        </div>
        <div>
          <h1>
            <BsFillTelephoneFill />
          </h1>
          <h3>CALL US</h3>
          <p>
            We are available 24/7. Reach out to us for support and guidelines!
          </p>
          <h3>+9309032932</h3>
        </div>
        <div>
          <h1>
            <BsEnvelopeFill />
          </h1>
          <h3>EMAIL US</h3>
          <p>
          We're just an email away. Connect with our team for assistance.
          </p>
          <h3>mail@asaanreiturns.pk</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
