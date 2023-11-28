import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from '../../../styles/Header.module.scss'
import {useEffect, useState} from "react";
import {Button, ButtonGroup} from "@mui/material";


const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [token, setToken] = useState(null);
  const [customer, setCustomer] = useState(true);
  const router = useRouter();
  
  const handleChangeCustomer = (changeCustomer) => {
    setCustomer(changeCustomer)
  }
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(()=> {
    setToken(localStorage.getItem('token'))
    console.log(token)
  },[router.route])
  
  const logOut = () => {
    localStorage.setItem('token', '');
    setToken('')
  }
  
  return (
    <AppBar position="fixed" color={"default"} className={styles.headerNavBar} >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1.3, display: { xs: 'none', lg: 'flex' }, justifyContent: 'center' }}>
            <Link href={'/'}>
              <a><Image src={'/logo.png'} height={52} width={103}/></a>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 2.5, display: { xs: 'none', lg: 'flex'}, justifyContent: 'space-evenly' }}>
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
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-evenly' }}>
            <p className={styles.city}>Варшава</p>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} className={styles.iconButton}>
                <MenuIcon sx={{margin: '0 15px'}}/>
                <Avatar alt="Remy Sharp" src={token ? "" : "/avatar.png"} className={styles.avatar}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!token ?
                <div>
                  <MenuItem className={styles.closeMenu}>
                    <CloseIcon onClick={handleCloseUserMenu}/>
                  </MenuItem>
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
                  <MenuItem className={styles.closeMenu}>
                    <CloseIcon onClick={handleCloseUserMenu}/>
                  </MenuItem>
                  <MenuItem className={styles.menuItem + ' ' + styles.menuAvatar}>
                    <Avatar alt="Remy Sharp" src={token ? "" : "/avatar.png"} className={styles.avatar}/>
                    <Typography >Александра Иванова</Typography>
                  </MenuItem>
                  <MenuItem className={styles.menuItem}>
                    <ButtonGroup orientation={"horizontal"} className={styles.changeCustomer}>
                      <Button
                        className={customer ? styles.active : styles.customer}
                        onClick={()=> handleChangeCustomer(true)}
                        variant={customer ? "contained" : "outlined"}
                      >
                        Заказчик
                      </Button>
                      <Button
                        className={customer ? styles.customer : styles.active}
                        onClick={()=> handleChangeCustomer(false)}
                        variant={customer ? "outlined" : "contained"}
                      >
                        Специалист
                      </Button>
                    </ButtonGroup>
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/profile')} className={styles.menuItem}>
                    <Typography textAlign="center">Мой профиль</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/specialist')} className={styles.menuItem}>
                    <Typography textAlign="center">Оплата</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => logOut()} className={styles.menuItem}>
                    <Typography textAlign="center" color={"error"}>Выйти</Typography>
                  </MenuItem>
                </div>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
