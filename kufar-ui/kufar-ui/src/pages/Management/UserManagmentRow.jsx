import React, {useEffect, useMemo, useState} from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {FormGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const UserManagementRow = ({row, handleBlock, changeRole, index}) => {
  const labelId = `enhanced-table-checkbox-${index}`;
  let [isAdmin, setAdmin] = useState(row.roles.includes('Администратор'))
  let [roles, setRoles] = useState();
  let [first, setFirst] = useState(0);

  console.log(row.roles)
  useEffect(() => {
    if (first !== 0) {
      if (isAdmin) {
        setRoles(['Администратор'])
      } else {
        setRoles([])
      }
    }
    setFirst(1)
  }, [isAdmin])

  useMemo(() => {
    if (roles !== undefined) {
    console.log(roles)
    changeRole(row.id, roles)
    }

  }, [roles])

  const handleChangeRole = (id, prop) => {
    {prop === 'admin' ? setAdmin(!isAdmin) : null}
  }

  // useEffect(() =>
  //   setAdmin(row.roles.includes('Администратор'))
  // )
  return (
    <TableRow
      hover
      key={row.name}
    >
      <TableCell padding="checkbox"></TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {row.login}
      </TableCell>
      <TableCell align="right">{row.email}</TableCell>
      <TableCell align="right">{row.registeredFromMessage}</TableCell>
      <TableCell padding="normal" align="right">
        <FormGroup>
          {/*<FormControlLabel control={*/}
          {/*  <Checkbox sx={{height:30}} onChange={() => handleChangeRole(row.id, 'user')}*/}
          {/*            checked={isUser}*/}
          {/*  />} label="Пользователь"/>*/}
          <FormControlLabel control={
            <Checkbox sx={{height: 30}} onChange={() => handleChangeRole(row.id, 'admin')}
                      checked={isAdmin}
            />} label="Администратор"/>
        </FormGroup>
      </TableCell>
      <TableCell padding="checkbox" align="left">
        <Checkbox
          sx={{ml: 5}}
          checked={row.blocked}
          onChange={e => handleBlock(row.id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default UserManagementRow;
