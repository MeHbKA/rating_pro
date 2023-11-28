import Image from 'next/image'
import styles from '../styles/FindEmployee.module.scss'
import {
  TextField,
  Container,
  Typography,
  List,
  Box,
  ListItemButton, ListItem, ListItemIcon, ListItemText, Button, FormGroup, FormControlLabel, Checkbox
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React, {useEffect, useState} from "react";
import Layout from "../layouts/MainLayout/MainLayout";
import Link from "next/link";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {useRouter} from "next/router";

export default function FindEmployee() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  
  const [cityId, setCityId] = useState<null | number>()
  const [districtId, setDistrictId] = useState<null | number>()
  const [specializations, setSpecializations] = useState<object>()
  const [categoryId, setCategoryId] = useState<number | string>('')
  const [findBy, setFindBy] = useState<string>('')
  
  const {districtsAction, citiesAction, specializationsAction, searchAction } = useActions();
  
  const {loadingCities, citiesResult, errorCities} = useTypedSelector(state => state.cities);
  const {loadingDistricts, districtsResult, errorDistricts} = useTypedSelector(state => state.districts);
  const {loadingSpecializations, specializationsResult, errorSpecializations} = useTypedSelector(state => state.specializations);
  
  const [filterRes, setFilterRes] = useState<any[]>()
  const [filterDistrictsRes, setFilterDistrictsRes] = useState<any[]>()
  
  useEffect(() => {
    citiesAction();
    specializationsAction();
  }, [])
  
  useEffect(() => {
    if (cityId) {
      districtsAction(cityId)
    }
  }, [cityId])
  
  useEffect(() => {
    setFilterRes(citiesResult);
  }, [citiesResult])
  
  useEffect(() => {
    setFilterDistrictsRes(districtsResult);
  }, [districtsResult])
  
  const searchCities = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterRes(citiesResult.filter(city => city.name.toLowerCase().includes(value)));
    // filterRes.map(city => console.log(city.name.toLowerCase().match(value)))
  }
  const searchDistricts = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterDistrictsRes(districtsResult.filter(city => city.name.toLowerCase().includes(value)));
    // filterRes.map(city => console.log(city.name.toLowerCase().match(value)))
  }
  
  const handleNextStep = () => {
    setStep(step + 1)
  }
  
  const handleBackStep = () => {
    setStep(step - 1)
  }
  
  const setCity = (city) => {
    if (city) {
      setCityId(city)
    }
  }
  
  const setDistrict = (district) => {
    if (district) {
      setDistrictId(district);
    }
  }
  
  const handleSpecializations = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecializations(prevState => ({
      ...prevState, [e.target.name]: e.target.checked
    }))
  }
  
  const submitSearch = () => {
    let subCategoryId = []
    for (let id in specializations){
      if (specializations[id]){
        subCategoryId.push(id)
      }
    }
    searchAction({categoryId, subCategoryId, cityId, districtId, findBy})
    router.push('/searchResults')
  }
  
  return (
    <Layout>
      <Container className={styles.container} disableGutters maxWidth={false}>
        {step === 1 ?
          <>
            <Button onClick={() => router.push('/')}>
              <KeyboardBackspaceIcon className={styles.back}/>
            </Button>
            <Typography className={styles.title}>
              Выберите город, где ищите специалиста
            </Typography>
            <Typography className={styles.little}>
              Выберите город
            </Typography>
            <Box className={styles.citiesBox}>
              <TextField
                className={styles.searchField}
                placeholder={'Все города'}
                fullWidth
                onChange={searchCities}
              />
              <List className={styles.cities}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => {
                    handleNextStep();
                    setCity('')
                  }}>
                    <ListItemIcon className={styles.citiesIcon} sx={{p: 2}}>
                      <LocationOnIcon color={'primary'}/>
                    </ListItemIcon>
                    <ListItemText primary='Моя геопозиция или указать на карте' className={styles.citiesName}/>
                  </ListItemButton>
                </ListItem>
                {filterRes &&
                  filterRes.map((city) => {
                    return (
                      <ListItem disablePadding key={city.id}>
                        <ListItemButton onClick={() => {
                          handleNextStep();
                          setCity(city.id)
                        }}>
                          {city.name === 'All' ?
                            <ListItemIcon className={styles.citiesIcon} sx={{p: 2}}>
                              <LocationCityIcon color={"primary"}/>
                            </ListItemIcon>
                            :
                            <ListItemIcon className={styles.citiesIcon}>
                              <Image src={city.image} width={60} height={60}/>
                            </ListItemIcon>
                          }
                          <ListItemText primary={city.name} className={styles.citiesName}/>
                        </ListItemButton>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Box>
          </>
          : step === 2 ?
            <>
              <Button onClick={handleBackStep}>
                <KeyboardBackspaceIcon className={styles.back}/>
              </Button>
              <Typography className={styles.title}>
                Где необходимо выполнить работу?
              </Typography>
              <Typography className={styles.little}>
                Выберите район
              </Typography>
              <Box className={styles.citiesBox}>
                <TextField
                  className={styles.searchField}
                  placeholder={'Все районы'}
                  fullWidth
                  onChange={searchDistricts}
                />
                <List className={styles.cities}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      handleNextStep();
                      setDistrict('');
                    }}>
                      <ListItemIcon className={styles.citiesIcon} sx={{p: 2}}>
                        <LocationOnIcon color={'primary'}/>
                      </ListItemIcon>
                      <ListItemText primary='Моя геопозиция или указать на карте' className={styles.citiesName}/>
                    </ListItemButton>
                  </ListItem>
                  {filterDistrictsRes &&
                    filterDistrictsRes.map((district) => {
                      return (
                        <ListItem disablePadding key={district.id}>
                          <ListItemButton onClick={() => {
                            handleNextStep();
                            setDistrict(district.id);
                          }}>
                            <ListItemText primary={district.name} className={styles.citiesName}/>
                          </ListItemButton>
                        </ListItem>
                      )
                    })
                  }
                </List>
              </Box>
            </>
            :
            <>
              <Button onClick={handleBackStep}>
                <KeyboardBackspaceIcon className={styles.back}/>
              </Button>
              <Typography className={styles.title}>
                Что должен уметь специалист?
              </Typography>
              <Typography className={styles.little}>
                Выберите необходимые услуги
              </Typography>
              <Box className={ styles.citiesBox }>
                <FormGroup className={styles.cities} >
                  {specializationsResult &&
                    specializationsResult.map((specialization) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<CheckCircleIcon />}
                            />}
                          className={styles.specializations}
                          name={specialization.id.toString()}
                          onChange={handleSpecializations}
                          label={specialization.name}
                          key={specialization.id}
                          labelPlacement="start"
                        />
                      )
                    })
                  }
                </FormGroup>
              </Box>
              <Box className={styles.buttonBox}>
                <Button variant={"contained"} className={styles.button} onClick={()=> submitSearch()}>
                  Искать
                </Button>
              </Box>
            </>
        }
      </Container>
    </Layout>
  )
}
