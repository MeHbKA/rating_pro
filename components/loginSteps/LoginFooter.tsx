import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import styles from "/styles/RegAuth/LoginFooter.module.scss"
import Link from "next/link";

const LoginFooter = ({hideLinks}) => {
    return (
        <Container className={styles.loginFooter} disableGutters maxWidth={false}>
            {!hideLinks &&
              <Box className={styles.links}>
                <Link href={'/#'}>
                  <a className={styles.link}>Помощь и поддержка</a>
                </Link>
                ·
                <Link href={'/#'}>
                  <a className={styles.link}>Условия предоставления услуг </a>
                </Link>
                ·
                <Link href={'/#'}>
                  <a className={styles.link}>Политика конфиденциальности</a>
                </Link>
              </Box>
            }
            <hr />
            <Box className={styles.footerText}>
                <Typography>© 2020 Airbnb, Inc. Все права защищены</Typography>
                <Typography>v0.0.1</Typography>
            </Box>
        </Container>
    );
};

export default LoginFooter;
