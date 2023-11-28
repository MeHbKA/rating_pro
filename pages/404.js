import Head from 'next/head'
import {Box, Typography, Button} from '@mui/material';
import Layout from '../layouts/MainLayout/MainLayout';
import styles from "../styles/404.module.scss"

export default function PageNotFound() {
  return (
    <>
    <Head>
        <title>Страница не найдена</title>
        <meta name="description" content="Страница не найдена" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
      <Layout>
            <Box className={styles.wraper} sx={{ height: '100%' }}>
                <Box className={styles.content}>
                  <Typography className={styles.title} variant="h1">404</Typography>
                  <Typography className={styles.subTitle} variant="h2">К сожалению, страницa, которую вы ищете, не существует.</Typography>
                  <Typography className={styles.description} variant="body1">Кажется, мы не можем найти нужную страницу. Попробуйте вернуться на предыдущую страницу или свяжитесь с нами, чтобы начать работу.</Typography>
                  <Button className={styles.buttonOutLine}>
                    Перейти на главную
                  </Button>
                </Box>
            </Box>
      </Layout>
    </>
  )
}


