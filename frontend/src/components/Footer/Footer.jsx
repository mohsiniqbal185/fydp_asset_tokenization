import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="foot-div">
        <div className="foot-div-item1">
          <img src="/assets/logo8.png" alt="" />
          <p>
            Asaan REITurns is an investment platform that aims
             to provide an affordable and hassle-free way of investing in real estate.
             We utilize cutting-edge technologies to enhance transparency and
              security in real estate.
          </p>
        </div>
        <div className="foot-div-item2">
          <h2>Company</h2>
          <div className="links">
            <div>
              <Link to="/about">About</Link>
            </div>
            <div>
              <Link to="/projects">Projects</Link>
            </div>
            <div>
              <Link to="/learn">Learn</Link>
            </div>
          </div>
        </div>
        <div className="foot-div-item3">
          <h2>Contact</h2>
          <div className="content">
            <p>Location: F-5, Club Street, Karachi</p>
            <p>Email: mail@asaanreiturns.pk</p>
            <p>Phone: +9309032932</p>
          </div>
        </div>
      </div>
      <div className="copyright">
      <div className="social-icons">
              <span>
                <FaFacebookF />
              </span>
              <span>
                <FaInstagram />
              </span>
              <span>
                <FaLinkedinIn />
              </span>
              <span>
                <FaTwitter />
              </span>
            </div>
        <h4>
          &copy; {new Date().getFullYear()} Asaan REITurns. All Rights Reserved.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;