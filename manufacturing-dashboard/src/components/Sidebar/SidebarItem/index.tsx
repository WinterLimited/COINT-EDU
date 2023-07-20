// SidebarItem.tsx
import {Collapse, ListItem, ListItemIcon, ListItemText, List} from '@mui/material';
import {Link} from 'react-router-dom';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import * as React from 'react';

interface SidebarItemProps {
    title: string;
    items: string[];
    icon: JSX.Element;
    open: boolean;
    onClick: () => void;
}

const SidebarItem = ({title, items, icon, open, onClick}: SidebarItemProps) => {
    return (
        <React.Fragment>
            <ListItem button onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {items.map((item) => (
                        <ListItem button component={Link} to={`/${title.toLowerCase()}/${item}`}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary={item}/>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
}

export default SidebarItem;
