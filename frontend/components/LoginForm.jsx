
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Grid, TextField, Button, Typography, Box, Checkbox, FormControlLabel, Divider, InputAdornment, IconButton, RadioGroup, Radio } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config();


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('individual');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChangeUserType = (event) => setUserType(event.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/login', {
        userType,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('Login successful!');
        localStorage.setItem('token', response.data.token);
        console.log('Login successful:', response.data);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        toast.error('Login failed: ' + response.data.message);
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      toast.error('Error during login: ' + error.message);
      console.error('Error during login:', error);
    }
  };

  // const handleGoogleLogin = () => {
  //   window.location.href = 'http://localhost:3000/login/google';
  // };
  const handleGoogleLogin = () => {
    const url = `http://localhost:3000/login/google?userType=${userType}`;
    window.location.href = url;
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:3000/login/github';
  };

  return (
    <Grid container style={{ height: '100vh', margin: 0, padding: 0 }}>
      <ToastContainer />
      {/* Image Section */}
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

      {/* Login Form Section */}
      <Grid item xs={12} md={6} container justifyContent="center" alignItems="center" style={{ padding: 20 }}>
        <Box style={{ width: '100%', maxWidth: 400 }}>
          <Box textAlign="center" mb={2}>
            <Typography variant="h5" component="h1" gutterBottom>
              Hello! Welcome back
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
          <Box component="form" noValidate autoComplete="off" onSubmit={handleLogin}>
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
            <Typography variant="h6" component="h2" gutterBottom>Password</Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <FormControlLabel
                control={<Checkbox name="rememberMe" color="default" sx={{ '&.Mui-checked': { color: '#5726BF' } }} />}
                label="Remember me"
              />
              <Link href="/forgot-password" passHref>
                <Button color="primary" style={{ color: '#5726BF' }}>Forgot Password?</Button>
              </Link>
            </Box>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              style={{ marginTop: 16, backgroundColor: '#5726BF' }}
            >
              Login
            </Button>
            <Box mt={2} display="flex" alignItems="center">
              <Divider style={{ flexGrow: 1 }} />
              <Typography variant="body2" style={{ margin: '0 16px', color: '#5726BF' }}>
                or
              </Typography>
              <Divider style={{ flexGrow: 1 }} />
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button onClick={handleGoogleLogin} variant="outlined" color="primary" style={{ flexGrow: 1, marginRight: 8, borderColor: '#5726BF', color: '#5726BF' }}>
                <GoogleIcon sx={{ color: '#5726BF' }} />
              </Button>
              <Button onClick={handleGitHubLogin} variant="outlined" color="primary" style={{ flexGrow: 1, borderColor: '#5726BF', color: '#5726BF' }}>
                <GitHubIcon sx={{ color: '#5726BF' }} />
              </Button>
            </Box>
            <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
              Don't have an account? <Link href="/signup" passHref><Button color="primary" style={{ color: '#5726BF' }}>SIGNUP</Button></Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;













