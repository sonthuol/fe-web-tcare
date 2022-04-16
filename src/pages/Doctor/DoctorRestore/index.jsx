import { Box, Button, makeStyles, Modal, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SearchIcon from "@material-ui/icons/Search";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import specialtyService from "../../../services/Specialty/specialty.service";
import doctorService from "../../../services/Doctor/doctor.service";
import clinicService from "../../../services/Clinic/clinic.service";
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

export default function DoctorRestore() {
  const classes = useStyles();
  const columns = [
    { field: "id", headerName: "Mã", width: 100 },
    { field: "name", headerName: "Tên bác sĩ", width: 300 },
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
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <RestoreIcon
              className="clinicListRetoreIcon"
              onClick={() => handleOpenRestoreModal(params.row.id)}
            />
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
  const [openRestore, setOpenRestore] = useState(false);
  const [doctor, setDoctor] = useState();
  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [openModelRestore, setOpenModelRestore] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenRestore = () => setOpenRestore(true);
  const handleCloseRestore = () => setOpenRestore(false);
  const handleOpenModelDelete = () => setOpenModelDelete(true);
  const handleCloseModelDelete = () => setOpenModelDelete(false);
  const handleOpenModelRestore = () => setOpenModelRestore(true);
  const handleCloseModelRestore = () => setOpenModelRestore(false);
  const [selectionModel, setSelectionModel] = useState();

  useEffect(() => {
    async function feachDoctor() {
      let doctor = await doctorService.getAllDoctorRestore();
      const clinic = await clinicService.getCurrentClinic();
      doctor = doctor.data.data.filter(
        (item) => item.clinics[0].id === clinic.id
      );
      if (doctor) {
        setDoctorList(doctor);
      }
    }
    feachDoctor();
  }, []);

  const handleOpenModal = (id) => {
    handleOpen();
    setDoctor(id);
  };

  const handleOpenRestoreModal = (id) => {
    handleOpenRestore();
    setDoctor(id);
  };

  const handleOpenDeleteModalSelection = () => {
    if (selectionModel) {
      handleOpenModelDelete();
    }
  };

  const handleOpenRestoreModalSelection = () => {
    if (selectionModel) {
      handleOpenModelRestore();
    }
  };

  const handleDelete = async () => {
    setDoctorList(doctorList.filter((item) => item.id !== doctor));
    await doctorService.deleteRestore(doctor);
    handleClose();
  };

  const handleRestore = async () => {
    setDoctorList(doctorList.filter((item) => item.id !== doctor));
    await doctorService.restore(doctor);
    handleCloseRestore();
  };

  const handleSelectedDelete = async () => {
    if (selectionModel) {
      setDoctorList(
        doctorList.filter((item) => !selectionModel.includes(item.id))
      );
      for (let index = 0; index < selectionModel.length; index++) {
        await doctorService.deleteRestore(selectionModel[index]);
      }
      handleCloseModelDelete();
    }
  };

  const handleSelectedRestore = async () => {
    if (selectionModel) {
      setDoctorList(
        doctorList.filter((item) => !selectionModel.includes(item.id))
      );
      for (let index = 0; index < selectionModel.length; index++) {
        await doctorService.restore(selectionModel[index]);
      }
      handleCloseModelRestore();
    }
  };

  return (
    <div className="clinicList">
      <div className="clinicListTitleContainer">
        <h1 className="clinicListTitle">Khôi phục bác sĩ</h1>
      </div>
      <div className="clinicListSelectedDeleteAndSearch">
        <div className="clinicListDeleteAndRestore">
          <div
            className="clinicListSelectedDelete"
            onClick={() => handleOpenDeleteModalSelection()}
          >
            <DeleteOutlineIcon className="clinicListSelectedDeleteIcon" />
            <h5>Xoá</h5>
          </div>
          <div
            className="clinicListSelectedRestore"
            onClick={() => handleOpenRestoreModalSelection()}
          >
            <RestoreIcon className="clinicListRestoreIcon" />
            <h5>Khôi phục</h5>
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
      {/* Modal delete clinic */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn có chắc muốn xoá vĩnh viễn phòng khám này ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Việc xoá phòng khám sẽ dẫn đến không thể khôi phục lại.
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
      {/* Modal restore */}
      <Modal
        open={openRestore}
        onClose={handleCloseRestore}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn có chắc chắn muốn khôi phục phòng khám này ?
          </Typography>
          <div className="clinicListButtonConfirmDelete">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className="delete"
              onClick={() => handleRestore()}
            >
              Khôi phục
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenRestore(false)}
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
            Bạn muốn xoá vĩnh viễn phòng khám này ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Việc xoá vĩnh viễn phòng khám sẽ dẫn đến không thể khôi phục lại.
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

      <Modal
        open={openModelRestore}
        onClose={handleCloseModelRestore}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn muốn khôi phục phòng khám này ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Việc khôi phục phòng khám sẽ đến phòng khám truy cập bình thường.
          </Typography>
          <div className="clinicListButtonConfirmDelete">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className="delete"
              onClick={() => handleSelectedRestore()}
            >
              Khôi phục
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenModelRestore(false)}
            >
              Huỷ
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
