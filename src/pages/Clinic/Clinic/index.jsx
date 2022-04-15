import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { React, useState, useEffect } from "react";
import clinicService from "../../../services/Clinic/clinic.service";
import { useParams } from "react-router-dom";
import "./style.css";
import authService from "../../../services/Auth/auth.service";

export default function Clinic() {
  const [clinic, setClinic] = useState([]);
  const [redirect, setRedirect] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    async function feachClinic() {
      let clinic = await clinicService.clinicDetails(id);
      setClinic(clinic.data.data);
    }
    feachClinic();
  }, []);

  const handleUpdateClinic = async (e) => {
    e.preventDefault();
    const user = await authService.getCurrentUser();
    clinic.updateBy = user.id;
    await clinicService.updateClinic(id, clinic).then(
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
      {redirect && <Redirect to="/clinics" />}

      <div className="userTitleContainer">
        <h1 className="userTitle">Cập nhật phòng khám</h1>
        <Link to="/clinics/create">
          <button className="userAddButton">Tạo mới</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{clinic.name}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết phòng khám</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{clinic.name}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{clinic.phoneNumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{clinic.address}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm" onSubmit={handleUpdateClinic}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên phòng khám</label>
                <input
                  type="text"
                  placeholder="Tên phòng khám"
                  value={clinic.name || ""}
                  name="name"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setClinic({
                      ...clinic,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="number"
                  placeholder="Số điện thoại"
                  value={clinic.phoneNumber || ""}
                  className="userUpdateInput"
                  name="phoneNumber"
                  onChange={(e) =>
                    setClinic({
                      ...clinic,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={clinic.address || ""}
                  name="address"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setClinic({
                      ...clinic,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Trạng thái</label>
                <select
                  className="userUpdateInput"
                  defaultValue={clinic.stauts}
                  onChange={(e) =>
                    setClinic({
                      ...clinic,
                      status: e.target.value,
                    })
                  }
                >
                  {clinic.status === true ? (
                    <>
                      <option value="1">Hiển thị</option>
                      <option value="0">Ẩn</option>
                    </>
                  ) : (
                    <>
                      <option value="0">Ẩn</option>
                      <option value="1">Hiển thị</option>
                    </>
                  )}
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Mô tả</label>
                <input
                  type="text"
                  placeholder="Mô tả phòng khám"
                  value={clinic.description || ""}
                  className="userUpdateInput"
                  name="description"
                  onChange={(e) =>
                    setClinic({
                      ...clinic,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="userUpdateRight">
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
              <button type="submit" className="userUpdateButton">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
