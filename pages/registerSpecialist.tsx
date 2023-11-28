import React, {useCallback, useEffect, useRef, useState} from 'react';
import Image from 'next/image'
import Layout from "../layouts/MainLayout/MainLayout";
import {
  Box,
  Button, Checkbox,
  Container, FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon, ListItemText,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from "/styles/RegisterSpecialist.module.scss"
import FolderIcon from "@mui/icons-material/Folder";
import {useDropzone} from "react-dropzone";
import {useTypedSelector} from "../hooks/useTypedSelector";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  categoriesAction,
  getCategoryAction,
  getSubCategoriesByCategoryIdAction
} from "../store/action-creators/categoriesActions";
import {useDispatch} from "react-redux";

const RegisterSpecialist = () => {
  const [step, setStep] = useState(0)
  const [image, setImage] = useState<File | undefined>();
  const [images, setImages] = useState([]);
  const [filterRes, setFilterRes] = useState<any[]>();
  const [categoryId, setCategoryId] = useState()
  const [checkedSubCategories, setCheckedSubCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  
  const dispatch = useDispatch();
  
  const {categoriesResult} = useTypedSelector(state => state.categories)
  const {subCategoriesResult} = useTypedSelector(state => state.subCategoriesByCategoryId)
  
  useEffect(() => {
    dispatch(categoriesAction());
  }, [])
  
  useEffect(() => {
    setFilterRes(categoriesResult);
  }, [categoriesResult])
  
  useEffect(() => {
    if (categoryId) {
      dispatch(getSubCategoriesByCategoryIdAction(categoryId))
      
      console.log("category", subCategories)
    } else {
      setSubCategories([])
    }
  }, [categoryId]);
  
  
  const [preShow, setPreShow] = useState();
  let reader;
  useEffect(() => {
    reader = new FileReader();
    if (image) {
      reader.onload = function(event) {
        // The file's text will be printed here
        // console.log('result', reader.result);
        setPreShow(reader.result);
        setImages(images => [...images, image])
      };
      reader.readAsDataURL(image);
    }
  }, [image]);
  
  
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setImage(acceptedFiles[0])
    // console.log(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
  const searchCategories = (e) => {
    console.log(categoriesResult);
    const value = e.target.value.toLowerCase();
    setFilterRes(categoriesResult.filter(city => city.name.toLowerCase().includes(value)));
    // filterRes.map(city => console.log(city.name.toLowerCase().match(value)))
  }
  
  const handleSubCategories = (e) => {
    setCheckedSubCategories(prevState => ({
      ...prevState, [e.target.name]: e.target.checked
    }))
  }
  
  return (
    <Layout>
      <Container className={styles.container}>
        <Paper className={styles.paper}>
          { step === 0 ?
            <>
              <Box className={styles.header}>
                <Typography className={styles.text}>Шаги</Typography>
                <Button
                  className={styles.button}
                >
                  Закрыть
                </Button>
              </Box>
              <Box className={styles.body}>
                <Box className={styles.steps}>
                  <Typography className={styles.step}>Шаг 1</Typography>
                  <Typography className={styles.title}>Подтвердите личность</Typography>
                  <Typography className={styles.description}>
                    Загрузите фото документа, которое подтверждает вашу личность и фото документа с вами.
                  </Typography>
                </Box>
                <Box className={styles.steps}>
                  <Typography className={styles.step}>Шаг 2</Typography>
                  <Typography className={styles.title}>Выберите свою специальность</Typography>
                  <Typography className={styles.description}>
                    Будьте внимательны выбирая специальность.
                    По правилам сервиса вы можете работать только в одной специальности одновременно.
                  </Typography>
                </Box>
                <Box className={styles.steps}>
                  <Typography className={styles.step}>Шаг 3</Typography>
                  <Typography className={styles.title}>Подтвердите свою экспертность</Typography>
                  <Typography className={styles.description}>
                    Для того, чтоб получать больше проектов, предоставьте любые документы, которые могут подтвердить вашу экспертность в выбранно специальности или смежных.
                  </Typography>
                </Box>
              </Box>
              <Button
                className={styles.nextButton}
                onClick={()=>{setStep(step + 1)}}
              >
                Далее
              </Button>
            </>
            : step === 1 ?
            <>
              <Typography className={styles.header}>
                Шаг {step} из 3
              </Typography>
              <Box className={styles.body}>
                <Typography className={styles.title}>
                  Подтвердите личность
                </Typography>
                <Typography className={styles.description}>
                  Загрузите фото документа, которое подтверждает вашу личность и фото документа с вами.
                </Typography>
                <Button className={styles.examples}>
                  <Typography className={styles.text}>
                    Примеры необходимых фото
                  </Typography>
                  <ArrowForwardIcon />
                </Button>
                <div className={styles.dragAndDrop} {...getRootProps()}>
                  <div>
                    <FolderIcon className={styles.folder}/>
                    <Typography className={styles.text}>
                      Нажмите сюда или просто перетащите файл
                    </Typography>
                  </div>
                  <input
                    type={'file'}
                    style={{display: 'none'}}
                    {...getInputProps()}
                  />
                </div>
                <Box className={styles.preShown}>
                  {images.map((item, index) => {
                      return(
                        <Box key={index} className={styles.preShownItem}>
                          <Image src={preShow} height={70} width={70} />
                          <Typography className={styles.name}>{item.name}</Typography>
                        </Box>
                      )
                    })
                  }
                </Box>
              </Box>
              <Button
                className={styles.nextButton}
                onClick={()=>{setStep(step + 1)}}
              >
                Далее
              </Button>
            </>
            : step === 2 ?
            <>
              <Typography className={styles.header}>
                Шаг {step} из 3
              </Typography>
              <Box className={styles.body}>
                <Typography className={styles.title}>
                  Выберите свою специальность
                </Typography>
                <Typography className={styles.description}>
                  Будьте внимательны выбирая специальность.
                  По правилам сервиса вы можете работать только в одной специальности одновременно.
                </Typography>
                <TextField
                  className={styles.searchField}
                  placeholder={'Поиск'}
                  fullWidth
                  onChange={searchCategories}
                  size={"small"}
                />
                <Box className={styles.categories}>
                  {filterRes &&
                    filterRes.map((category) => {
                      return (
                        <Box key={category.id}>
                          <Button
                            disabled={categoryId && !(categoryId === category.id)}
                            onClick={() => {
                            categoryId === category.id ?
                            setCategoryId(null)
                            :
                            setCategoryId(category.id)
                          }} >
                            <Typography className={styles.categoryName}>{category.name}</Typography>
                            {category.id === categoryId ?
                              <CheckCircleIcon />
                              :
                              <RadioButtonUncheckedIcon />
                            }
                          </Button>
                          {category.id === categoryId &&
                            <Box className={styles.subCategories}>
                              {subCategories &&
                                subCategories.map((item) => {
                                  return (
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          icon={<></>}
                                          checkedIcon={<></>}
                                        />}
                                      className={styles.specializations + " " + (checkedSubCategories[item.id] ? styles.checked : styles.unchecked)}
                                      name={item.id.toString()}
                                      onChange={handleSubCategories}
                                      label={item.name}
                                      key={item.id}
                                      labelPlacement="start"
                                    />
                                  )
                                })
                              }
                            </Box>
                          }
                        </Box>
                      )
                    })
                  }
                </Box>
              </Box>
              <Button
                className={styles.nextButton}
                onClick={()=>{setStep(step + 1)}}
              >
                Далее
              </Button>
            </>
            :
            <>
            <Typography className={styles.header}>
              Шаг {step} из 3 (По желанию)
            </Typography>
            <Box className={styles.body}>
              <Typography className={styles.title}>
               Подтвердите свою экспертность
              </Typography>
              <Typography className={styles.description}>
                Для того, чтоб получать больше проектов, предоставьте любые документы, которые могут подтвердить вашу экспертность в выбранной специальности или смежных.
              </Typography>
              <Typography className={styles.example}>
                <span className={styles.border}>Например: </span>
                <span>диплом, сертификат, лицензия, счет-фактуры и т.п.</span>диплом, сертификат, лицензия, счет-фактуры и т.п.
              </Typography>
              <div className={styles.dragAndDrop} {...getRootProps()}>
                <div>
                  <FolderIcon className={styles.folder}/>
                  <Typography className={styles.text}>
                    Нажмите сюда или просто перетащите файл
                  </Typography>
                </div>
                <input
                  type={'file'}
                  style={{display: 'none'}}
                  {...getInputProps()}
                />
              </div>
              <Box className={styles.preShown}>
                {/*TODO another images for spec*/}
                {images.map((item, index) => {
                  return(
                    <Box key={index} className={styles.preShownItem}>
                      <Image src={preShow} height={150} width={150} />
                      <Typography className={styles.name}>{item.name}</Typography>
                    </Box>
                  )
                })
                }
              </Box>
            </Box>
            </>
          }
          
        </Paper>
      </Container>
    </Layout>
  );
};

export default RegisterSpecialist;
