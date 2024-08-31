
'use client';
import React, { useState, useEffect } from 'react';
import { Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';

const OrganizationForm = ({ setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    orgName: '',
    adminFullName: '',
    phoneNo: '',
    orgWebsite: ''
  });

  useEffect(() => {
    setFormData(formValues);
  }, [formValues, setFormData]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField  
          name="email"
          value={formValues.email}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal" 
          placeholder="Enter your email address"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: '#5726BF' }} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            sx: { color: '#5726BF' }
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          name="password"
          type={showPassword ? 'text' : 'password'} 
          value={formValues.password}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal" 
          placeholder="Enter your password"
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
            sx: { color: '#5726BF' }
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          name="orgName"
          value={formValues.orgName}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal" 
          placeholder="Organization name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon sx={{ color: '#5726BF' }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField 
          name="adminFullName"
          value={formValues.adminFullName}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal" 
          placeholder="Admin's full name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: '#5726BF' }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField 
          name="phoneNo"
          value={formValues.phoneNo}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal" 
          placeholder="Phone number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: '#5726BF' }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          name="orgWebsite"
          value={formValues.orgWebsite}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal" 
          placeholder="Organization's website"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LanguageIcon sx={{ color: '#5726BF' }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}

export default OrganizationForm;

