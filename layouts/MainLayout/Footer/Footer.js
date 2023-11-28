import Image from 'next/image';
import Link from "next/link"
import { ListItem, List, Grid, Typography, Stack, Container, Paper, } from '@mui/material';
import styles from "../../../styles/Footer.module.scss"


const cities = [
    {
      name: 'Варшава'
    },
    {
      name: 'Краков'
    },
    {
      name: 'Лодзь'
    },
    {
      name: 'Вроцлав'
    }
];

const services = [
  {
    name: 'Услуга 1'
  },
  {
    name: 'Услуга 2'
  },
  {
    name: 'Услуга 3'
  },
  {
    name: 'Услуга 4'
  }
];

const company = [
  {
    name: 'Про компанию'
  },
  {
    name: 'Privacy Policy'
  }
];

const contacts = [
  {
    name: 'info@estabild.com'
  },
  {
    name: '+46 (0) 81-213-7994'
  }
];

const links = [
  {
    name: 'Stać specjalistą'
  },
  {
    name: 'Партнерская программа'
  },
  {
    name: 'Blog'
  },
  {
    name: 'Новый заказ'
  }
];

export default function Footer({ props }) {
    return (
      <Container className={styles.footerContainer} sx={{ flexGrow: 1 }}>
        <Container className={styles.row}>
        <Grid container spacing={1}>
          <Grid item lg={3} sm={12} xs={12}>
            <Image src="/logo.png" alt="Logo" width={78} height={40}/>
            <Typography className={styles.description}>Real-time updates on construction development.</Typography>
            <Stack direction="row" spacing={2}>
              <Paper className={styles.socialItem} elevation={0}>
                <Image src="/icons/instagram.svg" alt="instagram" width={24} height={24}/>
              </Paper>
              <Paper className={styles.socialItem} elevation={0}>
                <Image src="/icons/facebook.svg" alt="facebook" width={24} height={24}/>
              </Paper>
            </Stack> 
          </Grid>
          <Grid item lg={2} sm={4} xs={6}>
            <Typography className={styles.title}>Города</Typography>
            <List sx={{ width: '100%' }}>
              {cities.map((item, index) => (
                <ListItem key={index} disableGutters>
                    <Link href="#">
                      <a className={styles.footerLink}>{item.name}</a>
                    </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item lg={2} sm={4} xs={6}>
            <Typography className={styles.title}>Услуги</Typography>
            <List sx={{ width: '100%' }}>
              {services.map((item, index) => (
                <ListItem sx={{ paddingTop: '8px', paddingBottom: '8px' }} key={index} disableGutters>
                  <Link href="#">
                    <a className={styles.footerLink}>{item.name}</a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item lg={2} sm={4} xs={12}>
            <Typography className={styles.title}>Компания</Typography>
            <List sx={{ width: '100%' }}>
              {company.map((item, index) => (
                <ListItem sx={{ paddingTop: '8px', paddingBottom: '8px' }} key={index} disableGutters>
                  <Link href="#">
                    <a className={styles.footerLink}>{item.name}</a>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Typography className={styles.title} sx={{ marginTop: '8px' }}>Контакты</Typography>
            <List sx={{ width: '100%' }}>
              {contacts.map((item, index) => (
                <ListItem sx={{ paddingTop: '8px', paddingBottom: '8px' }} key={index} disableGutters>
                  <Link href="#">
                    <a className={styles.footerLink}>{item.name}</a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item lg={3} sm={12} xs={12}>
            <List disablePadding={true} sx={{ width: '100%' }}>
              {links.map((item, index) => (
                <ListItem sx={{ paddingTop: '0px', paddingBottom: '0px', marginBottom: '28px' }} key={index} disableGutters>
                  <Link href="#">
                    <a className={styles.mainLink}>{item.name}</a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography className={styles.copyright}>
              Copyright © 2020. Estabild AB. All rights reserved. Organization number: 559228-3211
            </Typography>
          </Grid>
        </Grid>
        </Container>
      </Container>
    );
};