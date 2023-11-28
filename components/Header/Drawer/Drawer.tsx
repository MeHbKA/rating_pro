import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';

import Image from 'next/image'
import Link from "next/link";
import {useRouter} from "next/router"
import styles from "../../../styles/Header.module.scss";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {Button, ButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";

const drawerWidth = 320;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function HeaderDrawer() {
    const [open, setOpen] = React.useState(false);
    const [token, setToken] = useState('')
    const router = useRouter();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    useEffect(()=> {
        setToken(localStorage.getItem('token'))
        console.log(token)
    },[router.route])
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // @ts-ignore
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} color={"inherit"} className={styles.headerDrawer}>
                <Toolbar sx={{display: 'flex'}}>
                    <Box sx={{display: open ? 'none' : '', flexGrow: 1.3, justifyContent: 'center'}}>
                        <Link href={'/'}>
                            <Image src={'/logo.png'} height={52} width={103}/>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 2.5, display: open ? 'none' : 'flex', justifyContent: 'space-evenly' }}>
                        <Link href={'/findEmployee'}>
                            <a className={router.route === '/findEmployee' ? styles.active : styles.link}>Znajdź wykonawcę</a>
                        </Link>
                        <Link href={'/projects'}>
                            <a className={router.route === '/projects' ? styles.active : styles.link}>Projekty</a>
                        </Link>
                        <Link href={'/markers'}>
                            <a className={router.route === '/markers' ? styles.active : styles.link}>Zakładki</a>
                        </Link>
                        <Link href={'/incoming'}>
                            <a className={router.route === '/incoming' ? styles.active : styles.link}>Skrzynka odbiorcza</a>
                        </Link>
                        <Link href={'/blog'}>
                            <a className={ router.route === '/blog' ? styles.active : styles.link}>Blog</a>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: open ? 'flex-end' : 'space-evenly' }}>
                        <p className={styles.city}>Варшава</p>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2}}
                        >
                            <MenuIcon sx={{margin: '0 15px'}}/>
                            <Avatar alt="Remy Sharp" src="/avatar.png" className={styles.avatar}/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="temporary"
                anchor="left"
                open={open}
                className={styles.drawer}
            >
                <DrawerHeader sx={{justifyContent: "center"}}>
                    <IconButton onClick={handleDrawerClose} sx={{position: "absolute", left: 0}}>
                        <CloseIcon />
                    </IconButton>
                    <Image src={"/logo.png"} height={40} width={78} />
                </DrawerHeader>
                <Divider />
                {!token ?
                  <div>
                      <MenuItem onClick={() => router.push('/login')} className={styles.menuItem}>
                          <Typography textAlign="center">Logowanie</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => router.push('/startSpecialist')} className={styles.menuItem}>
                          <Typography textAlign="center">Stać specjalistą</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => router.push('/register')} className={styles.menuItem}>
                          <Typography textAlign="center">Rejestracja</Typography>
                      </MenuItem>
                  </div>
                  :
                  <div>
                      <MenuItem className={styles.menuItem + ' ' + styles.menuAvatar}>
                          <Avatar alt="Remy Sharp" src={token ? "" : "/avatar.png"} className={styles.avatar}/>
                          <Typography className={styles.name}>Александра Иванова</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => router.push('/findEmployee')} className={styles.menuItem}>
                          <Typography textAlign="center">Найти специалиста</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => router.push('/createAdvert')} className={styles.menuItem}>
                          <Typography textAlign="center">Создать заказ</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => router.push('/projects')} className={styles.menuItem}>
                          <Typography textAlign="center">Проекты</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => router.push('/projects')} className={styles.menuItem}>
                          <Typography textAlign="center" >Закладки</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => router.push('/incoming')} className={styles.menuItem}>
                          <Typography textAlign="center" >Входящие</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => router.push('/blog')} className={styles.menuItem}>
                          <Typography textAlign="center" >Блог</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => router.push('/blog')} className={styles.menuItem}>
                          <Typography textAlign="center" >Оплата</Typography>
                      </MenuItem>
                      <MenuItem className={styles.menuItem}>
                          <Typography textAlign="center" >Мой город: Варшава</Typography>
                      </MenuItem>
                  </div>
                }
            </Drawer>
        </Box>
    );
}
