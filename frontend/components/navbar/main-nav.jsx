'use client';
import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  backgroundColor: '#E0D1FF',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  borderRadius: theme.shape.borderRadius,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export function MainNav() {
  const router = useRouter(); // Initialize the router
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the dropdown menu
  const open = Boolean(anchorEl);

  const handleProfileClick = () => {
    router.push('/profile'); // Redirect to the profile page
    handleClose(); // Close the menu
  };

  const handleLogoutClick = () => {
    // Implement logout functionality here
    // For example, you might want to clear the user session and redirect to the login page
    console.log('User logged out'); // Placeholder for actual logout logic
    handleClose(); // Close the menu
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', minHeight: '64px', px: 2 }}
        >
          <Typography variant="h5" sx={{ flexGrow: 0, fontWeight: 'bold', px: '10px' }}>
            All Brands
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'center',
            }}
          >
            <Tooltip title="Search">
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlassIcon size={10} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search app"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Tooltip>
          </Box>
          <Stack sx={{ alignItems: 'center', flexGrow: 0 }} direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                backgroundColor: '#5726BF',
                '&:hover': { backgroundColor: '#451f9e' },
                width: '130px',
                height: '35px',
                padding: '8px 16px',
                gap: '8px',
              }}
            >
              Invite
            </Button>
            <Tooltip title="Notifications">
              <IconButton>
                <BellIcon />
              </IconButton>
            </Tooltip>
            {/* Avatar with dropdown menu */}
            <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
              <Avatar src="/frontend/assets/dhanuraiprofile.png" sx={{ cursor: 'pointer' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}