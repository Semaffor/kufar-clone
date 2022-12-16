import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import FavoriteIcon from '@mui/icons-material/Favorite';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/globalContext";
import {useNavigate} from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import {deepOrange} from "@mui/material/colors";


const AvatarMenu = ({login, isAdmin}) => {
  const [anchorEl, setAnchorEl] = React.useState();
  const {user, setUser} = useContext(AuthContext)
  const router = useNavigate()

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const isAdmin = user != null ? user.roles.includes('Администратор') : false
  const iconColor = 'secondary';
  const exitFromAccount = () => {
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("userId")
    localStorage.removeItem("login")
    setUser(null)
    router('products')
  }
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Click">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              alt="avatar"
              sx={{bgcolor: deepOrange[500]}}
            >
              {login[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >

        {isAdmin ?
          <MenuItem onClick={e => router('/management/user')}>
            <ManageAccountsIcon color={iconColor} sx={{mr: 1}}/>Управление пользователями
          </MenuItem> : null
        }
        {isAdmin ?
          <MenuItem onClick={e => router('/management/advs')}>
            <AssignmentLateIcon color={iconColor} sx={{mr: 1}}/>Модерация объявлений
          </MenuItem> : null
        }
        <MenuItem onClick={e => router('/queries')}>
          <TurnedInIcon color={iconColor} sx={{mr:1}}/>Сохраненные запросы
        </MenuItem>
        <MenuItem onClick={e => router('/favourite')}>
          <FavoriteIcon color={iconColor} sx={{mr:1}}/>Закладки
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => exitFromAccount()}>
          <ListItemIcon>
            <Logout color={iconColor} fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AvatarMenu;
