import React from 'react';
import Layout from "../layouts/MainLayout/MainLayout";
import styles from "/styles/StartSpecialist.module.scss"
import {Box, Button, Container, IconButton, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image'
import {useRouter} from "next/router";

const StartSpecialist = () => {
  const router = useRouter();
  
  return (
    <Layout>
      <Container className={styles.container}>
        <Typography className={styles.title}>Хотите работать на себя. Делайте это с Rating Pro!</Typography>
        <Typography className={styles.secondary}>Вы готовы зарабатывать?</Typography>
        <Box className={styles.video}></Box>
        <Button className={styles.startSpecialist} variant={"contained"}>Stać specjalistą</Button>
        <Box className={styles.advantage}>
          <Typography className={styles.advantageTitle}>Преимущества</Typography>
          <Box className={styles.advantageBox}>
            <Image src={"/icons/startSpecialist1.png"} height={40} width={40} />
            <Typography className={styles.advantageText}>Загрузите файл договора с подписью в следующем шаге (Далее). Если вы оставили физическую подпись, сделайте фото договора и загрузите этот файл.</Typography>
          </Box>
          <Box className={styles.advantageBox}>
            <Image src={"/icons/startSpecialist2.png"} height={40} width={40} />
            <Typography className={styles.advantageText}>
              Загрузите файл договора с подписью в следующем шаге (Далее). Если вы оставили физическую подпись, сделайте фото договора и загрузите этот файл.
            </Typography>
          </Box>
          <Box className={styles.advantageBox}>
            <Image src={"/icons/startSpecialist3.png"} height={40} width={40} />
            <Typography className={styles.advantageText}>
              Загрузите файл договора с подписью в следующем шаге (Далее). Если вы оставили физическую подпись, сделайте фото договора и загрузите этот файл.
            </Typography>
          </Box>
        </Box>
        <Box className={styles.getOrder}>
          <Typography className={styles.titleOrder}>Как получить заказ</Typography>
          <Box className={styles.orderBox}>
            <Image src={"/icons/1.png"} height={45} width={15}/>
            <Typography className={styles.orderText} style={{marginLeft: 29}}>Станьте исполнителем и заполните профиль</Typography>
          </Box>
          <Box className={styles.orderBox}>
            <Image src={"/icons/2.png"} height={45} width={24}/>
            <Typography className={styles.orderText}>Выберите задание и откликнитесь на него</Typography>
          </Box>
          <Box className={styles.orderBox}>
            <Image src={"/icons/3.png"} height={45} width={24}/>
            <Typography className={styles.orderText}>Получите оплату сразу же после выполнения задания</Typography>
          </Box>
        </Box>
        <Box className={styles.images}>
          <Box className={styles.imagesBox}>
            <Image src={"/#"} height={320} width={540} className={styles.image}/>
            <Typography className={styles.imagesTitle}>Заголовок</Typography>
            <Typography className={styles.imagesText}>
              Загрузите файл договора с подписью в следующем шаге (Далее). Если вы оставили физическую подпись, сделайте фото договора и загрузите этот файл.
            </Typography>
          </Box>
          <Box className={styles.imagesBox}>
            <Image src={"/#"} height={320} width={540} className={styles.image}/>
            <Typography className={styles.imagesTitle}>Заголовок</Typography>
            <Typography className={styles.imagesText}>
              Загрузите файл договора с подписью в следующем шаге (Далее). Если вы оставили физическую подпись, сделайте фото договора и загрузите этот файл.
            </Typography>
          </Box>
        </Box>
        <Box className={styles.faq}>
          <Typography className={styles.faqTitle}>Часто задаваемые вопросы</Typography>
          <Box className={styles.faqBox}>
            <Typography className={styles.faqText}>Где гарантии что это не обман</Typography>
            <IconButton className={styles.faqMore}>
              <AddIcon />
            </IconButton>
          </Box>
          {/*<Typography className={styles.faqMoreText}>Some text</Typography>*/}
          <Box className={styles.faqBox}>
            <Typography className={styles.faqText}>Как создать задания?</Typography>
            <IconButton className={styles.faqMore}>
              <AddIcon />
            </IconButton>
          </Box>
          {/*<Typography className={styles.faqMoreText}>Some text</Typography>*/}
          <Box className={styles.faqBox}>
            <Typography className={styles.faqText}>Как получить деньги?</Typography>
            <IconButton className={styles.faqMore}>
              <AddIcon />
            </IconButton>
          </Box>
          {/*<Typography className={styles.faqMoreText}>Some text</Typography>*/}
          <Box className={styles.faqBox}>
            <Typography className={styles.faqText}>Как создать задания?</Typography>
            <IconButton className={styles.faqMore}>
              <AddIcon />
            </IconButton>
          </Box>
          <Typography className={styles.faqMoreText}>
            Загрузите файл договора с подписью в следующем шаге (Далее). Если вы оставили физическую подпись, сделайте фото договора и загрузите этот файл.
          </Typography>
        </Box>
        <Button className={styles.startSpecialist} variant={"contained"} onClick={() => router.push({pathname: "/register", query:{specialist: true}})}>Stać specjalistą</Button>
      </Container>
    </Layout>
  );
};

export default StartSpecialist;
