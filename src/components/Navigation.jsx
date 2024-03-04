import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import UserMenu from './UserMenu.jsx';

const StyledButton = styled(Button)({
  textDecoration: 'none',
  color: 'white',
  marginRight: '20px',
});

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Phonebook</Typography>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button color="inherit">Register</Button>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button color="inherit">Login</Button>
        </Link>
        <Link to="/contacts" style={{ textDecoration: 'none' }}>
          <StyledButton color="inherit">Contacts</StyledButton>
        </Link>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;

//tu mam komponent odpowiedzialny za nawigację w aplikacji. Renderuje paski nawigacyjne i przyciski do różnych stron.
