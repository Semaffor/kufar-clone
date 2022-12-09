import React, {useState} from 'react';
import cl from './CreateAdv.module.scss'
import {Autocomplete, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import MyInput from "../../shared/ui/button/MyInput";
import MyButton from "../../shared/ui/button/MyButton";

const CreateAdv = () => {
  const [amount, setAmount] = useState(0);
  const [postName, setPostName] = useState(0);
  const [category, setCategory] = useState(0);
  const [description, setDescription] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [options, setOptions] = useState(0);
  const [isActivePrice, setIsActivePrice] = useState(true);
  const [isActiveFree, setIsActiveFree] = useState(false);

  const Foptions = ['The Godfather', 'Pulp Fiction'];

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
    <div className={cl.CreateAdv}>
      <h1>Подача объявления</h1>

      <div className={cl.CreateAdv__param}>Название товара/услуги*</div>
      <MyInput value={postName} callback={(value) => setPostName(value)}/>

      <div className={cl.CreateAdv__param}>Выбор категории*</div>
      <Autocomplete
        id="combo-box-demo"
        options={Foptions}
        sx={{margin: "5px 0 20px 0"}}
        renderInput={(params) => <TextField {...params} label="Категории"/>}
      />

      <div className={cl.CreateAdv__param}>Описание*</div>
      <textarea
        onChange={e => setDescriptionLength(e.target.value.length)}

      />
      <div>{descriptionLength} из 4000 знаков</div>
      <hr/>


      <h2>Цена</h2>
      <div>
        <div className={cl.CreateAdv__btns}>
          <MyButton isActive={isActivePrice} text={"Цена"} callback={handleClick}/>
          <MyButton isActive={isActiveFree} text={"Бесплатно"} callback={handleClick}/>
        </div>

        {isActivePrice ?
          <OutlinedInput
            sx={{height: 40, padding: "8px 16px"}}
            id="outlined-adornment-amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            startAdornment={<InputAdornment position="start">р.</InputAdornment>}
          />
          : <div/>
        }
      </div>

      <Button
        sx={{width: "100%", margin: "40px 0 20px 0"}}
        variant="contained" color="success">
        Подать объявление
      </Button>
    </div>
  )
    ;
};

export default CreateAdv;