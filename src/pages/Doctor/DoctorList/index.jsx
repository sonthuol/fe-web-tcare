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
import clinicService from "../../../services/Clinic/clinic.service";
import doctorService from "../../../services/Doctor/doctor.service";
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

export default function DoctorList() {
  const classes = useStyles();
  const columns = [
    { field: "id", headerName: "Mã", width: 100 },
    { field: "name", headerName: "Họ và tên", width: 240 },
    { field: "birthday", headerName: "Ngày sinh", width: 150 },
    {
      field: "gender",
      headerName: "Giới tính",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.gender === true ? (
              <div className="clinicListActive">Nam</div>
            ) : (
              <div className="clinicListActive">Nữ</div>
            )}
          </>
        );
      },
    },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 150 },
    {
      field: "isActive",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.row.isActive === true ? (
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
            <Link to={"/doctors/" + params.row.id}>
              <button className="clinicListEdit">Edit</button>
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

  const [doctorList, setDoctorList] = useState([]);
  const [open, setOpen] = useState(false);
  const [doctor, setDoctor] = useState();
  const [openModelDelete, setOpenModelDelete] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModelDelete = () => setOpenModelDelete(true);
  const handleCloseModelDelete = () => setOpenModelDelete(false);
  const [selectionModel, setSelectionModel] = useState();

  useEffect(() => {
    async function feachDoctor() {
      let doctor = await doctorService.getAllDoctors();
      const clinic = await clinicService.getCurrentClinic();
      doctor = doctor.data.data.filter(
        (item) => item.clinics[0].id === clinic.id
      );
      setDoctorList(doctor);
    }
    feachDoctor();
  }, []);

  const handleOpenModal = (id) => {
    handleOpen();
    setDoctor(id);
  };

  const handleOpenRestoreModal = () => {
    if (selectionModel) {
      handleOpenModelDelete();
    }
  };

  const handleDelete = async () => {
    setDoctorList(doctorList.filter((item) => item.id !== doctor));
    const user = await authService.getCurrentUser();
    // await doctorService.deleteDoctor(doctor, user.id);
    handleClose();
  };

  const handleChangeStauts = async (id) => {
    let statusCurrent = doctorList.find((item) => item.id === id);
    statusCurrent.isActive = !statusCurrent.isActive;
    const user = await authService.getCurrentUser();
    await doctorService.changeStatus(id, statusCurrent.isActive, user.id);
  };

  const handleSelectedDelete = async () => {
    if (selectionModel) {
      const user = await authService.getCurrentUser();
      setDoctorList(
        doctorList.filter((item) => !selectionModel.includes(item.id))
      );
      for (let index = 0; index < selectionModel.length; index++) {
        // await doctorService.deleteDoctor(selectionModel[index], user.id);
      }
    }
    handleCloseModelDelete();
  };

  return (
    <div className="clinicList">
      <div className="clinicListTitleContainer">
        <h1 className="clinicListTitle">Danh sách bác sĩ</h1>
        <Link to="/doctors/create">
          <button className="clinicListAddButton">Tạo mới</button>
        </Link>
      </div>
      <div className="clinicListSelectedDeleteAndSearch">
        <div className="clinicListDeleteAndRestore">
          <div
            className="clinicListSelectedDelete"
            onClick={() => handleOpenRestoreModal()}
          >
            <DeleteOutlineIcon className="clinicListSelectedDeleteIcon" />
            <h5>Xoá</h5>
          </div>
          <div className="clinicListSelectedRestore">
            <Link to="/clinics/restore" className="clinicListLinkRestore">
              <RestoreIcon className="clinicListRestoreIcon" />
              <h5>Khôi phục</h5>
            </Link>
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
          rows={doctorList}
          columns={columns}
          pageSize={7}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
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
              onClick={() => handleSelectedDelete()}
            >
              Xoá
            </Button>
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
