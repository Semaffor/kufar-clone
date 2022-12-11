import React, {useState} from 'react';
import cl from './forgotPassword.module.scss'
import * as Yup from 'yup';
import {Field, Form, Formik} from "formik";
import MyButton from "../../shared/ui/button/MyButton";
import UserService from "../../API/UserService";
import {Alert, Button} from "@mui/material";
import cl_1 from '../../shared/ui/button/MyInput.module.scss'

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Неверный адрес почты').required('Обязательное поле'),
});

const ForgotPassword = () => {

  const [sended, setSended] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [isLoading, setLoading] = useState(false)

  return (
    <div className={cl.ForgotPassword}>
      <h1>Восстановление пароля</h1>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async values => {
          setSended(true)
          setIsLoading(true)
          const response = await UserService.recoverPassword(values);
          setIsLoading(false)

          console.log(response)
          setCorrect(response.data);
        }}
      >
        {({errors, touched}) => (
          <Form>
            <Field className={cl_1.Input}
                   name="email" type="email" placeholder="email"/>
            {errors.email && touched.email
              ? <Alert severity='error'>{errors.email}</Alert>
              : null}

            {correct
              ? <Alert severity='success'>Письмо отправлено на указанную почту.</Alert>
              : null
            }

            {!correct && sended
              ? <Alert severity='warning'>Почтовый ящик в системе не найден</Alert>
              : null
            }

            {!sended
              ? <Button sx={{mt: 2}} variant="contained" type="submit">Восстановить</Button>
              : null
            }

            {sended && !correct
              ? <Button sx={{mt: 2}} variant="contained" type="submit">Восстановить</Button>
              : null
            }
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;