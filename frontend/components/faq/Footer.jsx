import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f9f9f9', py: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              DHANUR AI
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Company
            </Typography>
            <Link href="#" sx={{ display: 'block', color: '#555', mb: 2, textDecoration: 'none' }}>
              About Us
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#555', mb: 2, textDecoration: 'none' }}>
              Our Mission
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#555', mb: 2, textDecoration: 'none' }}>
              Contact Sales
            </Link>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Services
            </Typography>
            <Link href="#" sx={{ display: 'block', color: '#555', mb: 2, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Products & Services
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#555', mb: 2, textDecoration: 'none' }}>
              Customer Stories
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#555', mb: 2, textDecoration: 'none' }}>
              Download Apps
            </Link>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Information
            </Typography>
            <Link href="#" sx={{ display: 'block', color: '#555', mb: 2, textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#555', mb: 2, textDecoration: 'none' }}>
              Terms & Conditions
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#555', mb: 2, textDecoration: 'none' }}>
              Join Us
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Created in 2024 by Dhanur AI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
