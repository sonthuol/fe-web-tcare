import Chart from "../../components/Admin/Chart";
import FeaturedInfor from "../../components/Admin/FeaturedInfo";
import "./style.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/Admin/WidgetSm";
import WidgetLg from "../../components/Admin/WidgetLg";
import clinicService from "../../services/Clinic/clinic.service.js";
import { React, useEffect, useState } from "react";
export default function Home() {
  const [phanTich, setPhanTich] = useState([]);
  const [clinicId, setClinicId] = useState([]);
  useEffect(async () => {
    const id = await clinicService.getCurrentClinic();
    async function fetchPhanTich() {
      if (id != null) {
        setClinicId(id.id);
        const clinic = await clinicService.phanTichPhongKhamDoanhThuTheoThang(
          id.id
        );
        setPhanTich(clinic.data.data);
      } else {
        const clinic = await clinicService.phanTichSoLuongPhongKhamTheoThang();
        setPhanTich(clinic.data.data);
      }
    }
    fetchPhanTich();
  }, []);
  return (
    <div className="home">
      <FeaturedInfor />
      <Chart
        data={phanTich}
        title={
          clinicId == ""
            ? "Thống kế số phòng khám đăng ký"
            : "Thống kế doanh thu"
        }
        dataKey={clinicId == "" ? "Số phòng khám" : "Doanh thu"}
        grid
      />
    </div>
  );
}
