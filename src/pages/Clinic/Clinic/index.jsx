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
  const [file, setFile] = useState();

  let { id } = useParams();
  useEffect(() => {
    async function feachClinic() {
      let clinic = await clinicService.clinicDetails(id);
      setClinic(clinic.data.data);
    }
    feachClinic();
  }, []);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateClinic = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", clinic.name);
    formData.append("phoneNumber", clinic.phoneNumber);
    formData.append("address", clinic.address);
    formData.append("image", clinic.image);
    formData.append("description", clinic.description);
    formData.append("status", clinic.status);
    formData.append("isDelete", clinic.isDelete);
    formData.append("addBy", clinic.addBy);
    formData.append("updateBy", clinic.updateBy);
    formData.append("deleteBy", clinic.deleteBy);

    const user = await authService.getCurrentUser();
    clinic.updateBy = user.id;
    await clinicService.updateClinic(id, formData).then(
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
      {redirect && <Redirect to="/clinics" />}

      <div className="clinicTitleContainer">
        <h1 className="clinicTitle">Cập nhật phòng khám</h1>
        <Link to="/clinics/create">
          <button className="clinicListAddButton">Tạo mới</button>
        </Link>
      </div>
      <div className="clinicContainer">
        <div className="clinicShow">
          <div className="clinicShowTop">
            <img src={clinic.image} alt="" className="clinicShowImg" />
            <div className="clinicShowTopTitle">
              <span className="clinicShowUsername">{clinic.name}</span>
              <span className="clinicShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="clinicShowBottom">
            <span className="clinicShowTitle">Chi tiết phòng khám</span>
            <div className="clinicShowInfo">
              <PermIdentity className="clinicShowIcon" />
              <span className="clinicShowInfoTitle">{clinic.name}</span>
            </div>
            <div className="clinicShowInfo">
              <CalendarToday className="clinicShowIcon" />
              <span className="clinicShowInfoTitle">10.12.1999</span>
            </div>
            <span className="clinicShowTitle">Contact Details</span>
            <div className="clinicShowInfo">
              <PhoneAndroid className="clinicShowIcon" />
              <span className="clinicShowInfoTitle">{clinic.phoneNumber}</span>
            </div>
            <div className="clinicShowInfo">
              <MailOutline className="clinicShowIcon" />
              <span className="clinicShowInfoTitle">{clinic.address}</span>
            </div>
            <div className="clinicShowInfo">
              <LocationSearching className="clinicShowIcon" />
              <span className="clinicShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="clinicUpdate">
          <span className="clinicUpdateTitle">Chỉnh sửa</span>
          <form
            className="clinicUpdateForm"
            onSubmit={handleUpdateClinic}
            encType="multipart/form-data"
          >
            <div className="clinicUpdateLeft">
              <div className="clinicUpdateItem">
                <label>Tên phòng khám</label>
                <input
                  type="text"
                  placeholder="Tên phòng khám"
                  value={clinic.name || ""}
                  name="name"
                  className="clinicUpdateInput"
                  onChange={(e) =>
                    setClinic({
                      ...clinic,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="clinicUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="number"
                  placeholder="Số điện thoại"
                  value={clinic.phoneNumber || ""}
                  className="clinicUpdateInput"
                  name="phoneNumber"
                  onChange={(e) =>
                    setClinic({
                      ...clinic,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="clinicUpdateItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={clinic.address || ""}
                  name="address"
                  className="clinicUpdateInput"
                  onChange={(e) =>
                    setClinic({
                      ...clinic,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="clinicUpdateItem">
                <label>Trạng thái</label>
                <select
                  className="clinicUpdateInput"
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
              <div className="clinicUpdateItem">
                <label>Mô tả</label>
                <input
                  type="text"
                  placeholder="Mô tả phòng khám"
                  value={clinic.description || ""}
                  className="clinicUpdateInput"
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
            <div className="clinicUpdateRight">
              <div className="clinicUpdateUpload">
                <img className="clinicUpdateImg" src={clinic.image} alt="" />
                <label htmlFor="file">
                  <Publish className="clinicUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => saveFile(e)}
                  style={{ display: "none" }}
                />
              </div>
              <button type="submit" className="clinicUpdateButton">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
