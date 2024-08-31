// 'use client';
// import React, { useState } from 'react';
// import { Grid, TextField, InputAdornment, IconButton } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import PersonIcon from '@mui/icons-material/Person';
// import PhoneIcon from '@mui/icons-material/Phone';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// const IndividualForm = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword(!showPassword);

//   return (
//     <>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             variant="outlined" 
//             fullWidth 
//             margin="normal" 
//             placeholder="First name"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <PersonIcon sx={{ color: '#5726BF' }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             variant="outlined" 
//             fullWidth 
//             margin="normal" 
//             placeholder="Last name"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <PersonIcon sx={{ color: '#5726BF' }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField  
//             variant="outlined" 
//             fullWidth 
//             margin="normal" 
//             placeholder="Enter your email address"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <EmailIcon sx={{ color: '#5726BF' }} />
//                 </InputAdornment>
//               ),
//             }}
//             InputLabelProps={{
//               sx: { color: '#5726BF' }
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             type={showPassword ? 'text' : 'password'} 
//             variant="outlined" 
//             fullWidth 
//             margin="normal" 
//             placeholder="Enter your password"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LockIcon sx={{ color: '#5726BF' }} />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <Visibility sx={{ color: '#5726BF' }} /> : <VisibilityOff sx={{ color: '#5726BF' }} />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             InputLabelProps={{
//               sx: { color: '#5726BF' }
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             variant="outlined" 
//             fullWidth 
//             margin="normal" 
//             placeholder="Enter your phone number"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <PhoneIcon sx={{ color: '#5726BF' }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField 
//             type="date"
//             variant="outlined" 
//             fullWidth 
//             margin="normal" 
//             label="Date of Birth"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <CalendarTodayIcon sx={{ color: '#5726BF' }} />
//                 </InputAdornment>
//               ),
//             }}
//             InputLabelProps={{
//               sx: { color: '#5726BF' }
//             }}
//           />
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// export default IndividualForm;

'use client';
import React, { useState, useEffect } from 'react';
import { Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const IndividualForm = ({ setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNo: '',
    dob: ''
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
      <Grid item xs={12} sm={6}>
        <TextField 
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal" 
          placeholder="First name"
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
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal"
          placeholder="Last name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: '#5726BF' }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
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
          name="phoneNo"
          value={formValues.phoneNo}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal" 
          placeholder="Enter your phone number"
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
          name="dob"
          type="date"
          value={formValues.dob}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal" 
          label="Date of Birth"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon sx={{ color: '#5726BF' }} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            sx: { color: '#5726BF' }
          }}
        />
      </Grid>
    </Grid>
  );
}

export default IndividualForm;


