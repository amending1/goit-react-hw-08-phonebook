import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/operations.js';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const UserMenuContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const EmailTypography = styled(Typography)({
  marginRight: '10px',
});

const UserMenu = () => {
  const email = useSelector(state => state.auth.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <UserMenuContainer>
      <EmailTypography variant="body1">{email}</EmailTypography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </UserMenuContainer>
  );
};

export default UserMenu;

// tu mam komponent do wyświetlania menu użytkownika, takie jak wylogowanie
