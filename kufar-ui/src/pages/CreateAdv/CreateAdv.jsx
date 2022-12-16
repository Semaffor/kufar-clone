import React, {useMemo, useState} from 'react';
import cl from './CreateAdv.module.scss'
import ff from '../Entrance/FormField.module.scss'
import {Alert, Button,} from "@mui/material";
import MyButton from "../../shared/ui/button/MyButton";
import {useFetching} from "../../shared/hooks/useFetching";
import CategoryService from "../../API/CategoryService";
import Loader from "../../shared/ui/loader/Loader";
import ProductService from "../../API/ProductService";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import UserService from "../../API/UserService";


const CreateAdvSchema = Yup.object().shape({
  productName: Yup.string()
    .min(3, 'Слишком короткое название')
    .max(50, 'Слишком длинное название')
    .required('Обязательное поле'),
  categoryId: Yup.string()
    .required('Выберите категорию'),
  // description: Yup.string()
  //   .min(10, 'Слишком короткое описание, минимально 10 символов')
  //   .max(4000, 'Не более 4000 символов'),
  price: Yup.number()
    //   .positive("Цена должна быть больше 0")
    //   .integer("Цена должна быть больше 0")
    .required("Обязательное поле"),
});


const CreateAdv = () => {

  const [categories, setCategories] = useState(0);
  const [isActivePrice, setIsActivePrice] = useState(true);
  const [isActiveFree, setIsActiveFree] = useState(false);

  const [fetching, isLoading, error] = useFetching(async () => {
    const data = await CategoryService.getAllCategories();
    setCategories(data);
  })

  useMemo(() => fetching(), [])

  function handleClick() {
    if (isActivePrice) {
      setIsActiveFree(true);
      setIsActivePrice(false);
    } else {
      setIsActiveFree(false);
      setIsActivePrice(true);
    }
  }

  return (
    <div>
      {isLoading
        ? <Loader/>
        : <View
          categories={categories}
          isActiveFree={isActiveFree}
          isActivePrice={isActivePrice}
          callback={handleClick}
        />}
    </div>
  );
};

const View = ({categories, callback, isActivePrice, isActiveFree}) => {
  const [description, setDescription] = useState("");
  const [state, setState] = useState(0);

  const [fetching, isLoading, errorsReq] = useFetching(async (credentials) => {
    const resp = await ProductService.saveProduct(credentials)

    if (resp.status === 200) {
      setState(1)
    }
  })

  return (
    <div className={cl.CreateAdv}>
      <h1>Подача объявления</h1>

      <Formik
        initialValues={{
          userId: localStorage.getItem("userId"),
          productName: '',
          categoryId: '',
          description: '',
          price: "0",
          isExchanged: false,
        }}
        validationSchema={CreateAdvSchema}
        onSubmit={values => {
          values.description = description;
          console.log(values)
          if (values.price === 0) {
            values.price = 'free'
          }
          fetching(values)
        }}
      >
        {({errors, touched}) => (
          <Form>

            <div className={cl.CreateAdv__param}>Название товара/услуги*</div>
            <Field
              className={ff.Input}
              name="productName"
              placeholder="Название продукта"
            />

            <div className={ff.Error}>
              {errors.productName && touched.productName
                ? <Alert severity='error'>{errors.productName}</Alert>
                : null}
            </div>

            <div className={cl.CreateAdv__param}>Выбор категории*</div>
            <div className={cl.ComboWrapper}>
              <Field as="select"
                     name="categoryId" style={{width: "100%", height: "25px"}}>
                <option value="" selected disabled hidden>---</option>
                {
                  categories.map(category => {
                    return <option key={category.id} value={category.id}>{category.label}</option>
                  })
                }
              </Field>
            </div>
            <div className={ff.Error}>
              {errors.categoryId && touched.categoryId
                ? <Alert sx={{mt: 1}} severity='error'>{errors.categoryId}</Alert>
                : null}
            </div>

            <div className={cl.CreateAdv__param}>Описание*</div>
            <textarea name="description"
                      onChange={e => setDescription(e.target.value)}
            />
            <div> {description.length} из 4000 знаков
            </div>
            <div className={ff.Error}>
              {errors.description && touched.description
                ? <Alert sx={{mt: 1}} severity='error'>{errors.description}</Alert>
                : null}
            </div>

            <h2>Цена</h2>
            <div className={cl.CreateAdv__btns}>
              <MyButton isActive={isActivePrice} text={"Цена"} callback={callback}/>
              <MyButton isActive={isActiveFree} text={"Бесплатно"} callback={callback}/>
            </div>

            {isActivePrice ?
              <Field
                name="price"
                placehodelr={"Цена, р."}
              />
              : <div/>
            }

            <div className={ff.Error}>
              {errors.price && touched.price
                ? <Alert severity='error'>{errors.price}</Alert>
                : null}
            </div>

            <div style={{marginTop: 20}}>
              <label>
                <Field type="checkbox" name="isExchanged"/>
                <span style={{marginLeft: 10}}>Готов к обмену</span>
              </label>
            </div>

            <Button
              disabled={state === 1}
              sx={{mt: 2}}
              type="submit"
              color={"success"}
              variant="contained"
            >
              Подать объявление
            </Button>

            {state === 1
              ? <Alert sx={{mt: 1}} severity='success'>Объявление добавлено</Alert>
              : null
            }
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default CreateAdv;