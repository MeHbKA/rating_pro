import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useRouter} from "next/router";
import {useDropzone} from "react-dropzone";
import {Box, Button, ButtonGroup, Container, Modal, TextField, Typography} from "@mui/material";
import styles from "../styles/FinalizeClient.module.scss";
import Image from "next/image";
import FolderIcon from "@mui/icons-material/Folder";
import CloseIcon from "@mui/icons-material/Close";

const FinalizeClient = () => {
  const [step, setStep] = useState(1);
  
  const [image, setImage] = useState<File | undefined>();
  
  const [preShow, setPreShow] = useState();
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [accept, setAccept] = useState<boolean>(false)
  
  const router = useRouter();
  
  const ref = useRef<HTMLInputElement>();
  let reader;
  useEffect(() => {
    reader = new FileReader();
    if (image) {
      reader.onload = function(event) {
        // The file's text will be printed here
        console.log('result', reader.result);
        setPreShow(reader.result);
      };
      reader.readAsDataURL(image);
      setOpen(true);
    }
  }, [image]);
  
  
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files[0])
    setOpen(true)
  }
  
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
  const submit = () => {
    console.log('yup');
    setStep(step + 1)
  }
  
  return (
    <Container className={styles.container}>
      <div className={styles.headerSteps}>
        <div className={step === 1 ? styles.activeStep : styles.step}>
          1. Добавьте фото в профиль
        </div>
        <div className={step === 2 ? styles.activeStep : styles.step}>
          2. Проверить почту
        </div>
      </div>
      {step === 1 ?
        <div className={styles.bodyStep1} >
          <Typography className={styles.title}>
            Добавьте фото, на котором хорошо видно ваше лицо
          </Typography>
          <Typography className={styles.little}>
            Добавьте фото, на котором хорошо видно ваше лицо.
          </Typography>
          {accept ?
            <>
              <div>
                <Image src={preShow} height={456} width={456}/>
              </div>
              <ButtonGroup className={styles.buttonGroup}>
                <Button className={styles.change} variant="text" onClick={()=> ref.current.click()}>
                  Заменить фото
                  <input
                    type={'file'}
                    style={{display: 'none'}}
                    ref={ref}
                    onChange={onChangeFile}
                  />
                </Button>
                <Button className={styles.continue} onClick={()=> submit()}>
                  Дальше
                </Button>
              </ButtonGroup>
            </>
            :
            <>
              <div className={styles.dragAndDrop} {...getRootProps()}>
                <div>
                  <FolderIcon className={styles.folder}/>
                  <Typography className={styles.text}>
                    Перетащите фото в эту зону
                  </Typography>
                </div>
                <input
                  type={'file'}
                  style={{display: 'none'}}
                  {...getInputProps()}
                />
              </div>
              <Typography className={styles.or} >
                или
              </Typography>
              <ButtonGroup orientation="vertical" >
                <Button className={styles.download} onClick={()=> ref.current.click()}>
                  Загрузить фото
                  <input
                    type={'file'}
                    style={{display: 'none'}}
                    ref={ref}
                    onChange={onChangeFile}
                  />
                </Button>
                <Button className={styles.later} variant="text" onClick={() => router.push('/')}>
                  Сделаю позже
                </Button>
              </ButtonGroup>
            </>
          }
        
        </div>
        :
        <div className={styles.bodyStep2} >
          <Typography className={styles.title} >Проверить почту</Typography>
          <div className={styles.body}>
            <Typography className={styles.bodyText}>
              Нажмите на ссылку в письме, которое мы вам отправили.
              Подтвержденный адрес электронной почты позволяет получать информацию о ваших заказах.
            </Typography>
            <TextField
              fullWidth
              className={styles.email}
              type="email"
              placeholder="dmitry.giryavenko@gmail.com?"
              variant="outlined"
            />
            <ButtonGroup orientation="vertical" fullWidth>
              <Button className={styles.primary}>Отправить письмо снова</Button>
              <Button className={styles.secondary} variant={"text"} onClick={() => router.push('/')}>Сделаю позже</Button>
            </ButtonGroup>
          </div>
        </div>
      }
      <Box className={styles.footerText}>
        <Typography>© 2020 Airbnb, Inc. Все права защищены</Typography>
        <Typography>v0.0.1</Typography>
      </Box>
      {image && preShow &&
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modal}>
            <div className={styles.modalTitle}>
              <Typography>Предпосмотр</Typography>
              <CloseIcon onClick={handleClose} />
            </div>
            <div className={styles.modalDescription}>
              <Image src={preShow} height={452} width={452}/>
            </div>
            <div className={styles.modalFooter}>
              <Button className={styles.modalButton}
                      onClick={() => {
                        setAccept(true);
                        handleClose();
                      }}>
                Загрузить фото
              </Button>
            </div>
          </Box>
        </Modal>
        
      }
    </Container>
  )
};

export default FinalizeClient;
