import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { projects } from "../../data/Data.js";
import {BiBuildingHouse} from "react-icons/bi"
import {GiPriceTag,GiToken} from "react-icons/gi"
import {BsFillCheckCircleFill} from "react-icons/bs"
import {RxDimensions} from "react-icons/rx"
import {AiOutlineInfoCircle} from "react-icons/ai"
import {GrGallery} from "react-icons/gr"
import {MdLocationOn} from "react-icons/md"
import {IoLocationOutline} from "react-icons/io5"
import './SingleProperty.css'
import {motion} from 'framer-motion'
import { containerVariants } from "../../animations/animation.js";
import axios from "axios";


const randomImage1 = 'https://source.unsplash.com/900x500/?house'
const randomImage2 = 'https://source.unsplash.com/900x500/?house,building'
const randomImage3 = 'https://source.unsplash.com/900x500/?house,apartment'
const randomImage4 = 'https://source.unsplash.com/900x500/?house,home'
const randomImage5 = 'https://source.unsplash.com/900x500/?home,building'

const SingleProperty = () => {

  const property_id = useParams().property_id;

  const [property, setProperty] = useState(null)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/user/properties/${property_id}`)
        console.log(res.data[0])
        setProperty(res.data[0])
        // console.log(res.data[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchProperty()
  }, [])

  // const { id } = useParams();
  // const [image, setImage] = useState(null);

  let currentProject;
  // useEffect(() => {
  //   currentProject = projects.filter((p) => p.name === id);
  //   setImage(currentProject[0].image);
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="single-property">
      <div className="property-image">
        <img src={property?.image ? property.image : ""} alt="property image" />
        <div className="tagname">
          <div>
            <h2><BiBuildingHouse/>&nbsp;{property?.property_name}</h2>
          </div>
        </div>
      </div>
      <div className="single-property-content">
      <div className="property-info">
              {/* <div className="info">
                <h5><RxDimensions/>&nbsp;Area</h5>
                <h6>{property?.size_of_property} yards</h6>
              </div> */}
              <div className="info">
                <h5><GiPriceTag/>&nbsp;Token Price</h5>
                <h6>Rs. {property?.token_price}</h6>
              </div>
              <div className="info">
                <h5><GiToken/>&nbsp;Total Tokens</h5>
                <h6>{property?.total_supply}</h6>
              </div>
              <div className="info">
                <h5><BsFillCheckCircleFill/>&nbsp;Tokens Available</h5>
                <h6>{property?.tokens_left}</h6>
              </div>
          </div>
      <div className="property-desc">
        <h2><AiOutlineInfoCircle/>&nbsp;Property Description:</h2>
        <div className="description">
          <p>
          {/* {id} is an impressive modern structure that stands out amidst the */}
           surrounding landscape. It is a multi-story building with a sleek and
            contemporary design that combines glass and steel, with clean lines
             and angular shapes. The facade features floor-to-ceiling windows that
              flood the interior with natural light and provide stunning views of the
               surrounding cityscape. As you enter the building, you are welcomed by a
                grand lobby with high ceilings, polished marble floors, and modern
                 furnishings. The lobby is spacious and inviting, with comfortable
                  seating areas and sleek artwork that adds a touch of sophistication
                   to the space. 
          </p>
        </div>
      </div>
      <div className="property-location">
        <h2><IoLocationOutline/>&nbsp;Location:</h2>
        <div className="location">
          <div><h3>{property?.location}</h3></div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d924234.6302710465!2d66.59495074892502!3d25.19338946981612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1677525227222!5m2!1sen!2s" height="400" className="map" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <div className="property-gallery">
        <h2><GrGallery/>&nbsp;Gallery:</h2>
        <div className="gallery">
          <img src={randomImage1} alt="Real estate image" />
          <img src={randomImage2} alt="Real estate image" />
          <img src={randomImage3} alt="Real estate image" />
          <img src={randomImage4} alt="Real estate image" />
          <img src={randomImage5} alt="Real estate image" />
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default SingleProperty;