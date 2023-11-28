import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import {Button, ButtonGroup, Grid, TextField, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import Layout from "../layouts/MainLayout/MainLayout";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {categoriesAction} from "../store/action-creators/categoriesActions";
import {useRouter} from "next/router";
import {NextThunkDispatch, wrapper} from "../store";

export default function Home() {
  let popularReq = [
    "Популярный запрос",
    "Запрос",
    "Популярный запрос",
    "Запрос",
    "Популярный запрос",
  ]
  
  const [width, setWidth] = useState(null);
  
  const [token, setToken] = useState(null)
  
  const router = useRouter();
  
  useEffect(()=> {
    setToken(localStorage.getItem('token'));
  },[])
  
  useEffect(() => {
    setWidth(window.innerWidth);
    dispatch(categoriesAction());
  }, [])
  
  const dispatch = useDispatch();
  const {loadingCategories, errorCategories, categoriesResult} = useTypedSelector(state => state.categories)
  
  return (
    <Layout>
      <Container className={styles.container} disableGutters maxWidth={false}>
        <div className={styles.first}>
          <div className={styles.right}>
            <div className={styles.plumberImage}>
              <Image src={"/images/plumber.png"} width={571} height={622} className={styles.plumberImage}/>
            </div>
            <div className={styles.vector175}>
              <Image src={"/background/Vector175.png"} width={659} height={640}/>
            </div>
          </div>
          <div className={styles.left}>
            <div className={styles.paragraph}>
              <span className={styles.mainColor}>Rating Pro</span>
              <span>- pomogę znaleźć sprawdzonych specjalistów za darmo</span>
              <div className={styles.help}>Znajdź wykonawcę lub dodaj zlecenie</div>
              <ButtonGroup fullWidth className={styles.firstButtonGroup}>
                <Button variant="contained" className={styles.firstButton} onClick={() => router.push('/findEmployee')}>Znajdź wykonawcę</Button>
                <Button variant="contained"
                        color="secondary"
                        className={styles.firstButton}
                        onClick={()=> {
                          token ? router.push('/createAdvert') : router.push('/login')
                        }}
                >
                  Utwórz zlecenie
                </Button>
              </ButtonGroup>
              <div className={styles.search} >
                <TextField
                  fullWidth
                  className={styles.searchField}
                  type="search"
                  placeholder="Kogo szukamy?"
                  variant="outlined"
                  size={width <= 425 ? "small" : "medium"}
                />
                <Button variant="contained" className={styles.searchButton}>
                  <SearchIcon/>
                </Button>
              </div>
              <div className={styles.popularReq}>
                {
                  popularReq.map((item, index)=> {
                    return (
                      <div className={styles.popularItem} key={index}>{item}</div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.second}>
          <div className={styles.secondTitle} >Ponad 100 kategorii dla Państwa wygody</div>
          <Grid className={styles.categories} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
            { categoriesResult &&
              categoriesResult.map((item)=>{
                return(
                  <Grid item xs={2} sm={4} md={4} key={item.id} className={styles.categoryBox}>
                    <Image src={item.image} width={45} height={45} />
                    <span className={styles.categoryName}>{item.name}</span>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
        <div className={styles.third}>
          {width <= 425 &&
            <div className={styles.phoneMobile}>
              <Image src={"/images/phoneMobile.png"} height={417} width={200} />
            </div>
          }
          <div className={styles.thirdLeft}>
            <div className={styles.thirdLittle}>Вам нужна помощь подрядчика?</div>
            <div className={styles.thirdTitle}>Pobierz aplikację mobilną Rating Pro</div>
            <div className={styles.stores}>
              <ButtonGroup orientation={"vertical"}>
                <Button variant={"contained"} className={styles.buttonStores}>
                  <Image src={"/icons/googlePlay.png"} width={23} height={23} />
                  <div className={styles.buttonStoresText}>Google Play</div>
                </Button>
                <Button variant={"contained"} className={styles.buttonStores}>
                  <Image src={"/icons/appStore.png"} width={27} height={24} />
                  <div className={styles.buttonStoresText + ' ' + styles.appStore}>App Store</div>
                </Button>
              </ButtonGroup>
              <div className={styles.qrCode}>
                <Image src={"/icons/qrCode.png"} width={128} height={128} />
              </div>
            </div>
          </div>
          <div className={styles.thirdRight}>
            <div className={styles.phone1}>
              <Image src={"/images/phone1.png"} height={510} width={309} />
            </div>
            <div className={styles.phone2}>
              <Image src={"/images/phone2.png"} height={510} width={309} />
            </div>
          
          </div>
        </div>
        <div className={styles.fourth}>
          <div className={styles.title}>
            Как это работает
          </div>
          { width >= 1440 ?
            <Image src={"/images/fourth.png"} width={919} height={150} />
            : width >= 960 ?
              <Image src={"/images/fourth.png"} width={814} height={134} />
              :
              <Image src={"/images/fourthMobile.png"} width={218} height={496} />
          }
        </div>
        <div className={styles.fifth}>
          <div className={styles.title}>
            Полезные статьи
            {/*TODO добавить статьи*/}
          </div>
        </div>
      
      </Container>
    </Layout>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps( async ({store}) => {
//   const dispatch = store.dispatch as NextThunkDispatch;
//   await dispatch(categoriesAction());
// })
