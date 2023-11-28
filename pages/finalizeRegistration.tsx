import React from 'react';
import {Box, Button, Container, Typography} from "@mui/material";
import styles from "../styles/Profile.module.scss"
import Image from 'next/image'

const FinalizeRegistration = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.containerFinalize}>
        <div className={styles.finalize}>
          <div className={styles.finalizeImage}>
            <Image src={'/profile/icons/finalize.png'} height={186} width={186}/>
          </div>
          <Typography className={styles.title}>
            Все готово
          </Typography>
          <Typography className={styles.little}>
            Теперь вы можете нанимать специалистов для любых бытовых дел.
          </Typography>
          <Button className={styles.button}>
            Посмотреть обьявления
          </Button>
        </div>
      </div>
      <Box className={styles.footerText}>
        <Typography>© 2020 Airbnb, Inc. Все права защищены</Typography>
        <Typography>v0.0.1</Typography>
      </Box>
    </Container>
  );
};

export default FinalizeRegistration;
