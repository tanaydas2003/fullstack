import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Link, Modal, Button } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import HubSpotForm from '../HubSpotForm'; // Import the HubSpot form component
const ContactSection = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: '100%', bgcolor: 'white', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <MailOutlineIcon sx={{ mr: 3, color: 'primary.main', fontSize: '3rem' }} />
            <Box>
              <Typography variant="subtitle1" sx={{ display: 'block', color: '#333', fontWeight: 'bold', mb: 1 }}>
                Need more help?
              </Typography>
              <Button 
                onClick={handleOpen} 
                variant="contained" 
                sx={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', backgroundColor: 'primary.main' }}>
                Contact Us
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneInTalkIcon sx={{ mr: 3, color: 'primary.main', fontSize: '3rem' }} />
            <Box>
              <Typography variant="subtitle1" sx={{ display: 'block', color: '#333', fontWeight: 'bold', mb: 1 }}>
                Interested in our products?
              </Typography>
              <Typography variant="body1" sx={{ display: 'block', color: '#555', mb: 1 }}>
                Our sales representatives can help you choose{' '}
                <Link href="#" sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none' }}>
                  call us
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Modal to display the HubSpot form */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="contact-form-modal"
        aria-describedby="contact-form-modal-description"
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="contact-form-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
            Contact Us
          </Typography>
          <HubSpotForm /> {/* Embed the HubSpot form here */}
        </Box>
      </Modal>
    </Box>
  );
};

export default ContactSection;
