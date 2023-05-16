import { SlGraduation } from "react-icons/sl";
import {HiLightBulb} from "react-icons/hi"
import {IoIosArrowForward} from "react-icons/io"
import { useEffect } from "react";
import { LearnContent } from "../../data/LearnContent";
import { useActiveMenu } from "react-active-menu";
import './Learn.css'

const Separator = () => {
  return (
    <div className="separator ">
      <div className="sep">
        <img src="/assets/house-icon.png" alt="" style={{height:"30px",width:"30px"}}/>
      </div>
      <div className="sep">
        <img src="/assets/house-icon.png" alt="" style={{height:"37px",width:"37px"}}/>
      </div>
      <div className="sep">
        <img src="/assets/house-icon.png" alt="" style={{height:"43px",width:"43px"}}/>
      </div>
    </div>
  );
};


const Learn = () => {

  const {registerSection, registerTrigger } = useActiveMenu({
    offset:260,
    smooth:true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="learn">
      <div className="learn-starting">
        <div>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SlGraduation />
            &nbsp;
            <span>Learn</span>
          </h1>
          <p>Learn about technologies we use and services we offer</p>
        </div>
      </div>
      <div style={{display:"flex"}}>
        <div className="sidebar">
          <h1><HiLightBulb/>&nbsp;Asaan Info</h1>
            <div>
            {LearnContent.map((el)=>(
              <p ref={registerTrigger(el.title)}><IoIosArrowForward/>&nbsp;{el.title}</p>
            ))}
            </div>
        </div>
        <div className="learn-info">
          {LearnContent.map((def)=>(
            <>
            <section className="def" ref={registerSection(def.title)}>
              <h3>{def.title}</h3>
              <p>{def.content}</p>
            </section>
            {LearnContent[LearnContent.length - 1].title !== def.title ? <Separator /> : ""}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;