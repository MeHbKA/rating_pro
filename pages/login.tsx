import React, {useEffect, useState} from 'react';
import styles from "../styles/RegAuth/Login.module.scss";
import LoginFooter from "../components/loginSteps/LoginFooter";
import Image from 'next/image';
import Link from 'next/link';
import {Button, Checkbox, Container, TextField, Typography} from "@mui/material";
import {useRouter} from "next/router";
import ReactCodeInput from "react-verification-code-input";
import {loginAction, sendCodeLoginAction} from "../store/action-creators/loginActions";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";

const SignIn = () => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('')
  
  const router = useRouter();
  const dispatch = useDispatch();
  const fromSpecialist = router.query.specialist
  
  
  const [loginData, setLoginData] = useState({
    login: null,
    password: null
  });
  
  const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }
  
  const {loadingLogin, loginState, errorLogin} = useTypedSelector(state => state.login)
  
  const auth = async () => {
    dispatch(loginAction(loginData.login))
    setStep(step + 1);
  }
  
  const handleCodeChange = (code) => {
    setCode(code);
  }
  
  const sendCode = async () => {
    await dispatch(sendCodeLoginAction(loginState, code));
    await router.push('/')
  }
  
  let token;
  useEffect(()=> {
    token = localStorage.getItem('token');
    
  },[])
  
  return (
    <Container className={styles.container} disableGutters maxWidth={false}>
      {step === 1 ?
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
          {!fromSpecialist &&
            <>
              <hr/>
              <Button className={styles.specButton} onClick={()=> router.push('/startSpecialist')}>
                <Image src={"/login/icons/wand.png"} height={20} width={20} />
                <Typography className={styles.specialist}>Работать специалистом</Typography>
              </Button>
            </>
          }
          <LoginFooter hideLinks={false}/>
        </div>
      :
          <div className={styles.left}>
            <div className={styles.logo}>
              <Image src={"/logo.png"} height={60} width={120} />
            </div>
            <div className={styles.title}>Подтвердить номер</div>
            <div className={styles.little}>Введите код, отправленный на номер {loginData.login}</div>
            <ReactCodeInput
              type={"number"}
              fields={4}
              onChange={handleCodeChange}
              fieldWidth={50}
              fieldHeight={50}
              className={styles.registerCode}
            />
      
            <div className={styles.codeHints}>
              <div className={styles.notReceive}>
                Не получили код?
              </div>
              <div className={styles.send}>
                Отправить еще раз
              </div>
            </div>
      
            <Button
              className={styles.continue}
              fullWidth
              variant={'contained'}
              onClick={() => sendCode()}
            >
              Продолжить
            </Button>
      
            <LoginFooter hideLinks={false} />
          </div>
      }
      <div className={styles.right}>
        <Image src={"/login/images/plumberRegAuth.png"} height={960} width={856} />
      </div>
    </Container>
  );
};

export default SignIn;
