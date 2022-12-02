import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import CommentIcon from "@material-ui/icons/Comment";
import ScheduleIcon from "@material-ui/icons/Schedule";
import WcIcon from "@material-ui/icons/Wc";
import TodayIcon from "@material-ui/icons/Today";
import { Link, Redirect } from "react-router-dom";
import { React, useState, useEffect } from "react";
import appointmentService from "../../../services/Appointment/appointment.service.js";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./style.css";
import authService from "../../../services/Auth/auth.service";

export default function Appointment() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [status, setStatus] = useState(0);

  let { id } = useParams();
  useEffect(() => {
    async function fetchMedicalRecords() {
      let medicalRecord = await appointmentService.getMedicalRecordDetails(id);
      setMedicalRecords(medicalRecord.data.data);
      setStatus(medicalRecord.data.data[0].status);
    }
    fetchMedicalRecords();
  }, []);

  const handleUpdateAppointment = async (e) => {
    e.preventDefault();
    await appointmentService.updateStatusAppointment(id, status).then(
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
        console.log(resMessage);
      }
    );
  };
  return (
    <div className="clinic">
      {redirect && <Redirect to="/appointment" />}
      <div className="clinicTitleContainer">
        <h1 className="clinicTitle">Chi tiết lịch khám</h1>
        <Link to="/appointment">
          <button className="clinicListAddButton">Lịch hẹn</button>
        </Link>
      </div>
      <div className="clinicContainer">
        <div className="clinicShow">
          {medicalRecords.map((medicalRecord) => {
            return (
              <div key={medicalRecord.id} className="clinicShowBottom">
                <span className="clinicShowTitle">Thông tin khám bệnh</span>
                <div className="clinicShowInfo">
                  <TodayIcon className="clinicShowIcon" />
                  <span className="clinicShowInfoTitle">
                    {medicalRecord.schedules.map((schedule) => {
                      return <>{schedule.day}</>;
                    })}
                  </span>
                </div>
                <div className="clinicShowInfo">
                  <ScheduleIcon className="clinicShowIcon" />
                  <span className="clinicShowInfoTitle">
                    {" "}
                    {medicalRecord.schedules.map((schedule) => {
                      return <>{schedule.time}</>;
                    })}
                  </span>
                </div>
                <span className="clinicShowTitle">Thông tin bệnh nhân</span>
                <div className="clinicShowInfo">
                  <PermIdentity className="clinicShowIcon" />
                  <span className="clinicShowInfoTitle">
                    {medicalRecord.name}
                  </span>
                </div>
                <div className="clinicShowInfo">
                  <CalendarToday className="clinicShowIcon" />
                  <span className="clinicShowInfoTitle">
                    {medicalRecord.birthday}
                  </span>
                </div>
                <div className="clinicShowInfo">
                  <WcIcon className="clinicShowIcon" />
                  <span className="clinicShowInfoTitle">
                    {medicalRecord.gender === 1 ? "Nam" : "Nữ"}
                  </span>
                </div>
                <span className="clinicShowTitle">Thông tin liên lạc</span>
                <div className="clinicShowInfo">
                  <PhoneAndroid className="clinicShowIcon" />
                  <span className="clinicShowInfoTitle">
                    {medicalRecord.phoneNumber}
                  </span>
                </div>
                <div className="clinicShowInfo">
                  <LocationSearching className="clinicShowIcon" />
                  <span className="clinicShowInfoTitle">
                    {medicalRecord.address}
                  </span>
                </div>
                <div className="clinicShowInfo">
                  <CommentIcon className="clinicShowIcon" />
                  <span className="clinicShowInfoTitle">
                    Triệu chứng: {medicalRecord.symptom}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="clinicUpdate">
          <span className="clinicUpdateTitle">Nội dung cập nhật</span>
          {medicalRecords.map((medicalRecord) => {
            return (
              <form
                key={medicalRecord.id}
                className="clinicUpdateForm"
                encType="multipart/form-data"
                onSubmit={handleUpdateAppointment}
              >
                <div className="clinicUpdateLeft">
                  <div className="clinicUpdateItem">
                    <label>Tên bệnh nhân</label>
                    <input
                      type="text"
                      disabled
                      placeholder="Tên bệnh nhận"
                      value={medicalRecord.name || ""}
                      name="name"
                      className="clinicUpdateInput"
                    />
                  </div>
                  <div className="clinicUpdateItem">
                    <label>Số điện thoại</label>
                    <input
                      type="number"
                      disabled
                      placeholder="Số điện thoại"
                      value={medicalRecord.phoneNumber || ""}
                      className="clinicUpdateInput"
                      name="phoneNumber"
                    />
                  </div>
                  <div className="clinicUpdateItem">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      disabled
                      placeholder="Địa chỉ"
                      value={medicalRecord.address || ""}
                      name="address"
                      className="clinicUpdateInput"
                    />
                  </div>

                  {medicalRecord.status == 0 ? (
                    <button type="submit" className="medicalpdateButton">
                      Đã xác nhận
                    </button>
                  ) : medicalRecord.status == 1 ? (
                    <button type="submit" className="medicalpdateButton">
                      Đã khám
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            );
          })}
        </div>
      </div>
    </div>
  );
}
