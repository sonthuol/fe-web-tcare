import { Box, Button, makeStyles, Modal, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@material-ui/data-grid";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SearchIcon from "@material-ui/icons/Search";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../../services/Auth/auth.service";
import userService from "../../../services/User/user.service";
import RestoreIcon from "@material-ui/icons/Restore";

import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const useStyles = makeStyles((theme) => ({
  root: {
    height: "30px",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 300,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function AccountList() {
  const classes = useStyles();
  const columns = [
    { field: "id", headerName: "Mã", width: 100 },
    { field: "fullname", headerName: "Họ và tên", width: 200 },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "roles",
      headerName: "Vai trò",
      width: 120,
      renderCell: (params) => {
        if (params.row.roles[0].name === "admin") {
          return <>Chủ phòng khám</>;
        } else if (params.row.roles[0].name === "root") {
          return <>Quản trị viên</>;
        } else if (params.row.roles[0].name === "doctor") {
          return <>Bác sĩ</>;
        }
      },
    },
    {
      field: "isActive",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.row.isActive === true || params.row.isActive === null ? (
              <div
                className="clinicListActive"
                onClick={() => handleChangeStauts(params.row.id)}
              >
                <Brightness1Icon className="clinicListActiveIcon active" /> Hiển
                thị
              </div>
            ) : (
              <div
                className="clinicListActive"
                onClick={() => handleChangeStauts(params.row.id)}
              >
                <Brightness1Icon className="clinicListActiveIcon unactive" /> Ẩn
              </div>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/accounts/" + params.row.id}>
              <button className="clinicListEdit">Chỉnh sửa</button>
            </Link>
            <DeleteOutlineIcon
              className="clinicListDelete"
              onClick={() => handleOpenModal(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [user, setUser] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModelDelete = () => setOpenModelDelete(true);
  const handleCloseModelDelete = () => setOpenModelDelete(false);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    async function feachUser() {
      let user = await userService.getAllUser();
      setUserList(user.data.data);
    }
    feachUser();
  }, []);

  const handleOpenModal = (id) => {
    handleOpen();
    setUser(id);
  };

  const handleDelete = async () => {
    const accountToken = await authService.getCurrentUser();
    if (accountToken.id === user) {
      setOpenModelDelete(true);
    } else {
      setUserList(userList.filter((item) => item.id !== user));
      await userService.deleteUser(user, accountToken.id);
    }
    handleClose();
  };

  const handleChangeStauts = async (id) => {
    let statusCurrent = userList.find((item) => item.id === id);
    statusCurrent.isActive = !statusCurrent.isActive;
    const user = await authService.getCurrentUser();
    await userService.changeStatus(id, statusCurrent.isActive, user.id);
  };

  return (
    <div className="clinicList">
      <div className="clinicListTitleContainer">
        <h1 className="clinicListTitle">Danh sách tài khoản</h1>
      </div>
      <div className="clinicListSelectedDeleteAndSearch">
        <div className="clinicListDeleteAndRestore">
          <div className="clinicListSelectedRestore">
            {/* <Link to="/accounts/restore" className="clinicListLinkRestore">
              <RestoreIcon className="clinicListRestoreIcon" />
              <h5>Khôi phục</h5>
            </Link> */}
          </div>
        </div>

        <div className="clinicListSearch">
          <Paper className={classes.root}>
            <InputBase className={classes.input} placeholder="Tìm kiếm" />
            <IconButton className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          className="clinicListContainer"
          rows={userList}
          columns={columns}
          pageSize={7}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection.selectionModel);
          }}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn có chắc chắn muốn xoá phòng khám này ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Việc xoá phòng khám sẽ dẫn đến những thành phần liên quan đến phòng
            phám điều không truy cập được.
          </Typography>
          <div className="clinicListButtonConfirmDelete">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              className="delete"
              onClick={() => handleDelete()}
            >
              Xoá
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpen(false)}
            >
              Huỷ
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openModelDelete}
        onClose={handleCloseModelDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn không thể xoá tài khoản cá nhân của mình
          </Typography>
          <div className="clinicListButtonConfirmDelete">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenModelDelete(false)}
            >
              Huỷ
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
