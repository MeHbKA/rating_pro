import React, {useEffect, useState} from 'react';
import styles from "/styles/CreateAdvert.module.scss"
import {Autocomplete, Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from '@mui/icons-material/Add';
import Layout from "../layouts/MainLayout/MainLayout";
import {useRouter} from "next/router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {categoriesAction} from "../store/action-creators/categoriesActions";
import {useDispatch} from "react-redux";
import {citiesAction} from "../store/action-creators/citiesActions";
import {districtsAction} from "../store/action-creators/districtsActions";
import moment from "moment";
import {addAdvertAction, addVisitAction} from "../store/action-creators/addAdvertActions";


const CreateAdvert = () => {
  const router = useRouter();
  const today = moment();
  const [step, setStep] = useState(1)
  const [categoryId, setCategoryId] = useState<number>(1);
  const [cityId, setCityId] = useState<number>(0);
  const [districtId, setDistrictId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dateArray, setDateArray] = useState([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  
  const [token, setToken] = useState<string>('');
  
  const dispatch = useDispatch();
  const {categoriesResult} = useTypedSelector(state => state.categories)
  const {citiesResult} = useTypedSelector(state => state.cities)
  const {districtsResult} = useTypedSelector(state => state.districts)
  const {addAdvertResult} = useTypedSelector(state => state.addAdvert)
  
  const handleChangeDate = (e) => {
    setDateArray(dateArray => [...dateArray, e.target.value]);
    console.log(dateArray)
  }
  
  const visitsCount = ["Второй визит", "Третий визит","Четвертый визит","Пятый визит","Шестой визит", ]
  
  const [dateList, setDateList] = useState([
    <TextField
      key={0}
      type={"datetime-local"}
      value={dateArray[0]}
      defaultValue={today.format("YYYY-MM-DDThh:mm")}
      fullWidth
      onChange={handleChangeDate}
      label={"Первый визит"}
      InputLabelProps={{ shrink: true }}
      className={styles.visits + ' ' + styles.input}
    />,
  ])
  
  const AddVisit = ({count}) => {
    console.log(count)
    return <TextField
        key={count}
        label={visitsCount[count-1]}
        value={dateArray[count]}
        type={"datetime-local"}
        fullWidth
        InputLabelProps={{ shrink: true }}
        onChange={handleChangeDate}
        className={styles.visits + ' ' + styles.input}
    />;
  };
  
  const onAddBtnClick = event => {
    setDateList(dateList.concat(<AddVisit key={dateList.length} count={dateList.length}/>));
  };
  
  useEffect(() => {
    dispatch(categoriesAction());
    dispatch(citiesAction());
    setToken(localStorage.getItem("token"))
  }, [])
  
  useEffect(() => {
    if (cityId) {
      dispatch(districtsAction(cityId));
    }
  }, [cityId])
  
  const setTitleHandler = (e) => {
    setTitle(e.target.value)
  }
  const setDescriptionHandler = (e) => {
    setDescription(e.target.value)
  }
  
  const nextStep = () => {
    dispatch(addAdvertAction(title, description, categoryId, cityId, districtId, isEnabled, token))
    setStep(step + 1)
  }
  
  const submit = () => {
    // dispatch(addVisitAction(id, reason, visitAt, isVisited, visitedAt, token))
    dispatch(addVisitAction(1, 'somereason', '2021-11-21T16:00:00', false, '2021-11-21T16:00:00', token))
  }
  
  return (
    <Layout>
      <Container className={styles.container}>
        <Button onClick={()=> step === 1 ? router.back() : setStep(step - 1)}>
          <KeyboardBackspaceIcon
            className={styles.back}
          />
        </Button>
        <Paper className={styles.paper}>
          <Box className={styles.title}>
            <Typography className={styles.titleText}>Создать обьявление</Typography>
            <Typography className={styles.titleStep}>{step} из 2</Typography>
          </Box>
          {step === 1 ?
            <Box className={styles.body}>
              {categoriesResult &&
                <Autocomplete
                  disablePortal
                  id="categories"
                  className={styles.input}
                  getOptionLabel={(option) =>
                    option.name
                  }
                  options={categoriesResult}
                  onChange={(event: any, newValue: { id: number, image: string, name: string } | null) => {
                    newValue ? setCategoryId(newValue.id) : null
                  }}
                  renderInput={(params) => <TextField {...params} label="Категория"/>}
                />
              }
              <Box sx={{display: "flex", justifyContent: "space-between"}}>
                {citiesResult &&
                  <Autocomplete
                    disablePortal
                    id="cities"
                    className={styles.input}
                    getOptionLabel={(option) =>
                      option.name
                    }
                    options={citiesResult}
                    onChange={(event: any, newValue: { id: number, image: string, name: string } | null, reason) => {
                      reason === "clear" ? setCityId(0) : setCityId(newValue.id);
              
                    }}
                    sx={{width: "48%"}}
                    renderInput={(params) => <TextField {...params} label="Город"/>}
                  />
                }
                {districtsResult &&
                  <Autocomplete
                    disablePortal
                    id="districts"
                    className={styles.input}
                    getOptionLabel={(option) =>
                      option.name
                    }
                    onChange={(event: any, newValue: { id: number, image: string, name: string } | null, reason) => {
                      reason === "clear" ? setDistrictId(0) : setDistrictId(newValue.id);
  
                    }}
                    options={cityId ? districtsResult : []}
                    noOptionsText={"Выберите город"}
                    sx={{width: "48%",}}
                    renderInput={(params) => <TextField {...params} label="Район"/>}
                  />
                }
              </Box>
              <TextField
                placeholder={"Название услуги"}
                label={"Услуги"}
                className={styles.input}
                fullWidth
                value={title}
                onChange={setTitleHandler}
              />
              <Box className={styles.buttons}>
                <Button
                  className={styles.cancel}
                  variant={"outlined"}
                  onClick={() => router.back()}
                >
                  Отмена
                </Button>
                <Button
                  className={styles.next}
                  variant={"contained"}
                  onClick={() => nextStep()}
                >
                  Дальше
                </Button>
              </Box>
            </Box>
            :
            <Box className={styles.body}>
              {dateList}
              <Box onClick={onAddBtnClick} className={styles.add}>
                <AddIcon className={styles.icon}/>
                <Typography className={styles.text}>Добавить визит</Typography>
              </Box>
              <TextField
                className={styles.price + ' ' + styles.input}
                type={"number"}
                label={"Цена"}
                placeholder={"Укажите цену"}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                className={styles.description + ' ' + styles.input}
                type={"text"}
                label={"Описание"}
                placeholder={"Опишите задание"}
                InputLabelProps={{ shrink: true }}
                onChange={setDescriptionHandler}
                fullWidth
              />
              <TextField
                className={styles.duration + ' ' + styles.input}
                placeholder={"Длительность проекта"}
                fullWidth
              />
              <TextField
                className={styles.size + ' ' + styles.input}
                placeholder={"Обьем"}
                fullWidth
              />
              <TextField
                className={styles.count + ' ' + styles.input}
                placeholder={"Количество"}
                fullWidth
              />
              <Box className={styles.buttons}>
                <Button
                  className={styles.cancel}
                  variant={"outlined"}
                  onClick={() => router.back()}
                >
                  Отмена
                </Button>
                <Button
                  className={styles.next}
                  variant={"contained"}
                  onClick={() => submit()}
                >
                  Дальше
                </Button>
              </Box>
            </Box>
          }
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreateAdvert;
