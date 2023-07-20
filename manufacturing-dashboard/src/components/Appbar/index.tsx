// src/components/AppBar.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


interface AppBarProps {
    handleLogout: () => void;
}

const Appbar: React.FC<AppBarProps> = ({handleLogout}) => {
    const drawerWidth = 240;
    return (
        <AppBar
            position="fixed"
            sx={{
                width: {sm: `calc(100% - ${drawerWidth}px)`},
                ml: {sm: `${drawerWidth}px`},
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    TODO: 활동중인 탭 정렬 <br/>
                </Typography>

                <Box sx={{flexGrow: 1}}/>

                <Tooltip title="Logout">
                    <IconButton
                        color="inherit"
                        aria-label="logout"
                        edge="end"
                        onClick={handleLogout}
                    >
                        <ExitToAppIcon/>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
