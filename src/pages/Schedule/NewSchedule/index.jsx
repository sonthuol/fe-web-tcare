import "date-fns";
import { React, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import "./style.css";
import scheduleService from "../../../services/Schedule/schedule.service";
import doctorService from "../../../services/Doctor/doctor.service";
export default function NewSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateConvert, setdateConvert] = useState();
  const [redirect, setRedirect] = useState(false);
  const time = [
    {
      time: "08:00 - 9:00",
      status: false,
    },
    {
      time: "09:00 - 10:00",
      status: false,
    },
    {
      time: "10:00 - 11:00",
      status: false,
    },
    {
      time: "11:00 - 12:00",
      status: false,
    },
    {
      time: "13:00 - 14:00",
      status: false,
    },
    {
      time: "14:00 - 15:00",
      status: false,
    },
    {
      time: "15:00 - 16:00",
      status: false,
    },
    {
      time: "16:00 - 17:00",
      status: false,
    },
  ];
  const [timeSchedule, setTimeSchedule] = useState(time);
  useEffect(() => {
    function dateInit() {
      var datestring = coverDateISO(new Date());
      setdateConvert(datestring);
    }

    async function getScheduleByDoctorAndDay() {
      var day = coverDateISO(selectedDate);
      const doctor = await doctorService.getCurrentDoctor();
      const schedule = await scheduleService.scheduleByDoctorAndDay(
        doctor.id,
        day
      );
      const schedules = schedule.data.data;
      if (schedules.length > 0) {
        setTimeSchedule(schedules);
      }
    }
    dateInit();
    getScheduleByDoctorAndDay();
  }, []);

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

  const handleDateChange = async (dateISO) => {
    const newTime = [...timeSchedule];
    timeSchedule.map((item, index) => (newTime[index].status = false));
    setTimeSchedule(newTime);
    setSelectedDate(dateISO);
    let dateUTC = coverDateISO(dateISO);

    setdateConvert(dateUTC);
    const doctor = await doctorService.getCurrentDoctor();
    const schedule = await scheduleService.scheduleByDoctorAndDay(
      doctor.id,
      dateUTC
    );
    const schedules = schedule.data.data;
    if (schedules.length > 0) {
      setTimeSchedule(schedules);
    }
  };

  const handleTimeClick = (time, index) => {
    const newTime = [...timeSchedule];
    newTime[index].status = !newTime[index].status;
    setTimeSchedule(newTime);
  };

  const handleSaveTimeClick = async () => {
    const doctor = await doctorService.getCurrentDoctor();
    const timeSave = timeSchedule.filter((item) => item.status !== false);
    if (timeSave.length > 0 === false) {
      alert("Chưa chọn được lịch khám");
    } else {
      timeSchedule.map((dayTime) => {
        const dataSchedule = {
          ...dayTime,
          day: dateConvert,
          doctorId: doctor.id,
        };
        scheduleService.createNewSchedule(dataSchedule).then(
          () => {
            setRedirect(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      });
    }
  };
  return (
    <div className="NewSchedule">
      {redirect && <Redirect to="/schedules" />}
      <div className="NewSchedule_Date">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Chọn ngày để tạo lịch khám"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div className="NewSchedule_Time">
        {timeSchedule.map((time, index) => (
          <Button
            variant="contained"
            color={time.status === true ? "primary" : "default"}
            key={index}
            className="Time"
            onClick={(e) => handleTimeClick(time, index)}
          >
            {time.time}
          </Button>
        ))}
      </div>
      <div className="NewSchedule_Save">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveTimeClick}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
}
