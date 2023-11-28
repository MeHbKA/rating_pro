import Layout from "../../layouts/MainLayout/MainLayout";
import { useRouter } from "next/router"
import styles from '../../styles/SoloProject.module.scss'
import {Box, Button, Container, Typography} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import React from "react";

export default function () {
  const router = useRouter()
  return (
    <Layout>
      <Container className={styles.container}>
        <Button onClick={() => router.push('/projects')}>
          <KeyboardBackspaceIcon className={styles.back}/>
        </Button>
        <Box className={styles.titleBox}>
          <Typography className={styles.title}>Доставить собаку в вет-центр и обратно, на авто</Typography>
          <Box className={styles.description}>
            <Box className={styles.status}>
              <CalendarTodayIcon />
              <Typography className={styles.text}>Входящие</Typography>
            </Box>
            <Typography className={styles.city}>Варшава</Typography>
            <Box className={styles.visits}>
              <Typography className={styles.start}>3 фев, 2021 г. – </Typography>
              <Typography className={styles.end}>6 фев, 2021 г.</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  
)
}



