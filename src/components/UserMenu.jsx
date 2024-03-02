import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions.js';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    userMenu: {
      display: 'flex',
      alignItems: 'center',
    },
    email: {
      marginRight: '10px',
    },
  });

const UserMenu = () => {
    const classes = useStyles();
    const email = useSelector(state => state.auth.email);
    const dispatch = useDispatch();

    const handleLogout =() => {
        dispatch(logout());
    };

    return (
        <div className={classes.userMenu}>
             <Typography variant="body1" className={classes.email}>{email}</Typography>
             <Button variant="contained" color="secondary"  onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default UserMenu;

