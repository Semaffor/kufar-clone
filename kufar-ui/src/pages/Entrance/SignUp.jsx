import React, {useState} from 'react';
import {AccountCircle} from "@mui/icons-material";
import {Alert, Button} from "@mui/material";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import UserService from "../../API/UserService";
import useScript from "../../shared/hooks/useScript";
import {useFetching} from "../../shared/hooks/useFetching";
import * as Yup from 'yup';
import {Field, Form, Formik} from "formik";
import cl from "./FormField.module.scss";
import KeyIcon from "@mui/icons-material/Key";

window.responseCaptcha = (response) => {};

const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(3, 'Не менее 3 символов')
    .max(50, 'Слишком длинный логин')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Неккоректный почтовый адрес').required('Обязательное поле'),
  password: Yup.string()
    .min(3, 'Не менее 3 символов')
    .max(30, 'Не более 30 символов')
    .required('Обязательное поле'),
  repeatedPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
});

const SignUp = () => {
  const [captcha, setCaptcha] = useState('');
  const [regState, setRegState] = useState(0);

  const [fetching, isLoading, errorsReq] = useFetching(async (newUser) => {
    const resp = await UserService.saveUser(newUser)
    console.log(regState)

    if (resp.data === true) {
      setRegState(1)
    } else if (resp.data === 'exists') {
      setRegState(2)
    } else if (resp.data === 'captcha'){
      setRegState(3)
    }
    console.log(regState)

  })

  function onChangeCaptcha(response) {
    setCaptcha(response)
  }

  window.responseCaptcha = onChangeCaptcha;
//Oh, my...
  useScript("http://www.google.com/recaptcha/api.js")

  return (
    <div className={cl.FForm}>
      <Formik
        initialValues={{
          login: '',
          email: '',
          password: '',
          repeatedPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          console.log(values)
          values.captchaResponse = captcha
          fetching(values)
        }}
      >
        {({errors, touched}) => (
          <Form>
            <div className={cl.CustomFieldBox}>
              <div className={cl.MyField}>
                <AccountCircle sx={{mr: 1, my: 1}} color={'primary'}/>
                <Field
                  className={cl.Input}
                  name="login"
                  placeholder="Логин"
                />
              </div>
              <div className={cl.Error}>
                {errors.login && touched.login
                  ? <Alert sx={{mt: 1}} severity='error'>{errors.login}</Alert>
                  : null}
              </div>
            </div>

            <div className={cl.CustomFieldBox}>
              <div className={cl.MyField}>
                <MailOutlinedIcon sx={{mr: 1, my: 1}} color={'primary'}/>
                <Field
                  className={cl.Input}
                  name="email"
                  type="email"
                  placeholder="Почта"
                />
              </div>
              <div className={cl.Error}>
                {errors.email && touched.email
                  ? <Alert sx={{mt: 1}} severity='error'>{errors.email}</Alert>
                  : null}
              </div>
            </div>

            <div className={cl.CustomFieldBox}>
              <div className={cl.MyField}>
                <KeyIcon sx={{mr: 1, my: 1}} color={'primary'}/>
                <Field
                  className={cl.Input}
                  name="password"
                  type="password"
                  placeholder="Пароль"
                />
              </div>
              <div className={cl.Error}>
                {errors.password && touched.password
                  ? <Alert sx={{mt: 1}} severity='error'>{errors.password}</Alert>
                  : null}
              </div>
            </div>

            <div className={cl.CustomFieldBox}>
              <div className={cl.MyField}>
                <KeyIcon sx={{mr: 1, my: 1}} color={'primary'}/>
                <Field
                  className={cl.Input}
                  name="repeatedPassword"
                  type="password"
                  placeholder="Повторите пароль"
                />
              </div>
              <div className={cl.Error}>
                {errors.repeatedPassword && touched.repeatedPassword
                  ? <Alert sx={{mt: 1}} severity='error'>{errors.repeatedPassword}</Alert>
                  : null}
              </div>
            </div>

            <div
              className="g-recaptcha"
              data-sitekey="6LcxGG8jAAAAAGvHNMQb128-l9JlR0iCG66XDcZE"
              data-callback="responseCaptcha"
            />

            {regState === 1
              ? <Alert sx={{mt: 1}} severity='success'>Код для активации выслан на почту</Alert>
              : null}

            {regState === 2
              ? <Alert sx={{mt: 1}} severity='error'>Логин/почта уже используется</Alert>
              : null}

            {regState === 3
              ? <Alert sx={{mt: 1}} severity='error'>Каптча не пройдена</Alert>
              : null}

            <Button
              disabled={regState === 1}
              sx={{mt: 2}}
              type="submit"
              color={"success"}
              variant="contained"
            >
              Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;