
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Grid, TextField, Button, Typography, Box, RadioGroup, FormControlLabel, Radio, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordPage = () => {
  const [userType, setUserType] = useState('individual');
  const [email, setEmail] = useState('');

  const handleChangeUserType = (event) => setUserType(event.target.value);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/forgot-password', {
        userType,
        email,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('OTP sent to your email!');
        localStorage.setItem('forgotPasswordEmail', email);
        localStorage.setItem('forgotPasswordUserType', userType);
        localStorage.setItem('otpToken', response.data.otpToken);
        setTimeout(() => { 
            window.location.href = '/Reset-Password';          
        }, 2000);
      } else {
        toast.error('Failed to send OTP: ' + response.data.message);
      }
    } catch (error) {
      toast.error('Error during request: ' + error.message);
      console.log(error);
    }
  };

  return (
    <Grid container style={{ height: '100vh', margin: 0, padding: 0 }}>
      <ToastContainer />
      <Grid item xs={12} md={6} style={{ padding: 0, margin: 0 }}>
        <img
          src="/dhanuraiprofile.png"
          alt="Logo"
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            display: 'block',
            margin: 0,
            padding: 0,
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} container justifyContent="center" alignItems="center" style={{ padding: 20 }}>
        <Box style={{ width: '100%', maxWidth: 400 }}>
          <Box textAlign="center" mb={2}>
            <Typography variant="h5" component="h1" gutterBottom>
              Forgot Password
            </Typography>
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
          </Box>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleForgotPassword}>
            <Typography variant="h6" component="h2" gutterBottom>Email</Typography>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#5726BF' }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                sx: { color: '#5726BF' },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              style={{ marginTop: 16, backgroundColor: '#5726BF' }}
            >
              Send OTP
            </Button>
            <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
              <Link href="/login" passHref>
                <Button color="primary" style={{ color: '#5726BF' }}>Back to Login</Button>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ForgotPasswordPage;


