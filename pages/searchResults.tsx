import Layout from "../layouts/MainLayout/MainLayout";
import {
  Box,
  Button,
  Container,
  FormControl, Grid,
  IconButton,
  InputLabel,
  MenuItem, Paper,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import styles from "../styles/SearchResults.module.scss"
import {useTypedSelector} from "../hooks/useTypedSelector";
import React, {useEffect} from "react";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Avatar from "@mui/material/Avatar";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {useRouter} from "next/router";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Drawer from "@mui/material/Drawer";


const drawerWidth = 820;

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



const SearchResults = () => {
  const [sort, setSort] = React.useState("price");
  const [type, setType] = React.useState("specialist");
  const [open, setOpen] = React.useState(false);
  
  const {route} = useRouter();
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  
  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };
  
  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  
  const openInNewTab = () => {
  
  }
  
  const {loadingSearch, searchResult, errorSearch } = useTypedSelector(state => state.search)
  
  useEffect(() => {
    console.log(searchResult);
  }, []);
  
  
  return (
    <Layout >
      <Container className={styles.container}>
        <div className={styles.header}>
          <KeyboardBackspaceIcon className={styles.back} onClick={()=> router.back()}/>
          <div className={styles.text}>
            <Typography className={styles.find}>Znajdź wykonawcę </Typography>
            <Typography className={styles.slash}>/ </Typography>
            <Typography className={styles.result}>Результат</Typography>
          </div>
        </div>
        <Button onClick={() => router.push("/specialistNearby")}>Specialist nearby</Button>
        <Typography className={styles.little}>Более 10 вариантов специалистов</Typography>
        <div className={styles.title}>
          <Typography className={styles.text}>Варшава: курьерские услуги</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
          <Button variant={'contained'} className={styles.create} onClick={()=> router.push('/createAdvert')}>Создать обьявление</Button>
        </div>
        <div className={styles.sorts}>
          <FormControl sx={{ m: 1, width: 140 }} size="small">
            <InputLabel id="sort">Sort</InputLabel>
            <Select
              labelId="sort"
              id="sort"
              value={sort}
              label="Sort"
              onChange={handleChangeSort}
              sx={{height: 30, backgroundColor: "#FFFFFF"}}
              MenuProps={{
                sx:{
                  width: 140
                }
              }}
            >
              <MenuItem className={styles.selectItem} value={"price"}>Price</MenuItem>
              <MenuItem className={styles.selectItem} value={"date"}>Date</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 140 }} size="small">
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={type}
              label="Type"
              onChange={handleChangeType}
              sx={{
                height: 30,
                backgroundColor: "#FFFFFF"
              }}
              MenuProps={{
                sx:{
                  width: 140
                }
              }}
            >
              <MenuItem className={styles.selectItem} value={"specialist"}>Specialist</MenuItem>
              <MenuItem className={styles.selectItem} value={"date"}>Date</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Paper className={styles.specialistCard}>
          <div className={styles.rating}>
            <StarIcon color={"warning"} className={styles.star} />
            <div className={styles.primary}>5.0</div>
            <div className={styles.secondary}>(18)</div>
          </div>
          <IconButton className={styles.addFavourite}>
            <FavoriteIcon color={"error"} className={styles.icon}/>
          </IconButton>
          <Typography className={styles.title}>Быстрый курьер доставщик</Typography>
          <Typography className={styles.categories}>Курьерские услуги, курьерская доставка, доставка готовой еды, курьер на авто, еще 8</Typography>
          <div className={styles.rewards}>
            <div className={styles.reward}>Лицензия</div>
            <div className={styles.reward}>Топ 10</div>
          </div>
          <div className={styles.specialistInfo}>
            <IconButton >
              <Avatar alt="Remy Sharp" src={"/avatar.png"} className={styles.avatar}/>
            </IconButton>
            <Typography className={styles.name}>Александр Суровый</Typography>
            <Typography className={styles.city}>Варшава</Typography>
            <Button className={styles.viewProfile} onClick={handleDrawerOpen}>
              Посмотреть профиль
              <ArrowRightAltIcon />
            </Button>
          </div>
          
        </Paper>
        <Paper className={styles.specialistCard}>
          <div className={styles.rating}>
            <StarIcon color={"warning"} className={styles.star} />
            <div className={styles.primary}>5.0</div>
            <div className={styles.secondary}>(18)</div>
          </div>
          <IconButton className={styles.addFavourite}>
            <FavoriteIcon color={"error"} className={styles.icon}/>
          </IconButton>
          <Typography className={styles.title}>Быстрый курьер доставщик</Typography>
          <Typography className={styles.categories}>Курьерские услуги, курьерская доставка, доставка готовой еды, курьер на авто, еще 8</Typography>
          <div className={styles.rewards}>
            <div className={styles.reward}>Лицензия</div>
            <div className={styles.reward}>Топ 10</div>
          </div>
          <div className={styles.specialistInfo}>
            <IconButton >
              <Avatar alt="Remy Sharp" src={"/avatar.png"} className={styles.avatar}/>
            </IconButton>
            <Typography className={styles.name}>Александр Суровый</Typography>
            <Typography className={styles.city}>Варшава</Typography>
            <Button className={styles.viewProfile} onClick={handleDrawerOpen}>
              Посмотреть профиль
              <ArrowRightAltIcon />
            </Button>
          </div>
          
        </Paper>
      </Container>
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
        anchor="right"
        open={open}
        className={styles.drawer}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{position: "absolute", left: 40}}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton onClick={openInNewTab}
                      sx={{
                        position: "absolute",
                        color: "#12D3A5",
                        backgroundColor: 'transparent',
                        right: 30,
                        fontSize: 12,
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "transparent"
                        }
                      }}
          >
            <OpenInNewIcon fontSize={"small"}/>
            Open job in a new window
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box className={styles.headerSpec}>
          <Typography className={styles.title}>Быстрый курьер доставщик</Typography>
          <Box className={styles.firstRow}>
            <div className={styles.rating}>
              <StarIcon color={"warning"} className={styles.star} />
              <div className={styles.primary}>5.0</div>
              <div className={styles.secondary}>(18)</div>
            </div>
            <div className={styles.city}>
              <Typography>Польша, Варшава</Typography>
            </div>
            <div className={styles.icons}>
              <Image src={"/icons/share.png"} height={16} width={19}/>
              <FavoriteBorderOutlinedIcon fontSize={"small"}/>
            </div>
          </Box>
          <Box className={styles.secondRow}>
            <IconButton >
              <Avatar alt="Remy Sharp" src={"/avatar.png"} className={styles.avatar}/>
            </IconButton>
            <Box className={styles.categoryAndName}>
              <Typography className={styles.category}>Курьерские услуги</Typography>
              <Typography className={styles.name}>Специалист: Александр Суровый</Typography>
            </Box>
            <Button className={styles.selectSpecialist}>
              Выбрать специалиста
            </Button>
            <Typography className={styles.secondary}>
              Курьерские услуги, курьерская доставка, доставка готовой еды, курьер на авто, еще 8
            </Typography>
          </Box>
        </Box>
        <Box className={styles.achievements}>
          <Typography>Лицензия</Typography>
          <Typography>Топ 10</Typography>
        </Box>
        <Box className={styles.description}>
          <Typography className={styles.text}>Выполняю любую работу связанную с доставкой, перевозкой или отправкой. Быстро доберусь в любую часть города, даже в час-пик. Выполняю работу на скутере, благодаря которому могу быстро маневрировать в пробках. Никогда не опаздываю,  товар привожу в сохранности.</Typography>
          <Button className={styles.more}>Показать еще</Button>
        </Box>
        <Grid container className={styles.services}>
          <Grid item className={styles.service} lg={6}>
            <Image src={"/icons/dollar.png"} height={20} width={20} />
            <Typography className={styles.title}>Договорная цена</Typography>
            <Typography className={styles.description}>Специалист готов договариться по цене и идти на уступки.</Typography>
          </Grid>
          <Grid item className={styles.service} lg={6}>
            <Image src={"/login/icons/wand.png"} height={20} width={20} />
            <Typography className={styles.title}>Завершающая уборка</Typography>
            <Typography className={styles.description}>По завершению, специалист оставит чистоту на месте, где проводил работу.</Typography>
          </Grid>
          <Grid item className={styles.service} lg={6}>
            <SentimentSatisfiedAltIcon />
            <Typography className={styles.title}>Хорошее настроение</Typography>
            <Typography className={styles.description}>Специалист придет с хорошим настроением.</Typography>
          </Grid>
        </Grid>
        <Box className={styles.reviews}>
        
        </Box>
      </Drawer>
    </Layout>
  );
};


export default SearchResults;
