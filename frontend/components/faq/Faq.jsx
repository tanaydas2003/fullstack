'use client';
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, Box, Avatar, Grid, Link } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import ChatIcon from '@mui/icons-material/Chat';
import BuildIcon from '@mui/icons-material/Build';
import ContactSection from './ContactSection';
import Footer from './Footer';

const Faq = () => {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: '#0D0C24', width: '100%' }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              {/* Image on the left */}
              <img
                src="./dhanuraiprofile.png"
                alt="Logo"
                style={{ height: '50px', width: 'auto' }}
              />
            </Grid>
            <Grid item>
              {/* Profile icon on the right */}
              <IconButton edge="end" color="inherit">
                <Avatar />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container component="main" sx={{ flexGrow: 1, bgcolor: 'transparent', p: 3, width: '100%' }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ mt: 5, mb: 5, color: '#000' }}>
          How Can We Help?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { icon: SettingsIcon, label: 'Getting Started' },
            { icon: LoginIcon, label: 'User Login' },
            { icon: PersonIcon, label: 'My Account' },
            { icon: LockIcon, label: 'Security' },
            { icon: VideoLibraryIcon, label: 'Video' },
            { icon: ChatIcon, label: 'Communication' },
            { icon: BuildIcon, label: 'Customization' },
            { icon: SettingsIcon, label: 'Settings Options' },
          ].map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3} textAlign="center" sx={{
              my: 4,
              p: 2,  // Padding around the icons and text
              transition: 'background-color 0.3s',  // Smooth transition for background color
              '&:hover': {
                bgcolor: '#fff',  // White background on hover
                color: '#0D0C24',  // Text color on hover
              }
            }}>
              <item.icon
                fontSize="inherit"
                sx={{
                  fontSize: 60,
                  color: 'primary.main',
                }}
              />
              <Typography variant="h6" sx={{ mt: 1, color: 'inherit' }}>
                {item.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Section */}
      <ContactSection />
      <Footer />
    </Box>
  );
};

export default Faq;
