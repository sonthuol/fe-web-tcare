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
import clinicService from "../../../services/Clinic/clinic.service";
import doctorService from "../../../services/Doctor/doctor.service";

export default function Doctor() {
  const [doctor, setDoctor] = useState([]);
  const [specialtyList, setSpecialtyList] = useState([]);
  const [clinic, setClinic] = useState({
    id: 0,
    name: "",
  });
  const [specialty, setSpecialty] = useState({
    id: 0,
    name: "",
  });
  const [redirect, setRedirect] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    async function feachDoctor() {
      let doctor = await doctorService.doctorDetails(id);
      setDoctor(doctor.data.data);
      setClinic({
        id: doctor.data.data.clinics[0].id,
        name: doctor.data.data.clinics[0].name,
      });
      setSpecialty({
        id: doctor.data.data.specialties[0].id,
        name: doctor.data.data.specialties[0].name,
      });
    }
    async function feachSpecialty() {
      const clinic = await clinicService.getCurrentClinic();
      let specialty = await specialtyService.getAllSpecialties();
      specialty = specialty.data.data.filter(
        (item) => item.clinics[0].id === clinic.id
      );
      setSpecialtyList(specialty);
    }
    feachDoctor();
    feachSpecialty();
  }, []);

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    const user = await authService.getCurrentUser();
    doctor.updateId = user.id;
    doctor.specialtyId = specialty.id;
    await doctorService.updateDoctor(id, doctor).then(
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
      {redirect && <Redirect to="/doctors" />}

      <div className="userTitleContainer">
        <h1 className="userTitle">Cập nhật thông tin bác sĩ</h1>
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
              <span className="userShowUsername">{doctor.name}</span>
              <span className="userShowUserTitle">{clinic.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết bác sĩ</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{doctor.name}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{specialty.name}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{doctor.birthday}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{doctor.phoneNumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{doctor.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{doctor.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm" onSubmit={handleUpdateDoctor}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên phòng khám</label>
                <input
                  type="text"
                  placeholder="Tên phòng khám"
                  value={doctor.name || ""}
                  name="name"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Ngày sinh</label>
                <input
                  type="date"
                  value={doctor.birthday || ""}
                  name="birthday"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      birthday: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Số tuổi</label>
                <input
                  type="text"
                  value={doctor.age || ""}
                  name="birthday"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      age: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Chuyên khoa</label>
                <select
                  className="userUpdateInput"
                  defaultValue={specialty.id}
                  value={specialty.id}
                  onChange={(e) =>
                    setSpecialty({
                      id: e.target.value,
                      name: e.target.options[e.target.selectedIndex].text,
                    })
                  }
                >
                  {specialtyList.map((spe, index) => (
                    <>
                      <option
                        value={spe.id}
                        key={index}
                        selected={spe.id === specialty.id ? "selected" : ""}
                      >
                        {spe.name}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Giới tính</label>
                <select
                  className="userUpdateInput"
                  defaultValue={doctor.gender}
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      gender: e.target.value,
                    })
                  }
                >
                  <>
                    <option
                      value="1"
                      selected={doctor.gender === true ? "selected" : ""}
                    >
                      Nam
                    </option>
                    <option
                      value="0"
                      selected={doctor.gender === false ? "selected" : ""}
                    >
                      Nữ
                    </option>
                  </>
                  )}
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={doctor.email || ""}
                  name="birthday"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  value={doctor.phoneNumber || ""}
                  name="birthday"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  value={doctor.address || ""}
                  name="birthday"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Trạng thái</label>
                <select
                  className="userUpdateInput"
                  defaultValue={doctor.isActive}
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      isActive: e.target.value,
                    })
                  }
                >
                  <>
                    <option
                      value="1"
                      selected={doctor.isActive === true ? "selected" : ""}
                    >
                      Hiển thị
                    </option>
                    <option
                      value="0"
                      selected={doctor.isActive === false ? "selected" : ""}
                    >
                      Ẩn
                    </option>
                  </>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Mô tả ngắn</label>
                <input
                  type="text"
                  placeholder="Mô tả ngắn bác sĩ"
                  value={doctor.descriptionShort || ""}
                  className="userUpdateInput"
                  name="description"
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      descriptionShort: e.target.value,
                    })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Mô tả</label>
                <input
                  type="text"
                  placeholder="Mô tả bác sĩ"
                  value={doctor.description || ""}
                  className="userUpdateInput"
                  name="description"
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
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
