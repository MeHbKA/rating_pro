import React, {useEffect, useState} from 'react';
import styles from "../styles/RegAuth/Register.module.scss";
import Image from "next/image";
import {Button, Checkbox, TextField, Typography, Container, FormControl} from "@mui/material";
import Link from "next/link";
import LoginFooter from "../components/loginSteps/LoginFooter";
import {useRouter} from "next/router";
import axios from "axios";
import ReactCodeInput from "react-verification-code-input";
import {useFormik} from "formik";
import * as yup from 'yup';
import moment from "moment";
import {finalizeAction, registerAction, sendCodeAction} from "../store/action-creators/registerActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";

const Register = () => {
    const [step, setStep] = useState(1)
    const [code, setCode] = useState('')
    const router = useRouter();
    
    const fromSpecialist = router.query.specialist
    const dispatch = useDispatch();
    const {loadingRegister, registerState, errorRegister} = useTypedSelector(state => state.register)
    const [loginData, setLoginData] = useState({
        login: null
    });
    let token;
    useEffect(()=> {
        token = localStorage.getItem('token');
        
    },[])
    
    const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const reg = async () => {
        await dispatch(registerAction(loginData.login))
        setStep(step + 1)
    }

    const handleCodeChange = (code) => {
        setCode(code);
    }
    
    const sendCode = async () => {
        await dispatch(sendCodeAction(registerState, code));
        setStep(step + 1)
    }
    
    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Имя обязательно'),
        surname: yup
            .string()
            .required('Фамилия обязательна'),
        date: yup
            .string()
            .required('Дата рождения обязательна')
            .test("DOB", "Минимальный возраст для регистрации: 18 лет", (value) => {
                return moment().diff(moment(value), "years") >= 18;
            }),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        passwordSubmit: yup
            .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            date: '',
            email: '',
            password: '',
            passwordSubmit: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(finalizeAction(values, token))
            setStep(step + 1)
        },
    });

    return (
        <Container className={styles.container} disableGutters maxWidth={false}>
            {step === 1 ?
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Image src={"/logo.png"} height={60} width={120} />
                    </div>
                    <div className={styles.title}>Rejestracja</div>
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
                        <Typography className={styles.formHint}>
                            Мы позвоним вам или отправим SMS, чтобы подтвердить номер телефона.
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
                        onClick={reg}
                    >
                        Продолжить
                    </Button>
                    <div className={styles.notRegisteredContainer}>
                        <Typography className={styles.notRegistered}>
                            Зарегистрированы на Rating Pro?
                        </Typography>
                        <Button className={styles.register} onClick={() => router.push("/login")}>Logowanie</Button>
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
                    <LoginFooter hideLinks={false} />
                </div>
                : step === 2 ?
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
                        onClick={sendCode}
                    >
                        Продолжить
                    </Button>

                    <LoginFooter hideLinks={false} />
                </div>
                : step === 3 ?
                <div className={`${styles.left} ${styles.finishForm}`}>
                    <div className={styles.logo}>
                        <Image src={"/logo.png"} height={60} width={120} />
                    </div>
                    <div className={styles.title}>Завершить регистрацию</div>
                    <form onSubmit={formik.handleSubmit} className={styles.form}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Имя"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            id="surname"
                            name="surname"
                            label="Фамилия"
                            value={formik.values.surname}
                            onChange={formik.handleChange}
                            error={formik.touched.surname && Boolean(formik.errors.surname)}
                            helperText={formik.touched.surname && formik.errors.surname}
                        />
                        <Typography className={styles.formHint}>
                            Имя должно совпадать с данными в удостоверении личности.
                        </Typography>
                        <Typography className={styles.title}>
                            Дата рождения
                        </Typography>
                        <TextField
                            id="date"
                            type="date"
                            fullWidth
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                        />
                        <Typography className={styles.formHint}>
                            Минимальный возраст для регистрации: 18 лет. Другие пользоватлеи Rating Pro не увидят дату вашего рождения.
                        </Typography>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Электронный адрес"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <Typography className={styles.formHint}>
                            Мы отправим подтверждения и квитанции вам на почту.
                        </Typography>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            label="Пароль"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            fullWidth
                            id="passwordSubmit"
                            name="passwordSubmit"
                            type="password"
                            label="Подтвердите пароль"
                            value={formik.values.passwordSubmit}
                            onChange={formik.handleChange}
                            error={formik.touched.passwordSubmit && Boolean(formik.errors.passwordSubmit)}
                            helperText={formik.touched.passwordSubmit && formik.errors.passwordSubmit}
                        />
                        <Button
                            className={styles.continue}
                            fullWidth
                            variant={'contained'}
                            type={"submit"}
                        >
                            Согласиться и продолжить
                        </Button>
                        <Typography className={styles.accept}>
                            {/*TODO add links*/}
                            Нажимая
                            <span className={styles.bold}>&nbsp;Согласится и продолжить,&nbsp; </span>
                            я принимаю изложенное в следующих документах:
                            <Link href="/#">
                                <a className={styles.acceptLink}>&nbsp;Условия предоставления услуг,&nbsp;</a>
                            </Link>
                            <Link href="/#">
                                <a className={styles.acceptLink}>&nbsp;Условия обработки платежей,&nbsp;</a>
                            </Link>
                            <Link href="/#">
                                <a className={styles.acceptLink}>&nbsp;Политика конфиденциальности.</a>
                            </Link>
                        </Typography>
                    </form>

                    <LoginFooter hideLinks/>
                </div>
                :
                <div className={`${styles.left} ${styles.finish}`}>
                    <div className={styles.logo}>
                        <Image src={"/logo.png"} height={60} width={120} />
                    </div>
                    <div className={styles.title}>Отлично</div>
                    <div className={styles.little}>Теперь у вас есть аккаунт в сообществе Rating Pro. Осталось заполнить личный профиль.</div>

                    <Button
                        className={styles.continue}
                        fullWidth
                        variant={'contained'}
                        onClick={() => fromSpecialist ? router.push('/registerSpecialist') : router.push("/finalizeClient")}
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

export default Register;
