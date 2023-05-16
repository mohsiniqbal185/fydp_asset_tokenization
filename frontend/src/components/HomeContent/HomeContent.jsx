import { BsGear,BsPatchQuestionFill } from "react-icons/bs";
import { SlGraduation } from "react-icons/sl";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './HomeContent.css'

const HomeContent = () => {

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="process">
        <h1>
          <span class="rotate">
            <BsGear />
          </span>
          &nbsp;
          <span style={{display:'flex',alignItems:'center'}}>How does it work&nbsp;<BsPatchQuestionFill/></span>
        </h1>
        <div className="process-cards">
          <div className="process-card" onClick={()=>navigate("/sign-up")}>
            <img src="assets/first-card.jpg" alt="image" />
            <div>
              <h3>1. Register on the platform</h3>
              <p>
                Provide required information and kickstart your journey with us
              </p>
            </div>
          </div>
          <div className="process-card" onClick={()=>navigate("/projects")}>
            <img src="assets/second-card.jpg" alt="image" />
            <div>
              <h3>2. Choose your Project</h3>
              <p>Explore our projects and choose one that suits you</p>
            </div>
          </div>
          <div className="process-card" onClick={()=>navigate("/learn")}>
            <img src="assets/third-card.jpg" alt="image" />
            <div>
              <h3>3. Receive rent</h3>
              <p>
                View information related to your property on your dashboard and
                make profit through rent
              </p>
            </div>
          </div>
        </div>
        {/* <div style={{display:"flex",justifyContent:"center"}}>
          <Link to="/learn"><button className="btn"><SlGraduation/>&nbsp;Learn More</button></Link>
        </div> */}
      </div>
      <div className="home-content">
        <div className="reasons">
          <div className="heading">
            <h4>Why Asaan REITurns&nbsp;</h4>
            <div className="icon" style={{display:'flex',alignItems:'center',fontSize:'1.3rem'}}><BsPatchQuestionFill/></div>
          </div>
          <h1>A Platform to connect customers with Property Owners</h1>
          <ul>
            <li>&nbsp;Transparency</li>
            <li>&nbsp;Security</li>
            <li>&nbsp;Minimum Investment</li>
            <li>&nbsp;Trusted</li>
          </ul>
        </div>
        <div className="home-content-img">
          <img src="assets/p5-bg1.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default HomeContent;