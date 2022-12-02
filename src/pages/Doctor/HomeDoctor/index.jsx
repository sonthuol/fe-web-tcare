import { React, useEffect, useState } from "react";
import "./style.css";
import { userData } from "../../../dummyData.js";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import doctorService from "../../../services/Doctor/doctor.service";
import appointmentService from "../../../services/Appointment/appointment.service";
export default function HomeDoctor({ grid }) {
  const [patientList, setPatientList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    async function fetchPatient() {
      const doctor = await doctorService.getCurrentDoctor();
      const patients = await doctorService.getAllPatientByDoctorId(doctor.id);
      const appointments =
        await appointmentService.getAllMedicalRecordByDoctorId(doctor.id);
      setPatientList(patients.data.data);
      setAppointmentList(appointments.data.data);
    }
    fetchPatient();
  }, []);
  const Button = ({ type, name }) => {
    return <button className={"widgetLgButton " + type}>{name}</button>;
  };
  return (
    <div className="home">
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Revanue</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">12.000.000đ</span>
            <span className="featuredMoneyRate">
              -11.4 <ArrowDownwardIcon className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Sales</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">12.000.000đ</span>
            <span className="featuredMoneyRate">
              -11.4 <ArrowDownwardIcon className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Cost</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">12.000.000đ</span>
            <span className="featuredMoneyRate">
              +11.4 <ArrowUpwardIcon className="featuredIcon" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
      </div>
      <div className="chart">
        <h4 className="chartTitle">Sales Analytics</h4>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={userData}>
            <XAxis dataKey="name" stroke="#555" />
            <Line type="monotone" dataKey="Active user" stroke="#555" />
            <Tooltip />
            <CartesianGrid stroke="#e3e3eb" strokeDasharray="5 5" />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="homeWidget">
        <div className="widgetSm">
          <span className="widgetSmTitle">Danh sách bệnh nhân</span>
          <ul className="widgetSmList">
            {patientList.map((patient) => {
              return (
                <li key={patient.id} className="widgetSmListItem">
                  <img
                    src="https://icdn.dantri.com.vn/thumb_w/660/2021/09/22/lisa-6-1632294023405.jpeg"
                    alt=""
                    className="widgetSmImg"
                  />
                  <div className="widgetSmUser">
                    <span className="widgetSmUsername">{patient.name}</span>
                    <span className="widgetSmUserTitle">
                      {patient.phoneNumber}
                    </span>
                  </div>
                  <button className="widgetSmButton">
                    <VisibilityIcon className="widgetSmIcon" />
                    Hiển thị
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="widgetLg">
          <h3 className="widgetLgTitle">Danh sách hồ sơ khám bệnh</h3>
          <table className="widgetLgTable">
            <thead>
              <tr className="widgetLgTr">
                <th className="widgetLgTd">Customer</th>
                <th className="widgetLgTd">Date</th>
                <th className="widgetLgTd">Amount</th>
                <th className="widgetLgTd">Status</th>
              </tr>
            </thead>

            <tbody>
              {appointmentList.map((appointment) => {
                return (
                  <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                      <img
                        src="https://vnn-imgs-f.vgcloud.vn/2021/11/24/17/lisa-blackpink-nhiem-covid-19-1.jpg"
                        alt=""
                        className="widgetLgImg"
                      />
                      <span className="widgetLgName">{appointment.name}</span>
                    </td>
                    <td className="widgetLgDate">{appointment.createdAt}</td>
                    <td className="widgetAmount">300.000đ</td>
                    <td className="widgetLgStatus">
                      <Button type="Approved" name="Approved" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
