import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import UserMenu from './UserMenu.jsx';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'white',
    marginRight: '20px',
  },
});

function Navigation() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Phonebook</Typography>
        <Link to="/" className={classes.link}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link to="/register" className={classes.link}>
          <Button color="inherit">Register</Button>
        </Link>
        <Link to="/login" className={classes.link}>
          <Button color="inherit">Login</Button>
        </Link>
        <Link to="/contacts" className={classes.link}>
          <Button color="inherit">Contacts</Button>
        </Link>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
