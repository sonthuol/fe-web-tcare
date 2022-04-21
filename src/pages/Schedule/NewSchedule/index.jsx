import "date-fns";
import { React, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import "./style.css";
export default function NewSchedule() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateConvert, setdateConvert] = useState();
  useEffect(() => {
    function dateInit() {
      var d = new Date();
      var datestring =
        d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
      setdateConvert(datestring);
    }
    dateInit();
  }, []);
  const time = [
    {
      id: 1,
      value: "8:00 - 9:00",
      status: false,
    },
    {
      id: 2,
      value: "9:00 - 10:00",
      status: false,
    },
    {
      id: 3,
      value: "10:00 - 11:00",
      status: false,
    },
    {
      id: 4,
      value: "11:00 - 12:00",
      status: false,
    },
    {
      id: 5,
      value: "13:00 - 14:00",
      status: false,
    },
    {
      id: 6,
      value: "14:00 - 15:00",
      status: false,
    },
    {
      id: 7,
      value: "15:00 - 16:00",
      status: false,
    },
    {
      id: 8,
      value: "16:00 - 17:00",
      status: false,
    },
  ];
  const [timeSchedule, setTimeSchedule] = useState(time);

  const handleDateChange = (dateISO) => {
    const newTime = [...timeSchedule];
    timeSchedule.map((item, index) => (newTime[index].status = false));
    setTimeSchedule(newTime);
    setSelectedDate(dateISO);

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
    let dateUTC = dt + "/" + month + "/" + year;
    setdateConvert(dateUTC);
  };

  const handleTimeClick = (time, index) => {
    const newTime = [...timeSchedule];
    newTime[index].status = !newTime[index].status;
    setTimeSchedule(newTime);
  };

  const handleSaveTimeClick = () => {
    console.log(dateConvert);
    const timeSave = timeSchedule.filter((item) => item.status !== false);
    if (timeSave.length > 0 === false) {
      alert("Chưa chọn được lịch khám");
    } else {
      console.log(timeSave);
    }
  };
  return (
    <div className="NewSchedule">
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
            {time.value}
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
