'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Grid, Box, Typography, Button, Divider, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import IndividualForm from './IndividualForm';
import OrganizationForm from './OrganizationForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [userType, setUserType] = useState('individual');
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const handleChangeUserType = (event) => setUserType(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/signup', { ...formData, userType }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        toast.success('Signup successful!');
        console.log('Signup successful:', response.data);
        setTimeout(() => router.push('/login'), 2000);
      } else {
        toast.error('Signup failed: ' + response.data.message);
        console.error('Signup failed:', response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error('Error during signup: ' + error.response.data.message);
        console.error('Error during signup:', error.response.data);
      } else {
        toast.error('Error during signup: ' + error.message);
        console.error('Error during signup:', error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Grid container style={{ height: '100vh', margin: 0, padding: 0 }}>
        <Grid item xs={12} md={6} style={{ padding: 0, margin: 0 }}>
          <img 
            src="/dhanuraiprofile.png" 
            alt="Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', margin: 0, padding: 0 }} 
          />
        </Grid>
        <Grid item xs={12} md={6} container justifyContent="center" alignItems="center" style={{ padding: 20 }}>
          <Box style={{ width: '100%', maxWidth: 400 }}>
            <Box textAlign="center" mb={2}>
              <Typography variant="h5" component="h1" gutterBottom>
                Sign Up
              </Typography>
            </Box>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Typography variant="h6" component="h2" gutterBottom>Select Account Type</Typography>
              <RadioGroup row value={userType} onChange={handleChangeUserType}>
                <FormControlLabel
                  value="individual"
                  control={<Radio sx={{ color: '#5726BF', '&.Mui-checked': { color: '#5726BF' } }} />}
                  label="Individual"
                />
                <FormControlLabel
                  value="organization"
                  control={<Radio sx={{ color: '#5726BF', '&.Mui-checked': { color: '#5726BF' } }} />}
                  label="Organization"
                />
              </RadioGroup>

              {userType === 'individual' ? 
                <IndividualForm setFormData={setFormData} /> : 
                <OrganizationForm setFormData={setFormData} />
              }

              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ marginTop: 16, backgroundColor: '#5726BF' }}
              >
                Sign Up
              </Button>
              <Box mt={2} display="flex" alignItems="center">
                <Divider style={{ flexGrow: 1 }} />
                <Typography variant="body2" style={{ margin: '0 16px', color: '#5726BF' }}>
                  or
                </Typography>
                <Divider style={{ flexGrow: 1 }} />
              </Box>
              <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
                Already have an account? <Link href="/login" passHref><Button color="primary" style={{ color: '#5726BF' }}>Login</Button></Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default SignupPage;


