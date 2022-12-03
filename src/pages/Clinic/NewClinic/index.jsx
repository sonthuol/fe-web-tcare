import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import authService from "../../../services/Auth/auth.service";
import clinicService from "../../../services/Clinic/clinic.service";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
  const [file, setFile] = useState();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setData({
        ...data,
        addBy: user.id,
      });
    }
  }, []);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

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
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("address", data.address);
    formData.append("image", data.image);
    formData.append("description", data.description);
    formData.append("status", data.status);
    formData.append("isDelete", data.isDelete);
    formData.append("addBy", data.addBy);
    formData.append("updateBy", data.updateBy);
    formData.append("deleteBy", data.deleteBy);
    clinicService.createNewClinic(formData).then(
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

  const inputHandler = (event, editor) => {
    setData({ ...data, description: editor.getData() });
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
            type="password"
            placeholder="Mật khẩu"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            autoComplete="on"
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
          <label>Hình ảnh phòng khám</label>
          <input type="file" onChange={(e) => saveFile(e)} />
          {file && <img src={URL.createObjectURL(file)} />}
        </div>

        <div className="newUserItemFile">
          <label>Mô tả chi tiết</label>
          <CKEditor
            className="mt-3 wrap-ckeditor"
            editor={ClassicEditor}
            id="ckeditorClinic"
            onChange={inputHandler}
          />
        </div>
        <button type="submit" className="newUserButton">
          Tạo mới
        </button>
      </form>
    </div>
  );
}
