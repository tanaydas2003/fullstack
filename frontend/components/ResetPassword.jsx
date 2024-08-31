'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Grid, TextField, Button, Typography, Box, InputAdornment, IconButton, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpToken, setOtpToken] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userType, setUserType] = useState('individual');

  useEffect(() => {
    // Retrieve email and userType from local storage
    const storedEmail = localStorage.getItem('forgotPasswordEmail');
    const storedUserType = localStorage.getItem('forgotPasswordUserType');
    const otpToken = localStorage.getItem('otpToken');
    if (storedEmail) setEmail(storedEmail);
    if (storedUserType) setUserType(storedUserType);
    if (otpToken) setOtpToken(otpToken);
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/reset-password', {
        email,
        otp,
        newPassword,
        userType,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${otpToken}`
        }
      });

      if (response.status === 200) {
        toast.success('Password reset successful!');
      } else {
        toast.error('Failed to reset password: ' + response.data.message);
      }
    } catch (error) {
      toast.error('Error during request: ' + error.message);
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
              Reset Password
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>Select Account Type</Typography>
            <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)}>
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
          <Box component="form" noValidate autoComplete="off" onSubmit={handleResetPassword}>
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
            <Typography variant="h6" component="h2" gutterBottom>OTP</Typography>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#5726BF' }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                sx: { color: '#5726BF' },
              }}
            />
            <Typography variant="h6" component="h2" gutterBottom>New Password</Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#5726BF' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility sx={{ color: '#5726BF' }} /> : <VisibilityOff sx={{ color: '#5726BF' }} />}
                    </IconButton>
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
              Reset Password
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

export default ResetPasswordPage;
