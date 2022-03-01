import { React, useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import clinicService from "../../../services/Clinic/clinic.service";
import "./style.css";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";
export default function ClinicList() {
  const columns = [
    { field: "id", headerName: "Mã", width: 100 },
    { field: "name", headerName: "Tên phòng khám", width: 240 },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 200 },
    { field: "address", headerName: "Địa chỉ", width: 200 },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/clinics/" + params.row.id}>
              <button className="clinicListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="clinicListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const [clinicList, setClinicList] = useState([]);
  useEffect(() => {
    async function feachClinic() {
      let clinic = await clinicService.getAllClinics();
      setClinicList(clinic.data.data);
    }
    feachClinic();
  }, []);

  const handleDelete = async (id) => {
    setClinicList(clinicList.filter((item) => item.id !== id));
    await clinicService.deleteClinic(id);
  };

  return (
    <div className="clinicList">
      <div className="clinicListTitleContainer">
        <h1 className="clinicListTitle">Danh sách phòng khám</h1>
        <Link to="/clinics/create">
          <button className="clinicListAddButton">Tạo mới</button>
        </Link>
      </div>
      <div style={{ height: 520, width: "100%" }}>
        <DataGrid
          className="clinicListContainer"
          rows={clinicList}
          columns={columns}
          pageSize={7}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
