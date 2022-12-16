import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import cl from "./FormField.module.scss"
import KeyIcon from '@mui/icons-material/Key';
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {useFetching} from "../../shared/hooks/useFetching";
import UserService from "../../API/UserService";
import {AuthContext} from "../../shared/context/globalContext";


const LogInSchema = Yup.object().shape({
  login: Yup.string()
    .min(3, 'Не менее 3 символов')
    .max(50, 'Слишком длинный логин')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(3, 'Не менее 3 символов')
    .max(30, 'Не более 30 символов')
    .required('Обязательное поле'),

});

const LogIn = () => {
  const router = useNavigate()
  const {user, setUser} = useContext(AuthContext)
  const[state, setState] = useState(0)

  const [fetching, isLoading, errorsReq] = useFetching(async (credentials) => {
    const resp = await UserService.authInSystem(credentials)
    const statusCode = resp.data.statusCode

    if (statusCode === 'OK') {
      setState(1)
      const user = resp.data
      setUser(user);
      localStorage.setItem("isAdmin", user?.roles.includes('Администратор'))
      localStorage.setItem("userId", user?.id)
      localStorage.setItem("login", user?.login)
      router('/products')
    } else if (statusCode === 'INCORRECT_LOGIN_OR_PASSWORD') {
      setState(2)
    } else if (statusCode === 'ACCOUNT_NOT_ACTIVATED'){
      setState(3)
    } else if (statusCode === 'ACCOUNT_BAN') {
      setState(4)
    }
  })

  return (
    <div className={cl.LogIn}>
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={LogInSchema}
        onSubmit={values => {
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
                <KeyIcon sx={{mr: 1, my: 1}} color={'primary'}/>
                <Field
                  className={cl.Input}
                  name="password"
                  type="password"
                  placeholder="Пароль"
                />
              </div>
              <a href={"#"} onClick={router('/user/recover')}/>
              wqeqweqw
              <div className={cl.Error}>
                {errors.password && touched.password
                  ? <Alert sx={{mt: 1}} severity='error'>{errors.password}</Alert>
                  : null}
              </div>
            </div>

            {state === 1
              ? <Alert sx={{mt: 1}} severity='success'>Вход выполнен</Alert>
              : null}

            {state === 2
              ? <Alert sx={{mt: 1}} severity='error'>Неверный логин/пароль</Alert>
              : null}

            {state === 3
              ? <Alert sx={{mt: 1}} severity='warning'>Аккаунт не активирован</Alert>
              : null}

            {state === 4
              ? <Alert sx={{mt: 1}} severity='warning'>Аккаунт заблокирован</Alert>
              : null}

            <Button
              disabled={state === 1}
              sx={{mt: 2}}
              type="submit"
              variant="contained"
            >
              Войти
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogIn;