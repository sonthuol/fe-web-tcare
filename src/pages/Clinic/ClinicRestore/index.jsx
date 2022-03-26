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

export default function CliniRestore() {
  const classes = useStyles();
  const columns = [
    { field: "id", headerName: "Mã", width: 100 },
    { field: "name", headerName: "Tên phòng khám", width: 300 },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 200 },
    { field: "address", headerName: "Địa chỉ", width: 200 },
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

  const [clinicList, setClinicList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openRestore, setOpenRestore] = useState(false);
  const [clinic, setClinic] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenRestore = () => setOpenRestore(true);
  const handleCloseRestore = () => setOpenRestore(false);
  const [selectionModel, setSelectionModel] = useState();

  useEffect(() => {
    async function feachClinic() {
      let clinic = await clinicService.getAllClinicRestore();
      if (clinic) {
        setClinicList(clinic.data.data);
      }
    }
    feachClinic();
  }, []);

  const handleOpenModal = (id) => {
    handleOpen();
    setClinic(id);
  };

  const handleOpenRestoreModal = (id) => {
    handleOpenRestore();
    setClinic(id);
  };

  const handleDelete = async () => {
    setClinicList(clinicList.filter((item) => item.id !== clinic));
    const user = await authService.getCurrentUser();
    await clinicService.deleteClinic(clinic, user.id);
    handleClose();
  };

  const handleRestore = async () => {
    setClinicList(clinicList.filter((item) => item.id !== clinic));
    await clinicService.restore(clinic);
    handleCloseRestore();
  };

  const handleSelectedDelete = () => {
    if (selectionModel) {
      console.log(selectionModel);
      selectionModel.forEach((element) => {
        setClinicList(clinicList.filter((item) => item.id !== element));
      });
      console.log(clinicList);
    }
  };

  return (
    <div className="clinicList">
      <div className="clinicListTitleContainer">
        <h1 className="clinicListTitle">Khôi phục phòng khám</h1>
      </div>
      <div className="clinicListSelectedDeleteAndSearch">
        <div className="clinicListDeleteAndRestore">
          <div
            className="clinicListSelectedDelete"
            onClick={() => handleSelectedDelete()}
          >
            <DeleteOutlineIcon className="clinicListSelectedDeleteIcon" />
            <h5>Xoá</h5>
          </div>
          <div className="clinicListSelectedRestore">
            <Link to="/clinics/restore" className="clinicListLinkRestore">
              <RestoreIcon className="clinicListRestoreIcon" />
              <h5>Hiển thị</h5>
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
          rows={clinicList}
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
              color="secondary"
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
    </div>
  );
}