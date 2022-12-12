import React from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

const ChoiceBox = ({setLimit}) => {
  return (
    <FormControl style={{marginLeft:30}}>
      <RadioGroup
        row
        defaultValue={"5"}
        onChange={(e, value) => setLimit(value)}
        name="paginationCount"
      >
        <FormControlLabel value="5" control={<Radio />} label="5" />
        <FormControlLabel value="10" control={<Radio />} label="10" />
        <FormControlLabel value="15" control={<Radio />} label="15" />
      </RadioGroup>
    </FormControl>
  );
};

export default ChoiceBox;