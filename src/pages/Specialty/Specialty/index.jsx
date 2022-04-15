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
import { useParams } from "react-router-dom";
import "./style.css";
import authService from "../../../services/Auth/auth.service";
import specialtyService from "../../../services/Specialty/specialty.service";

export default function Specialty() {
  const [specialty, setSpecialty] = useState([]);
  const [redirect, setRedirect] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    async function feachSpecialty() {
      let specialty = await specialtyService.specialtyDetails(id);
      setSpecialty(specialty.data.data);
    }
    feachSpecialty();
  }, []);

  const handleUpdateClinic = async (e) => {
    e.preventDefault();
    const user = await authService.getCurrentUser();
    specialty.updateId = user.id;
    await specialtyService.updateSpecialty(id, specialty).then(
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
      {redirect && <Redirect to="/specialties" />}

      <div className="userTitleContainer">
        <h1 className="userTitle">Cập nhật chuyên khoa</h1>
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
              <span className="userShowUsername">{specialty.name}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết phòng khám</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{specialty.name}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
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
                  value={specialty.name || ""}
                  name="name"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setSpecialty({
                      ...specialty,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Trạng thái</label>
                <select
                  className="userUpdateInput"
                  defaultValue={specialty.stauts}
                  onChange={(e) =>
                    setSpecialty({
                      ...specialty,
                      status: e.target.value,
                    })
                  }
                >
                  {specialty.status === true ? (
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
                  value={specialty.description || ""}
                  className="userUpdateInput"
                  name="description"
                  onChange={(e) =>
                    setSpecialty({
                      ...specialty,
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
