import {Button, Card, CardActions, CardContent, Container, Grid,
  IconButton, MenuItem, Select, SelectChangeEvent, Typography, Box } from "@mui/material";
import Layout from "../layouts/MainLayout/MainLayout";
import Image from "next/image"
import styles from "../styles/Projects.module.scss"
import {useState} from "react";
import {useRouter} from "next/router";

const Projects = () => {
  const projects = [
    {
      "id": 8,
      "status": "unconfirmed",
      "description": "description...",
      "startAt": "2021-06-26T15:38:01.000Z",
      "endAt": "2021-06-27T00:00:00.000Z",
      "price": 3.14,
      "createdAt": "2021-06-26T15:38:01.000Z",
      "Specialist": {
        "id": 1,
        "isVerified": true,
        "User": {
          "id": 2,
          "image": "http://dev-rating-pro.local:20123/app/uploads/images/645fc59b9e040b69c7a24c9329586309.png",
          "phone": "+32498403994",
          "firstName": "Slavik",
          "lastName": "Timoschenko",
          "lastSeenAt": "2021-07-01T19:38:11.000Z"
        }
      },
      "Category": {
        "id": 1,
        "name": "IT"
      },
      "SubCategory": {
        "id": 1,
        "name": "Networking"
      }
    },
    {
      "id": 7,
      "status": "unconfirmed",
      "description": "description...",
      "startAt": "2021-06-25T00:00:00.000Z",
      "endAt": "2021-06-26T00:00:00.000Z",
      "price": 3.14,
      "createdAt": "2021-06-24T16:04:24.000Z",
      "Specialist": {
        "id": 1,
        "isVerified": true,
        "User": {
          "id": 2,
          "image": "http://dev-rating-pro.local:20123/app/uploads/images/645fc59b9e040b69c7a24c9329586309.png",
          "phone": "+32498403994",
          "firstName": "Slavik",
          "lastName": "Timoschenko",
          "lastSeenAt": "2021-07-01T19:38:11.000Z"
        }
      },
      "Category": {
        "id": 1,
        "name": "IT"
      },
      "SubCategory": {
        "id": 1,
        "name": "Networking"
      }
    },
    {
      "id": 6,
      "status": "unconfirmed",
      "description": "description...",
      "startAt": "2021-06-25T00:00:00.000Z",
      "endAt": "2021-06-26T00:00:00.000Z",
      "price": 3.14,
      "createdAt": "2021-06-24T16:04:00.000Z",
      "Specialist": {
        "id": 1,
        "isVerified": true,
        "User": {
          "id": 2,
          "image": "http://dev-rating-pro.local:20123/app/uploads/images/645fc59b9e040b69c7a24c9329586309.png",
          "phone": "+32498403994",
          "firstName": "Slavik",
          "lastName": "Timoschenko",
          "lastSeenAt": "2021-07-01T19:38:11.000Z"
        }
      },
      "Category": {
        "id": 1,
        "name": "IT"
      },
      "SubCategory": {
        "id": 1,
        "name": "Networking"
      }
    },
    {
      "id": 5,
      "status": "unconfirmed",
      "description": "description...",
      "startAt": "2021-06-25T00:00:00.000Z",
      "endAt": "2021-06-26T00:00:00.000Z",
      "price": 3.14,
      "createdAt": "2021-06-24T16:03:11.000Z",
      "Specialist": {
        "id": 1,
        "isVerified": true,
        "User": {
          "id": 2,
          "image": "http://dev-rating-pro.local:20123/app/uploads/images/645fc59b9e040b69c7a24c9329586309.png",
          "phone": "+32498403994",
          "firstName": "Slavik",
          "lastName": "Timoschenko",
          "lastSeenAt": "2021-07-01T19:38:11.000Z"
        }
      },
      "Category": {
        "id": 1,
        "name": "IT"
      },
      "SubCategory": {
        "id": 1,
        "name": "Networking"
      }
    },
    {
      "id": 4,
      "status": "unconfirmed",
      "description": "description...",
      "startAt": "2021-06-25T00:00:00.000Z",
      "endAt": "2021-06-26T00:00:00.000Z",
      "price": 3.14,
      "createdAt": "2021-06-24T16:02:35.000Z",
      "Specialist": {
        "id": 1,
        "isVerified": true,
        "User": {
          "id": 2,
          "image": "http://dev-rating-pro.local:20123/app/uploads/images/645fc59b9e040b69c7a24c9329586309.png",
          "phone": "+32498403994",
          "firstName": "Slavik",
          "lastName": "Timoschenko",
          "lastSeenAt": "2021-07-01T19:38:11.000Z"
        }
      },
      "Category": {
        "id": 1,
        "name": "IT"
      },
      "SubCategory": {
        "id": 1,
        "name": "Networking"
      }
    },
    {
      "id": 3,
      "status": "unconfirmed",
      "description": "description...",
      "startAt": "2021-06-25T00:00:00.000Z",
      "endAt": "2021-06-26T00:00:00.000Z",
      "price": 3.14,
      "createdAt": "2021-06-24T16:00:47.000Z",
      "Specialist": {
        "id": 1,
        "isVerified": true,
        "User": {
          "id": 2,
          "image": "http://dev-rating-pro.local:20123/app/uploads/images/645fc59b9e040b69c7a24c9329586309.png",
          "phone": "+32498403994",
          "firstName": "Slavik",
          "lastName": "Timoschenko",
          "lastSeenAt": "2021-07-01T19:38:11.000Z"
        }
      },
      "Category": {
        "id": 1,
        "name": "IT"
      },
      "SubCategory": {
        "id": 1,
        "name": "Networking"
      }
    },
    {
      "id": 2,
      "status": "unconfirmed",
      "description": "description...",
      "startAt": "2021-06-25T00:00:00.000Z",
      "endAt": "2021-06-26T00:00:00.000Z",
      "price": 3.14,
      "createdAt": "2021-06-24T15:28:09.000Z",
      "Specialist": {
        "id": 1,
        "isVerified": true,
        "User": {
          "id": 2,
          "image": "http://dev-rating-pro.local:20123/app/uploads/images/645fc59b9e040b69c7a24c9329586309.png",
          "phone": "+32498403994",
          "firstName": "Slavik",
          "lastName": "Timoschenko",
          "lastSeenAt": "2021-07-01T19:38:11.000Z"
        }
      },
      "Category": {
        "id": 1,
        "name": "IT"
      },
      "SubCategory": {
        "id": 1,
        "name": "Networking"
      }
    },
    {
      "id": 1,
      "status": "unconfirmed",
      "description": "description...",
      "startAt": "2021-06-25T00:00:00.000Z",
      "endAt": "2021-06-26T00:00:00.000Z",
      "price": 3.14,
      "createdAt": "2021-06-24T15:22:56.000Z",
      "Specialist": {
        "id": 1,
        "isVerified": true,
        "User": {
          "id": 2,
          "image": "http://dev-rating-pro.local:20123/app/uploads/images/645fc59b9e040b69c7a24c9329586309.png",
          "phone": "+32498403994",
          "firstName": "Slavik",
          "lastName": "Timoschenko",
          "lastSeenAt": "2021-07-01T19:38:11.000Z"
        }
      },
      "Category": {
        "id": 1,
        "name": "IT"
      },
      "SubCategory": {
        "id": 1,
        "name": "Networking"
      }
    }
  ]
  
  const [status, setStatus] = useState('Skrzynka odbiorcza');
  
  const router = useRouter();
  
  const handleSelect = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
    console.log(status)
  };
  
  return (
    <Layout>
      <Container className={styles.main} disableGutters maxWidth={false}>
        <div className={styles.header}>
          <Typography className={styles.left}>Projekty</Typography>
          <Select
            className={styles.select}
            value={status}
            onChange={handleSelect}
          >
            <MenuItem value={'Skrzynka odbiorcza'}>Skrzynka odbiorcza</MenuItem>
            <MenuItem value={'Принятые'}>Принятые</MenuItem>
            <MenuItem value={'Завершенные'}>Завершенные</MenuItem>
            <MenuItem value={'Отмененные'}>Отмененные</MenuItem>
          </Select>
        </div>
        <Grid container spacing={0} className={styles.cardContainer}>
          {projects.map((item, index) => {
            console.log(item)
            return (
              <Grid item key={item.id} xs={12} md={6} sx={{p: 1}} onClick={() => {router.push(`/projects/${item.id}`)}}>
                <CardContent className={styles.projectCard} sx={{p: 0}}>
                  <Box className={styles.cardHeader}>
                    <Box className={styles.statusBox}>
                      <div className={styles.statusIcon}>
                        <Image src={"/projects/icons/calendar.png"} height={12} width={12}/>
                      </div>
                      <Typography className={styles.status}>{item.status}</Typography>
                    </Box>
                    <Box className={styles.date}>
                      <Typography className={styles.dateText}>{new Date(item.startAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' })} - </Typography>
                      <Typography className={styles.dateText}>{new Date(item.endAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' })}</Typography>
                    </Box>
                  </Box>
                  <Typography className={styles.description}>
                    {/*{item.description} TODO unlock*/}
                    Доставить собаку в вет-центр и обратно на авто, так же текст может быть слишком длинным, нужно как-то обрезать и ставить троеточие
                  </Typography>
                  <Box className={styles.priceAndCategory}>
                    <Typography className={styles.category}>{item.Category.name}</Typography>
                    <Typography className={styles.price}>{item.price}</Typography>
                  </Box>
                  <Typography className={styles.text}>Принять заказ от:</Typography>
                  <Box className={styles.employee}>
                    <Image
                      // src={item.Specialist.User.image} TODO unlock src
                      src={"/avatar.png"}
                      height={45} width={55}/>
                    <Container className={styles.employeeDetails}>
                      <Typography className={styles.name}>
                        {`${item.Specialist.User.firstName}  ${item.Specialist.User.lastName}`}
                      </Typography>
                      <Box className={styles.ratingBox}>
                        <Image src={"/projects/icons/star.png"} height={13} width={13} />
                        <Typography className={styles.rating}>
                          4.3
                        </Typography>
                        <Typography className={styles.ratingNum}>
                          (18)
                        </Typography>
                      </Box>
                    </Container>
                  </Box>
                </CardContent>
              </Grid>
            )
          })
          }
        </Grid>
      </Container>
    </Layout>
  );
};

export default Projects;
