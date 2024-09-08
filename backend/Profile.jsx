import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Drawer, List, ListItem, ListItemText, Divider, Box, TextField, Button, Grid, Hidden, LinearProgress } from '@mui/material';
import { PhotoCamera, Menu as MenuIcon, Facebook as FacebookIcon } from '@mui/icons-material'; // Added Facebook Icon
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const drawerWidth = 240;

export default function ProfilePage() {
  const [profilePic, setProfilePic] = useState(''); // Empty avatar initially
  const [mobileOpen, setMobileOpen] = useState(false); // For controlling mobile drawer
  const [userType, setUserType] = useState(''); // Empty user type initially
  const [isFacebookLinked, setIsFacebookLinked] = useState(false); // Check if Facebook is linked
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    dob: '', // Date of birth for individual user
    orgName: '',
    adminFullName: '',
    orgPhoneNumber: '',
    orgWebsite: ''
  });
  const [points, setPoints] = useState(120); // Example points balance
  const [level, setLevel] = useState(3); // Example current level
  const [levelProgress, setLevelProgress] = useState(60); // Example level progress in percentage

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Retrieve JWT token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get user details
      const decoded = jwtDecode(token);
      setUserType(decoded.userType);

      // Fetch user data from the backend
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const data = response.data;
  
        // Map the backend data keys to formData keys
        const updatedFormData = {
          email: data.email || '',
          fullName: data.admin_full_name || data.full_name || '',
          phoneNumber: data.phone_no || '',
          dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '', // Formats as YYYY-MM-DD
          orgName: data.org_name || '',
          adminFullName: data.admin_full_name || '',
          orgPhoneNumber: data.phone_no || '',
          orgWebsite: data.org_website || '',
        };
  
        setFormData(updatedFormData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put('http://localhost:3000/profile', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Function to handle Facebook account linking
  const handleLinkFacebook = () => {
    window.location.href = 'http://localhost:3000/auth/facebook'; // Redirect to your backend route
  };

  const drawerContent = (
    <Box>
      {/* Profile Section */}
      <List>
        <ListItem>
          <Avatar sx={{ width: 100, height: 100 }} src={profilePic || '/static/images/avatar-placeholder.png'} /> {/* Placeholder if no image */}
        </ListItem>
        <ListItem>
          <ListItemText primary={userType === 'organization' ? formData.adminFullName : formData.fullName} secondary={userType === 'organization' ? 'Organization' : 'Individual'} />
        </ListItem>
        <Divider />

        {/* Personal Information Section */}
        <ListItem>
          <Typography variant="body2">Email: {formData.email || 'Not provided'}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">Phone: {userType === 'organization' ? formData.orgPhoneNumber : formData.phoneNumber || 'Not provided'}</Typography>
        </ListItem>
        <Divider />

        {/* Points and Levels Section */}
        <ListItem>
          <Typography variant="body2">Points: {points}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">Level: {level}</Typography>
        </ListItem>
        <ListItem>
          <LinearProgress variant="determinate" value={levelProgress} />
        </ListItem>
        <ListItem>
          <Button variant="contained" sx={{ mt: 1 }}>Redeem Points</Button>
        </ListItem>
        <Divider />

        {/* Account Management Section */}
        <ListItem button>
          <ListItemText primary="Security Settings" />
        </ListItem>
        <Divider />

        <ListItem button>
          <ListItemText primary="View Public Profile" />
        </ListItem>

        <Divider />

        {/* Facebook Linking Section */}
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FacebookIcon />} // Facebook Icon added
            onClick={handleLinkFacebook}
            sx={{ mt: 2 }}
          >
            {isFacebookLinked ? 'Facebook Linked' : 'Link Facebook Account'}
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Responsive Sidebar */}
      <Hidden smDown>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Mobile Drawer */}
      <Hidden smUp>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <IconButton color="inherit">
            <Avatar src={profilePic || '/static/images/avatar-placeholder.png'} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          mt: 8,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Typography variant="h5">Account Settings</Typography>

        {/* Profile Picture Upload */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar src={profilePic || '/static/images/avatar-placeholder.png'} sx={{ width: 150, height: 150, mx: 'auto' }} />
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 2 }}
                startIcon={<PhotoCamera />}
              >
                Change Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
              </Button>
            </Box>
          </Grid>

          {/* Form Fields */}
          <Grid item xs={12} sm={8}>
            <Box component="form" sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                {/* Common Fields */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: formData.email ? true : undefined }}
                  />
                </Grid>

                {userType === 'organization' ? (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Organization Name"
                        variant="outlined"
                        name="orgName"
                        value={formData.orgName || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: formData.orgName ? true : undefined }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Admin Full Name"
                        variant="outlined"
                        name="adminFullName"
                        value={formData.adminFullName || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: formData.adminFullName ? true : undefined }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        name="orgPhoneNumber"
                        value={formData.orgPhoneNumber || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: formData.orgPhoneNumber ? true : undefined }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Organization Website"
                        variant="outlined"
                        name="orgWebsite"
                        value={formData.orgWebsite || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: formData.orgWebsite ? true : undefined }}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        name="fullName"
                        value={formData.fullName || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: formData.fullName ? true : undefined }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        name="phoneNumber"
                        value={formData.phoneNumber || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: formData.phoneNumber ? true : undefined }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        variant="outlined"
                        name="dob"
                        value={formData.dob || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{
                          shrink: formData.dob ? true : undefined,
                        }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleUpdateProfile}
              >
                Update Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
