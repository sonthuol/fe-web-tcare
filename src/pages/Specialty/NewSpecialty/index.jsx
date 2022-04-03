import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import authService from "../../../services/Auth/auth.service";
import clinicService from "../../../services/Clinic/clinic.service";
import specialtyService from "../../../services/Specialty/specialty.service";
import "./style.css";

export default function NewSpecialty() {
  const initialValue = {
    name: "",
    image: "",
    description: "",
    status: 1,
    isDelete: "",
    addBy: "",
    updateBy: "",
    deleteBy: "",
    clinicId: "",
  };
  const [data, setData] = useState(initialValue);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const user = authService.getCurrentUser();
    const clinic = clinicService.getCurrentClinic();
    if (user) {
      setData({
        ...data,
        addBy: user.id,
        clinicId: clinic.id,
      });
    }
  }, []);
  const handleCreateNewSpecialty = (e) => {
    e.preventDefault();
    specialtyService.createNewSpecialty(data).then(
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
      {redirect && <Redirect to="/specialties" />}
      <h1 className="newUserTitle">Tạo chuyên khoa</h1>
      <form className="newUserForm" onSubmit={handleCreateNewSpecialty}>
        <div className="newUserItem">
          <label>Tên chuyên khoa</label>
          <input
            type="text"
            placeholder="Nhập tên chuyên khoa"
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Hình ảnh</label>
          <input
            type="text"
            name="username"
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
          <label>Mô tả chuyên khoa</label>
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
