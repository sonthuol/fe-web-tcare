import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import authService from "../../../services/Auth/auth.service";
import clinicService from "../../../services/Clinic/clinic.service";
import "./style.css";

export default function NewClinic() {
  const initialValue = {
    fullname: "",
    username: "",
    password: "",
    email: "",
    roles: ["admin"],
    name: "",
    phoneNumber: "",
    address: "",
    image: "",
    description: "",
    status: 1,
    isDelete: "",
    addBy: "",
    updateBy: "",
    deleteBy: "",
  };
  const [data, setData] = useState(initialValue);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setData({
        ...data,
        addBy: user.id,
      });
    }
  }, []);

  const handleCreateNewClinic = (e) => {
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
    clinicService.createNewClinic(data).then(
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
      {redirect && <Redirect to="/clinics" />}
      <h1 className="newUserTitle">Tạo mới phòng khám</h1>
      <form className="newUserForm" onSubmit={handleCreateNewClinic}>
        <div className="newUserItem">
          <label>Họ tên chủ phòng khám</label>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            name="fullname"
            value={data.fullname}
            onChange={(e) => setData({ ...data, fullname: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Tên tài khoản</label>
          <input
            type="text"
            placeholder="Nhập tên tài khoản ..."
            name="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input
            type="text"
            placeholder="Mật khẩu"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
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
          <label>Tên phòng khám</label>
          <input
            type="text"
            placeholder="Phòng khám chuyên khoa ..."
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
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
          <label>Mô tả phòng khám</label>
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