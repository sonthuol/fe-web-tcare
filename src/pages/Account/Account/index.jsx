import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import { Link, Redirect } from "react-router-dom";
import { React, useState, useEffect } from "react";
import userService from "../../../services/User/user.service";
import { useParams } from "react-router-dom";
import "./style.css";
import authService from "../../../services/Auth/auth.service";
export default function Account() {
  const [user, setUser] = useState([]);
  const [redirect, setRedirect] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    async function feachUser() {
      let user = await userService.userDetails(id);
      setUser(user.data.data);
    }
    feachUser();
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const accountToken = await authService.getCurrentUser();
    user.updateBy = accountToken.id;
    // console.log(user);
    await userService.updateUser(id, user).then(
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
    <div className="user">
      {redirect && <Redirect to="/accounts" />}

      <div className="userTitleContainer">
        <h1 className="userTitle">Cập nhật tài khoản</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            {/* <Avatar className="userShowImg"></Avatar> */}
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fullname}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Họ và tên</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.fullname}</span>
            </div>
            <span className="userShowTitle">Thông tin liên lạc</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phoneNumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm" onSubmit={handleUpdateUser}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Họ và tên</label>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={user.fullname || ""}
                  name="fullname"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      fullname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="number"
                  placeholder="Số điện thoại"
                  value={user.phoneNumber || ""}
                  className="userUpdateInput"
                  name="phoneNumber"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={user.email || ""}
                  className="userUpdateInput"
                  name="email"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={user.address || ""}
                  name="address"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <button type="submit" className="userUpdateButton">
                Cập nhật
              </button>
            </div>
            {/* <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
