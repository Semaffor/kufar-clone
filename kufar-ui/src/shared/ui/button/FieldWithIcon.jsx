import React from 'react';
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";

const FieldWithIcon = ({fieldTitle, fieldValue, onChangeField, children}) => {
  return (
    <Box sx={{mb: 1, display: 'flex', alignItems: 'flex-end', width: 260}}>
      {children}
      <TextField style={{width: "85%"}}
                 onChange={e => onChangeField(e.target.value)}
                 label={fieldTitle}
                 value={fieldValue}
                 variant="standard"
      />
    </Box>
  );
};

export default FieldWithIcon;