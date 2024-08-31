// 'use client';
// import * as React from 'react';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Box from '@mui/material/Box';
// import useMediaQuery from '@mui/material/useMediaQuery';

// export function SideNav() {
//     const [isOpen, setIsOpen] = React.useState(true);  // Sidebar is open by default
//     const isDesktop = useMediaQuery('(min-width:600px)'); // Assuming 600px is the breakpoint between mobile and desktop

//     React.useEffect(() => {
//         setIsOpen(isDesktop);  // Sidebar open state depends on screen size
//     }, [isDesktop]);

//     const toggleDrawer = (open) => () => {
//         setIsOpen(open);
//     };

//     const list = () => (
//         <List>
//             {['Item 1', 'Item 2', 'Item 3'].map((text) => (
//                 <ListItem key={text} disablePadding>
//                     <ListItemButton>
//                         <ListItemText primary={text} />
//                     </ListItemButton>
//                 </ListItem>
//             ))}
//         </List>
//     );

//     if (!isDesktop) return null;

//     return (
//         <div>
//             <Drawer
//                 anchor='left'
//                 variant='permanent'
//                 open={isOpen}
//                 sx={{ '& .MuiDrawer-paper': { width: 250 } }}
//             >
//                 <Box sx={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     height: 64, // Adjust height as needed
//                 }}>
//                     <img src="/assets/dhanuraiprofile.png" alt="Logo" style={{ height: '50px' }} />
//                 </Box>
//                 {list()}
//             </Drawer>
//         </div>
//     );
// }


'use client';
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Box, Toolbar, Typography, Divider, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import profileaIcon from "./dhanuraiprofile.png"

const drawerWidth = 240;

export function SideNav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    console.log("mobileOpen", mobileOpen);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const drawer = (
        <Box sx={{ textAlign: 'center', backgroundColor: '#0D0C24', height: '100%', color: 'white', padding: '16px' }}>
            {/* Logo */}
            <Box sx={{ marginBottom: '16px' }}>
                <Image src={profileaIcon} alt="Logo" width={200} height={100} />
            </Box>

            {/* Switch Brand Dropdown */}
            <Button
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white', marginBottom: '16px', width: '100%' }}
                endIcon={<ArrowDropDownIcon />}
                onClick={handleMenuClick}
            >
                Switch Brand
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Brand 1</MenuItem>
                <MenuItem onClick={handleMenuClose}>Brand 2</MenuItem>
            </Menu>

            {/* Create New Button */}
            <Button
                variant="contained"
                sx={{ backgroundColor: '#5726BF', marginBottom: '16px', width: '100%' }}
                startIcon={<AddIcon />}
            >
                Create New
            </Button>

            {/* Navigation Links */}
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'left', color: 'white' }}>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'left', color: 'white' }}>
                        <ListItemText primary="Recent Files" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'left', color: 'white' }}>
                        <ListItemText primary="Draft" />
                    </ListItemButton>
                </ListItem>

                {/* Separator */}
                <Divider sx={{ borderColor: '#444', margin: '16px 0' }} />

                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'left', color: 'white' }}>
                        <ListItemText primary="Channels" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'left', color: 'white' }}>
                        <ListItemText primary="Editor" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'left', color: 'white' }}>
                        <ListItemText primary="Schedule" />
                    </ListItemButton>
                </ListItem>

                {/* Separator */}
                <Divider sx={{ borderColor: '#444', margin: '16px 0' }} />

                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'left', color: 'white' }}>
                        <ListItemText primary="Teams" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'left', color: 'white' }}>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Mobile Menu Button */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { xs: 'inline-flex', sm: "none"}, color: 'black' }}
            >
                <MenuIcon />
            </IconButton>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#0D0C24' },
                }}
            >
                {drawer}
            </Drawer>
            {/* Desktop Drawer */}
            
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#0D0C24' },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}




