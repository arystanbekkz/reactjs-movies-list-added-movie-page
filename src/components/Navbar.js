import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()

    return (
        <AppBar position="static" sx={{backgroundColor: "#1D1D1D"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Button
                            onClick={() => navigate('/movies')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Movies
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};