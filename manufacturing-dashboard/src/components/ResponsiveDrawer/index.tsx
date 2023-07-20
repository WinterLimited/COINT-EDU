// src/components/ResponsiveDrawer.tsx
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from '../Sidebar';
import Appbar from '../Appbar';
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/authSlice";

interface Props {
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const {window} = props;
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Appbar handleLogout={handleLogout}/> {/* AppBar 컴포넌트 사용 */}
            <Sidebar window={window} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} open={false}/>
            <Container sx={{mt: 10}}>
                <Outlet/>
            </Container>
        </Box>
    );
}
