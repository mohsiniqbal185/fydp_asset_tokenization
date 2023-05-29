import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import { FaRegHandshake, FaRegUserCircle } from 'react-icons/fa';
import './Portal.css'
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MdOutlineVisibility } from 'react-icons/md';
import { GiCrane } from 'react-icons/gi';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';

const drawerWidth = 240;

const container = window.document.body;

const Portal = () => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div className='drawer-container'>
      <Toolbar style={{color:'#f5f5f5',display:'flex',alignItems:'center',fontSize:'1.3rem'}}>
        <FaRegUserCircle/>&nbsp;
        Portal
      </Toolbar>
      <Divider />
      <List>
        {['Overview', 'Account', 'Projects', 'Policy'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color:'#cfcfcf'}}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{color:'#cfcfcf'}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Saved', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color:'#cfcfcf'}}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{color:'#cfcfcf'}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
        <div className='logo-image'>
            <img src="/assets/logo8.png" alt="" />
        </div>
    </div>
  );
    return ( 
        <div className="portal-page">
            <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },position:'relative'}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,background:'#302c2c' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,background:'#302c2c' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div className='heading'>
                <span className='heading-icon'><MdOutlineVisibility/></span>&nbsp;
                <span>Overview</span>
            </div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{fontSize:'1.1rem',marginRight:'10px',marginTop:'10px'}}
              >
                <AccountCircle/>&nbsp;
                User
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
        <div className="boxes">
            <div className="box">
                <div className='box-icon'><AiOutlineUser/></div>
                <h4>Username</h4>
                <h2>User</h2>
            </div>
            <div className="box">
                <div className='box-icon'><GiCrane/></div>
                <h4>Projects Invested</h4>
                <h2>2</h2>
            </div>
            <div className="box">
                <div className='box-icon'><AiOutlineHeart/></div>
                <h4>Saved Projects</h4>
                <h2>3</h2>
            </div>
            <div className="box">
                <div className='box-icon'><FaRegHandshake/></div>
                <h4>Joined</h4>
                <h2>10 Feb 2021</h2>
            </div>
        </div>
      </div>
        </div>
     );
}
 
export default Portal;