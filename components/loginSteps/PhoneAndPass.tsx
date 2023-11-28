import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Button, Checkbox, Container, TextField, Typography} from "@mui/material";
import styles from "/styles/RegAuth/Login.module.scss"
import LoginFooter from "./LoginFooter";
import axios from "axios";
import {useRouter} from "next/router";

const PhoneAndPass = () => {

    const router = useRouter();

    const [loginData, setLoginData] = useState({
        login: null,
        password: null
    });

    const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const auth = async () => {
        await axios.post(
            'https://api.3dmadcat.ru/public/user/login/request',
            {
                "phone" : loginData.login,
                "password" : loginData.password,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            ).then((response) => console.log(response))
    }

    return (
        <Container className={styles.container}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Image src={"/logo.png"} height={60} width={120} />
                </div>
                <div className={styles.title}>Logowanie</div>
                <div className={styles.little}>Добро пожаловать в Rating Pro</div>
                <div className={styles.form}>
                    <TextField
                        fullWidth
                        type={'text'}
                        placeholder={'Номер телефона или e-mail'}
                        className={styles.login}
                        name={"login"}
                        onChange = {handleLoginData}
                    />
                    <div className={styles.passField}>
                        <TextField
                            fullWidth
                            type={'password'}
                            placeholder={'Пароль'}
                            className={styles.password}
                            name={"password"}
                            onChange = {handleLoginData}
                        />
                        {/*TODO forgot pass*/}
                        <Button className={styles.forgot}>Забыли пароль?</Button>
                    </div>
                    <Typography className={styles.formHint}>
                        Для подтверждения личности мы свяжемся с Вами по номеру телефона или e-mail
                    </Typography>
                </div>
                <div className={styles.privacyPolicy}>
                    <Checkbox defaultChecked />
                    <Typography className={styles.privacyText}>
                        Я принимаю условия
                        <Link href={'/#'} >
                            {/*TODO add privacy policy*/}
                            <a className={styles.privacyLink}>POLITYKA PRYWATNOŚCI I COOKIES</a>
                        </Link>
                    </Typography>
                </div>
                <Button
                    className={styles.continue}
                    fullWidth
                    variant={'contained'}
                    onClick={auth}
                >
                    Продолжить
                </Button>
                <div className={styles.notRegisteredContainer}>
                    <Typography className={styles.notRegistered}>
                        Не зарегистрированы на Rating Pro?
                    </Typography>
                    <Button className={styles.register} onClick={() => router.push("/register")}>Зарегистрироваться</Button>
                </div>
                <hr />
                <Button className={styles.specButton} onClick={()=> {console.log('yup')}}>
                    <Image src={"/login/icons/wand.png"} height={20} width={20} />
                    <Typography className={styles.specialist}>Работать специалистом</Typography>
                </Button>
                <LoginFooter hideLinks={false}/>
            </div>
            <div className={styles.right}>
                <Image src={"/login/images/plumberRegAuth.png"} height={1052} width={856} />
            </div>
        </Container>
    );
};

export default PhoneAndPass;
