import * as React from 'react';
import {useMemo, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useFetching} from "../../../shared/hooks/useFetching";
import ProductService from "../../../API/ProductService";
import Loader from "../../../shared/ui/loader/Loader";
import {Button} from "@mui/material";

export default function AdvsManagement() {

  const [posts, setPosts] = useState([])

  const [fetching, loading, errors] = useFetching(async () => {
    const response = await ProductService.getAllProductsInModeration();
    setPosts(response)
  })

  function removePostFromArray(id) {
    setPosts(posts.filter(p => p.id !== id))
  }

  useMemo(() => fetching(), [])

  return (
    <div>
      <h1 style={{textAlign: "center", marginBottom: 10}}>Управление объявлениями</h1>
      <i>Всего к модерации {posts.length} объявлений</i>
      {loading ? <Loader/>
        :
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center" sx={{width: 600}}>Название товара</TableCell>
                <TableCell align="left">Цена</TableCell>
                <TableCell align="center" sx={{width: 400}}>Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map(post => <AdvsManagementRow key={post.id} post={post} callback={removePostFromArray}/>)}
            </TableBody>
          </Table>
        </TableContainer>
      }

    </div>
  );
}


function AdvsManagementRow({post, callback}) {

  const [fetching, loading, errors] = useFetching(async (status) => {
    const response = await ProductService.changeProductStatus(status, post.id);
    setPosts(response.data)
  })

  function handleButtonResult(result) {
    result ? fetching('ACTIVE') : fetching('DENIED')
    callback(post.id)
  }

  function denyAdv() {
    handleButtonResult(false)
  }

  function acceptAdv() {
    handleButtonResult(true)
  }


  return (
    <TableRow
      key={post.name}
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
      <TableCell component="th" scope="row">{post.id}</TableCell>
      <TableCell align="center">{post.name}</TableCell>
      <TableCell align="left">
        {post.price === 0
          ? <span>Бесплатно</span>
          : <span>{post.price} р.</span>}
      </TableCell>
      <TableCell align="center">
        <Button
          sx={{marginRight: 3}}
          variant="outlined"
          color="error"
          onClick={denyAdv}
        >
          Отклонить
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={acceptAdv}
        >
          Одобрить
        </Button>
      </TableCell>
    </TableRow>
  )
}