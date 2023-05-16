import { AiOutlineHome, AiOutlinePhone} from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { BsBuilding } from "react-icons/bs";
import { RiUserSharedLine } from "react-icons/ri";
import { SlGraduation } from "react-icons/sl";
import {TiThMenuOutline} from "react-icons/ti"
import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Navbar.css'

const drawerWidth = 240;
const navItems = [{name:'Home',link:'/',icon:<AiOutlineHome/>}, {name:'Projects',link:'/projects',icon:<BsBuilding/>}, {name:'Learn',link:'/learn',icon:<SlGraduation/>},{name:'About',link:'/about',icon:<IoPeopleOutline/>}, {name:'Contact',link:'/contact',icon:<AiOutlinePhone/>}];



const Navbar = ({ navbarScroll }) => {

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center',height:"100vh" ,backgroundColor:"#302c2c",color:"whitesmoke" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src="/assets/logo8.png" alt="" />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link to={item.link}>
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ justifyContent: 'center',display:"flex",alignItems:"center",color:"whitesmoke",margin:"3px auto" }}>
                <div>{item.icon}</div>&nbsp;
                <div>{item.name}</div>
                {/* <ListItemText primary={item.name} /> */}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Link to="/sign-in">
        <button className="drawer-btn">
          <RiUserSharedLine />
          &nbsp;<span>Sign In</span>
        </button>
      </Link>
      <h5 style={{color:"gray",position:"absolute",bottom:"0"}}>&copy; {new Date().getFullYear()} Asaan REITurns. All Rights Reserved.</h5>
    </Box>
  );

  const container = window !== undefined ? () => window.document.body : undefined;


  return (
    <nav
      className={
        navbarScroll
          ? "normal"
          : navbarScroll !== undefined
          ? "active"
          : "other"
      }
    >
      <div>
        <img src="/assets/logo8.png" alt="" />
      </div>
      <div className="nav-links">
        <ul>
          <li className="nav-link">
            <Link to="/">
              <AiOutlineHome />
              &nbsp;<span>Home</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/projects">
              <BsBuilding />
              &nbsp;<span>Projects</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/learn">
              <SlGraduation />
              &nbsp;<span>Learn</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/about">
              <IoPeopleOutline />
              &nbsp;<span>About</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/contact">
              <AiOutlinePhone />
              &nbsp;<span>Contact</span>
            </Link>
          </li>
          <li>
            <Link to="/sign-in">
              <button>
                <RiUserSharedLine />
                &nbsp;<span>Sign In</span>
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="hambtn" onClick={handleDrawerToggle}>
        <TiThMenuOutline/>
      </div>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
    </nav>
  );
};

export default Navbar;