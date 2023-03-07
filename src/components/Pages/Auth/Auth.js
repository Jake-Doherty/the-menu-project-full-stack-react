import React, { useState } from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { useUser } from '../../../context/UserContext.js';
import { authUser } from '../../../services/auth.js';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme as useMuiTheme } from '@emotion/react';
import { Alert, Snackbar, Typography } from '@mui/material';
import Image from 'mui-image';

const menuIcon = require('../../../assets/images/menu_book.png');

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { type } = useParams();
  const { user, setUser } = useUser();
  const theme = useMuiTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  if (user) {
    return <Navigate to="/home" />;
  }

  const submitAuth = async () => {
    try {
      const newUser = await authUser(email, password, type);
      setUser(newUser);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setSnackbarSeverity('error');
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === '') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        action={
          <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert
          onClick={handleClose}
          onClose={handleClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarSeverity === 'error' && error}
        </Alert>
      </Snackbar>
      <Box
        component={'section'}
        sx={{
          position: 'absolute',
          top: '0px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            textAlign: 'right',
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: window.innerWidth > 600 ? '5rem' : '3rem',
              color: theme.palette.primary.contrastText,
              textShadow: '2px 2px 5px rgb(0 0 0 / 50%)',
            }}
          >
            The
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: window.innerWidth > 600 ? '5rem' : '3rem',
              color: theme.palette.primary.contrastText,
              textShadow: '2px 2px 5px rgb(0 0 0 / 50%)',
            }}
          >
            Menu
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: window.innerWidth > 600 ? '5rem' : '3rem',
              color: theme.palette.primary.contrastText,
              textShadow: '2px 2px 5px rgb(0 0 0 / 50%)',
            }}
          >
            Project
          </Typography>
        </Box>
        <Image
          src={menuIcon}
          alt="The Menu Project"
          style={{
            margin: window.innerWidth > 768 ? '0 0 0 -10px' : '0 0 0 0',
            height: window.innerWidth > 768 ? '260px' : '150px',
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          width: '300px',
          height: '330px',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: theme.palette.primary.main,
          borderRadius: '10px',
          boxShadow: '5px 5px 15px 0.5px rgb(0 0 0 / 20%)',
          transition: 'all 0.3s ease-in-out',
          backdropFilter: 'blur(5px)',
          '&:hover': {
            boxShadow: '5px 5px 15px 2px rgb(0 0 0 / 40%)',
            transition: 'all 0.3s ease-in-out',
          },
        }}
      >
        <div className="panel-tabs">
          <NavLink
            className="is-size-6 has-text-weight-bold"
            to="/auth/sign-in"
            style={({ isActive }) => ({
              display: !isActive ? '' : 'none',
              color: theme.palette.primary.contrastText,
            })}
          >
            Have an account? Sign In here.
          </NavLink>
          <NavLink
            className="is-size-6 has-text-weight-bold"
            to="/auth/sign-up"
            style={({ isActive }) => ({
              display: !isActive ? '' : 'none',
              color: theme.palette.primary.contrastText,
            })}
          >
            {`Don't have an account? Sign Up here.`}
          </NavLink>
        </div>

        <FormControl
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.light,
              },
            },
            '& label.Mui-focused': {
              color: theme.palette.primary.contrastText,
            },
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light,
            },
            m: 1,
            width: '25ch',
          }}
          variant="outlined"
        >
          <InputLabel
            id="input-border-color"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
            htmlFor="outlined-email"
          >
            Email
          </InputLabel>
          <OutlinedInput
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.primary.contrastText,
            }}
            id="outlined-email"
            type="email"
            label="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.light,
              },
            },
            '& label.Mui-focused': {
              color: theme.palette.primary.contrastText,
            },
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light,
            },
            m: 1,
            width: '25ch',
          }}
          variant="outlined"
        >
          <InputLabel
            sx={{
              color: theme.palette.primary.contrastText,
            }}
            htmlFor="outlined-adornment-password"
          >
            Password
          </InputLabel>
          <OutlinedInput
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.primary.contrastText,
            }}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            defaultValue={password}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitAuth();
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          sx={{
            m: 1,
            width: '25ch',
            color: theme.palette.primary.contrastText,
            backgroundColor: error ? theme.palette.error.main : theme.palette.background.paper,
            border: '1px solid',
            borderColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              boxShadow: '5px 5px 10px 1px rgb(0 0 0 / 20%)',
              transition: 'all 0.3s ease-in-out',
              color: theme.palette.primary.contrastText,
            },
          }}
          variant="contained"
          onClick={submitAuth}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}
