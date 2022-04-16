import { React } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function NoAccess() {
  return (
    <div className="clinicList">
      <p>Không có quyền truy cập để sử dụng chức năng của hệ thống</p>
      <Link to="/">Tiếp tục</Link>
    </div>
  );
}
