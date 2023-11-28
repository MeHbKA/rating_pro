import React, {useState, useRef, useEffect} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Paper from '@mui/material/Paper';
import {useRouter} from "next/router";
import Image from "next/image";
import styles from "../../../styles/Header.module.scss";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";


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

const BottomNavBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [value, setValue] = useState(router.route);
  
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = useState('')
  
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
  
  const logOut = () => {
    localStorage.setItem('token', '');
    setToken('')
  }
    return (
        <Box ref={ref}>
            <Box sx={{display: 'flex', justifyContent: 'space-evenly'}} >
              <Box sx={{ flexGrow: 1 }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2}}
                >
                  <MenuIcon sx={{margin: '0 15px'}}/>
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 2.5 }}>
                <Image src={"/logo.png"} height={60} width={120} />
              </Box>
            </Box>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        router.push(newValue)
                    }}
                >
                    <BottomNavigationAction value={"/"} label="Поиск" icon={<SearchIcon />} />
                    <BottomNavigationAction value={"/markers"} label="Закладки" icon={<FavoriteBorderIcon />} />
                    <BottomNavigationAction value={"/projects"} label="Проекты" icon={<ShoppingCartOutlinedIcon />} />
                    <BottomNavigationAction value={"/incoming"} label="Входящие" icon={<ChatBubbleOutlineOutlinedIcon />} />
                    <BottomNavigationAction value={"/profile"} label="Профиль" icon={<AccountCircleOutlinedIcon />} />
                </BottomNavigation>
            </Paper>
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
                  <AccountCircleOutlinedIcon sx={{marginRight: 3}} />
                  <Typography textAlign="center">Logowanie</Typography>
                </MenuItem>
                <MenuItem onClick={() => router.push('/startSpecialist')} className={styles.menuItem}>
                  <Typography textAlign="center">Stać specjalistą</Typography>
                </MenuItem>
                <MenuItem onClick={() => router.push('/register')} className={styles.menuItem}>
                  <Typography textAlign="center">Rejestracja</Typography>
                </MenuItem>
                <MenuItem onClick={() => router.push('/register')} className={styles.menuItem}>
                  <Typography textAlign="center">Rejestracja</Typography>
                </MenuItem>
                <MenuItem className={styles.menuItem}>
                  <Typography textAlign="center" >Мой город: Варшава</Typography>
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
                <MenuItem className={styles.menuItem} onClick={() => logOut()}>
                  <Typography textAlign="center" color={"error"}>Выйти</Typography>
                </MenuItem>
              </div>
            }
          </Drawer>
        </Box>
    );
};

export default BottomNavBar;
