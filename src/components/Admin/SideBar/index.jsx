import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import LineStyleIcon from "@material-ui/icons/LineStyle";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ReportIcon from "@material-ui/icons/Report";
import TimelineIcon from "@material-ui/icons/Timeline";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Bảng điều khiển</h3>
          <ul className="sidebarList">
            <NavLink to="/" exact className="sidebarLink">
              <li className="sidebarItem active">
                <LineStyleIcon className="sidebarIcon" />
              </li>
              Trang chủ
            </NavLink>
            <li className="sidebarItem">
              <TimelineIcon className="sidebarIcon" /> Phân tích
            </li>
          </ul>
        </div>
        {props.role === "ROLE_ROOT" ? (
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quản lý hệ thống</h3>
            <ul className="sidebarList">
              <NavLink to="/accounts" className="sidebarLink">
                <li className="sidebarItem">
                  <PermIdentityIcon className="sidebarIcon" />
                </li>
                Tài khoản
              </NavLink>
              <NavLink to="/clinics" className="sidebarLink">
                <li className="sidebarItem">
                  <LocalHospitalIcon className="sidebarIcon" />
                </li>
                Phòng khám
              </NavLink>
            </ul>
          </div>
        ) : (
          <></>
        )}

        {props.role === "ROLE_ADMIN" ? (
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quản lý phòng khám</h3>
            <ul className="sidebarList">
              <NavLink to="/specialties" className="sidebarLink">
                <li className="sidebarItem">
                  <PermIdentityIcon className="sidebarIcon" />
                </li>
                Chuyên khoa
              </NavLink>
              <NavLink to="/doctors" className="sidebarLink">
                <li className="sidebarItem">
                  <LocalHospitalIcon className="sidebarIcon" />
                </li>
                Bác sĩ
              </NavLink>
            </ul>
          </div>
        ) : (
          <></>
        )}

        {props.role === "ROLE_DOCTOR" ? (
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quản lý lịch</h3>
            <ul className="sidebarList">
              <NavLink to="/schedules/create" className="sidebarLink">
                <li className="sidebarItem">
                  <PermIdentityIcon className="sidebarIcon" />
                </li>
                Quản lý lịch khám
              </NavLink>
              <NavLink to="/clinics" className="sidebarLink">
                <li className="sidebarItem">
                  <LocalHospitalIcon className="sidebarIcon" />
                </li>
                Quản lý lịch hẹn
              </NavLink>
            </ul>
          </div>
        ) : (
          <></>
        )}

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notification</h3>
          <ul className="sidebarList">
            <li className="sidebarItem">
              <MailOutlineIcon className="sidebarIcon" /> Mail
            </li>
            <li className="sidebarItem">
              <DynamicFeedIcon className="sidebarIcon" /> Feedback
            </li>
            <li className="sidebarItem">
              <ChatBubbleOutlineIcon className="sidebarIcon" /> Message
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarItem">
              <WorkOutlineIcon className="sidebarIcon" /> Manage
            </li>
            <li className="sidebarItem">
              <TimelineIcon className="sidebarIcon" /> Analytics
            </li>
            <li className="sidebarItem">
              <ReportIcon className="sidebarIcon" /> Reposts
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
