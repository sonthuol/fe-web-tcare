import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import authService from "../../../services/Auth/auth.service";
import clinicService from "../../../services/Clinic/clinic.service";
import specialtyService from "../../../services/Specialty/specialty.service";
import doctorService from "../../../services/Doctor/doctor.service";
import "./style.css";

export default function NewDoctor() {
  const initialValue = {
    name: "",
    birthday: "",
    age: "",
    gender: 1, //Mặc định là Nam
    email: "",
    phoneNumber: "",
    address: "",
    image: "",
    descriptionShort: "",
    description: "",
    isActive: 1,
    isDelete: "",
    addBy: "",
    updateBy: "",
    deleteBy: "",
    clinicId: "", //Thuộc phòng khám nào?
    specialties: "", //Bác sĩ ở chuyên khoa nào?
    username: "",
    password: "",
    fullname: "",
    roles: ["doctor"],
  };
  const [data, setData] = useState(initialValue);
  const [specialtyList, setSpecialtyList] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function init() {
      const user = await authService.getCurrentUser();
      const clinic = await clinicService.getCurrentClinic();
      if (user) {
        setData({
          ...data,
          addBy: user.id,
          clinicId: clinic.id,
        });
      }
    }

    async function feachSpecialty() {
      const clinic = await clinicService.getCurrentClinic();
      let specialty = await specialtyService.getAllSpecialties();
      specialty = specialty.data.data.filter(
        (item) => item.clinics[0].id === clinic.id
      );
      setSpecialtyList(specialty);
    }

    init();
    feachSpecialty();
  }, []);

  const handleCreateNewDoctor = (e) => {
    e.preventDefault();
    authService.register(
      data.username,
      data.email,
      data.password,
      data.roles,
      data.fullname,
      data.address,
      data.phoneNumber
    );
    doctorService.createNewDoctor(data).then(
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
    <div className="newUser">
      {redirect && <Redirect to="/doctors" />}
      <h1 className="newUserTitle">Tạo mới bác sĩ</h1>
      <form className="newUserForm" onSubmit={handleCreateNewDoctor}>
        <div className="newUserItem">
          <label>Tên tài khoản</label>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            name="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Họ và tên</label>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            name="name"
            value={data.name}
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
                fullname: e.target.value,
              })
            }
          />
        </div>
        <div className="newUserItem">
          <label>Ngày sinh</label>
          <input
            type="date"
            name="birthday"
            value={data.birthday}
            onChange={(e) => setData({ ...data, birthday: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Số tuổi</label>
          <input
            type="text"
            placeholder="Nhập độ tuổi"
            name="age"
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Giới tính</label>
          <select
            className="newUserSelect"
            name="gender"
            id="active"
            value={data.gender}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          >
            <option value="1">Nam</option>
            <option value="0">Nữ</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Chuyên khoa</label>
          <select
            className="newUserSelect"
            name="isDelete"
            id="active"
            value={data.specialties}
            onChange={(e) => setData({ ...data, specialties: e.target.value })}
          >
            <option value="">--Chọn chuyên khoa--</option>
            {specialtyList.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="text"
            placeholder="Địa chỉ email"
            name="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input
            type="text"
            placeholder="0123xxxxxx"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Địa chỉ</label>
          <input
            type="text"
            placeholder="ĐHCT, P.Xuân Khánh, Q.Ninh Kiều, TP.Cần Thơ"
            name="address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Hình ảnh</label>
          <input
            type="text"
            name="image"
            value={data.image}
            onChange={(e) => setData({ ...data, image: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Trạng thái</label>
          <select
            className="newUserSelect"
            name="isDelete"
            id="active"
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
          >
            <option value="1">Hiển thị</option>
            <option value="0">Ẩn</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Mô tả bác sĩ ngắn</label>
          <textarea
            rows="4"
            onChange={(e) =>
              setData({ ...data, descriptionShort: e.target.value })
            }
            name="descriptionShort"
            cols="50"
            value={data.descriptionShort}
          ></textarea>
        </div>
        <div className="newUserItem">
          <label>Mô tả chi tiết</label>
          <textarea
            rows="4"
            onChange={(e) => setData({ ...data, description: e.target.value })}
            name="description"
            cols="50"
            value={data.description}
          ></textarea>
        </div>

        <button type="submit" className="newUserButton">
          Tạo mới
        </button>
      </form>
    </div>
  );
}
