import { useState } from "react";
import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Navbar from "../Navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import { AiOutlinePhone } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { BsBuilding } from "react-icons/bs";
import './Header.css'
import { motion } from "framer-motion";

const slideImages = [
  {
    url: "/assets/background.jpg",
    caption: "Bringing Innovation in Real Estate",
    btnText: "Explore Projects",
    linkTo: "/projects",
    icon: <BsBuilding />,
  },
  {
    url: "/assets/background5.jpg",
    caption: "Easy Investments, Profitable Returns",
    btnText: "About Us",
    linkTo: "/about",
    icon: <IoPeopleOutline />,
  },
  {
    url: "/assets/background3.jpg",
    caption: "We'd love to hear from you",
    btnText: "Contact Us",
    linkTo: "/contact",
    icon: <AiOutlinePhone />,
  },
];

const properties = {
  duration: 3000,
  autoplay: true,
  transitionDuration: 500,
  arrows: false,
  infinite: true,
  easing: "ease",
  // indicators: (i) => <div className="indicator">{i + 1}</div>
};

const slideVariants = {
  leftBefore:{
    y:"-100vh"
  },
  leftAfter:{
    y:"0",
    transition:{
      duration:2,
      type:'spring',
      stiffness:50,
      damping:10
    }
  },
  rightBefore:{
    y:"100vh"
  },
  rightAfter:{
    y:"0",
    transition:{
      duration:2,
      type:'spring',
      stiffness:50,
      damping:10
    }
  }
}

const Header = () => {
  const [navbarScroll, setNavbarScroll] = useState(true);
  const location = useLocation()

  window.onscroll = function () {
    "use strict";
    if (
      document.body.scrollTop >= 45 ||
      document.documentElement.scrollTop >= 45
    ) {
      setNavbarScroll(false);
    } else {
      setNavbarScroll(true);
    }
  };
  return (
    <div className={location.pathname === "/" ? "header" :""}>
      <Navbar navbarScroll={navbarScroll} />
      {location.pathname === "/" ?
      <div className="slide-container">
        <Fade {...properties}>
          {slideImages.map((slideImage, index) => (
            <div className="each-slide" key={index}>
              <div
                className="slide"
                style={{
                  backgroundImage: `linear-gradient(rgba(61, 21, 21, 0.658), rgba(0, 0, 0, 0.5)),url(${slideImage.url})`,
                  backgroundSize:"cover",
                  backgroundPosition:"center",
                  height: "100vh",
                }}
              >
                <div className="slide-caption">
                  <motion.div variants={slideVariants} initial="leftBefore" animate="leftAfter" className="caption-text">{slideImage.caption}</motion.div>
                  <motion.div variants={slideVariants} initial="rightBefore" animate="rightAfter">
                    <Link to={slideImage.linkTo}>
                      <button style={{ display: "flex", alignItems: "center" }}>
                        {slideImage.icon}&nbsp;{slideImage.btnText}
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </Fade>
      </div>:""}
    </div>
  );
};

export default Header;