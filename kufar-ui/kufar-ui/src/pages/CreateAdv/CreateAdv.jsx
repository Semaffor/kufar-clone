import React, {useEffect, useMemo, useState} from 'react';
import cl from './CreateAdv.module.scss'
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl, FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from "@mui/material";
import MyInput from "../../shared/ui/button/MyInput";
import MyButton from "../../shared/ui/button/MyButton";
import {useFetching} from "../../shared/hooks/useFetching";
import CategoryService from "../../API/CategoryService";
import Loader from "../../shared/ui/loader/Loader";
import ProductService from "../../API/ProductService";

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
  const [postName, setPostName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [amount, setAmount] = useState("");
  const [isExchanged, setIsExchanged] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    let newPost = {
      "userId": 1,
      "productName": postName,
      "categoryId": selectedId,
      "description": description,
      "price":  amount ? amount : "free",
      "isExchanged":  isExchanged
      }
    ProductService.saveProduct(newPost).then().catch(e => console.log(e));
  }

  return (
    <form  className={cl.CreateAdv} onSubmit={handleSubmit}>
      <h1>Подача объявления</h1>

      <div className={cl.CreateAdv__param}>Название товара/услуги*</div>
      <MyInput value={postName} callback={(value) => setPostName(value)}/>

      <div className={cl.CreateAdv__param}>Выбор категории*</div>
      <Autocomplete
        id="combo-box-demo"
        options={categories}
        onChange={(event, value) => setSelectedId(value.id)}
        sx={{margin: "5px 0 20px 0"}}
        renderInput={(params) => <TextField {...params}/>
        }
      />

      <div className={cl.CreateAdv__param}>Описание*</div>
      <textarea
        onChange={e => setDescription(e.target.value)}
      />
      <div>{description.length} из 4000 знаков</div>
      <hr/>

      <h2>Цена</h2>
      <div>
        <div className={cl.CreateAdv__btns}>
          <MyButton isActive={isActivePrice} text={"Цена"} callback={callback}/>
          <MyButton isActive={isActiveFree} text={"Бесплатно"} callback={callback}/>
        </div>

        {isActivePrice ?
          <OutlinedInput
            sx={{height: 40, padding: "8px 16px"}}
            id="outlined-adornment-amount"
            value={amount}
            onChange={e => {setAmount(e.target.value)}}
            startAdornment={<InputAdornment position="start">р.</InputAdornment>}
          />
          : <div/>
        }
      </div>

      <FormControlLabel
        control={<Checkbox defaultChecked />}
        onChange={e => setIsExchanged(!isExchanged)}
        label="Готов к обмену"
        color="success"
      />

      <Button
        type={'submit'}
        sx={{width: "100%", margin: "40px 0 20px 0"}}
        variant="contained" color="success">
        Подать объявление
      </Button>
    </form>
  )
}
export default CreateAdv;