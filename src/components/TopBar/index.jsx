import React from "react";
import "./style.css";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import LanguageIcon from "@material-ui/icons/Language";
import SettingsIcon from "@material-ui/icons/Settings";
import { Switch, Link } from "react-router-dom";
import authService from "../../services/Auth/auth.service";
export default function Topbar(props) {
  const logOut = () => {
    authService.logout();
    window.location = "/";
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" className="logo">
            TCareAdmin
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <div className="topbarIconContainer">
            <Link to="/profile">
              {props.user.fullname === "root" ? "Root" : props.user.fullname}
            </Link>
          </div>
          <div className="image_profile">
            <img
              src="https://image.thanhnien.vn/w660/Uploaded/2022/bzivoxbp/2021_01_25/rose_qnem.jpg"
              alt=""
              className="topAvatar"
            />
            <div className="myProfile">
              <ul>
                <Link to="/profile">
                  <li>Quản lý tài khoản</li>
                </Link>
                <Link to="" onClick={logOut}>
                  <li>Đăng xuất</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
