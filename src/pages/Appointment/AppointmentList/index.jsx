import { Box, Button, makeStyles, Modal, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@material-ui/data-grid";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SearchIcon from "@material-ui/icons/Search";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../../services/Auth/auth.service";
import appointmentService from "../../../services/Appointment/appointment.service";
import doctorService from "../../../services/Doctor/doctor.service";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

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

export default function AppointmentList() {
  const classes = useStyles();
  const columns = [
    {
      field: "id",
      headerName: "Mã",
      width: 100,
      renderCell: (params) => {
        let id;
        params.row.medical_records.map((medical_record) => {
          id = medical_record.id;
        });
        return <>{id}</>;
      },
    },
    {
      field: "name",
      headerName: "Tên bệnh nhân",
      width: 240,
      renderCell: (params) => {
        let name;
        params.row.medical_records.map((medical_record) => {
          name = medical_record.name;
        });
        return <>{name}</>;
      },
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      width: 200,
      renderCell: (params) => {
        let phoneNumber;
        params.row.medical_records.map((medical_record) => {
          phoneNumber = medical_record.phoneNumber;
        });
        return <>{phoneNumber}</>;
      },
    },
    { field: "time", headerName: "Giờ khám", width: 200 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        let status;
        let message;
        params.row.medical_records.map((medical_record) => {
          status = medical_record.status;
        });
        if (status == 0) {
          message = "Đang chờ xác nhận";
        } else if (status == 1) {
          message = "Đã xác nhận";
        } else message = "Đã khám";
        return <>{message}</>;
      },
    },
  ];

  const [medicalRecordsList, setMedicalRecordsList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    async function feachMedicalRecords() {
      var day = coverDateISO(selectedDate);
      const doctor = await doctorService.getCurrentDoctor();
      let medicalRecords = await appointmentService.appointmentByDoctorAndDay(
        doctor.id,
        day
      );
      setMedicalRecordsList(medicalRecords.data.data);
    }
    feachMedicalRecords();
  }, [selectedDate]);

  const handleDateChange = async (dateISO) => {
    console.log("====================================");
    console.log(dateISO);
    console.log("====================================");
    setSelectedDate(dateISO);
    var day = coverDateISO(selectedDate);
    const doctor = await doctorService.getCurrentDoctor();
    let medicalRecords = await appointmentService.appointmentByDoctorAndDay(
      doctor.id,
      day
    );
    setMedicalRecordsList(medicalRecords.data.data);
  };
  const coverDateISO = (dateISO) => {
    let date = new Date(dateISO);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return dt + "/" + month + "/" + year;
  };
  return (
    <div className="clinicList">
      <div className="NewSchedule_Date">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Chọn ngày để xem lịch hẹn"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div className="clinicListTitleContainer">
        <h1 className="clinicListTitle">Danh sách lịch hẹn</h1>
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          className="clinicListContainer"
          rows={medicalRecordsList}
          columns={columns}
          pageSize={7}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
