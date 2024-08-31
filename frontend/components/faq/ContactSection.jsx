import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

const ContactSection = () => {
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
              <Typography variant="body1" sx={{ display: 'block', color: '#555', mb: 1 }}>
                Get in touch with us, support is provided daily{' '}
                <Link href="#" sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none' }}>
                  contact us
                </Link>
              </Typography>
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
    </Box>
  );
};

export default ContactSection;
