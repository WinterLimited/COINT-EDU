import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import sidebarLogo from '../../assets/coint.png';

import {AccountCircle, Factory, Construction} from "@mui/icons-material";
import SidebarItem from "./SidebarItem";

const drawerWidth = 240;

interface SidebarProps {
    window?: () => Window;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    open: boolean;
}

// List의 배열을 관리하기 위한 interface
interface SidebarItemState {
    title: string;
    items: string[];
    icon: JSX.Element;
    open: boolean;
}

const Sidebar = (props: SidebarProps) => {
    const {window, mobileOpen, handleDrawerToggle, open} = props;
    const [openState, setOpenState] = React.useState<{ [key: string]: boolean }>({}); // List별로 open 상태를 관리하기 위한 state

    // 현재 useState를 통해 SidebarItem들을 관리
    // Redux 혹은 Context API에 전역상태로 정보를 관리하여 Auth 정보에 따라 다른 SidebarItem을 보여주게 변경 가능
    const initialSidebarItems: SidebarItemState[] = [
        {title: "사용자관리", items: ["Menu1", "Menu2", "Menu3", "Menu4",], icon: <AccountCircle/>, open: false},
        {title: "공정관리", items: ["Proccess1", "Proccess2"], icon: <Factory/>, open: false},
        {title: "설비관리", items: ["Equipment1", "Equipment2"], icon: <Construction/>, open: false},
        // 필요한 만큼 추가
    ];

    // handleClick을 통해 각 List의 open 상태관리
    const [sidebarItems, setSidebarItems] = React.useState<SidebarItemState[]>(initialSidebarItems);

    const handleItemClick = (title: string) => {
        setSidebarItems(sidebarItems.map(item =>
            item.title === title ? {...item, open: !item.open} : item
        ));
    };


    const drawer = (
        <div>
            <Toolbar>
                <img src={sidebarLogo} alt="Logo" style={{marginRight: '10px', width: '40px'}}/>
                <Typography variant="h6" noWrap component="div">
                    Coint Company <br/>
                    MES System
                </Typography>
            </Toolbar>

            <List>

                {/* SidebarItem을 반복문을 통해 생성 */}
                <List>
                    {sidebarItems.map((item, index) => (
                        <SidebarItem
                            key={index}     // Warning: Each child in a list should have a unique "key" prop. -> 추후 uuid 혹은 데이터베이스 id로 변경
                            title={item.title}
                            items={item.items}
                            icon={item.icon}
                            open={item.open}
                            onClick={() => handleItemClick(item.title)}
                        />
                    ))}
                </List>

                {/* Repeat for other primary list items as needed */}
            </List>

            {/*<Divider/> -> hr Divider */}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    // mobile일 때는 Drawer를 temporary로, 아닐 때는 permanent로
    return (
        <React.Fragment>

            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen} // 모바일 환경에서는 mobileOpen 사용
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: {xs: 'none', sm: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
                open={open} // 비모바일 환경에서는 open 사용
            >
                {drawer}
            </Drawer>

        </React.Fragment>
    );
}

export default Sidebar;
