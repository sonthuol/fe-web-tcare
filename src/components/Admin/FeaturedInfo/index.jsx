import "./style.css";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import clinicService from "../../../services/Clinic/clinic.service.js";
import { React, useEffect, useState } from "react";
export default function FeaturedInfor() {
  const [phanTich, setPhanTich] = useState([]);
  const [clinicId, setClinicId] = useState("");
  useEffect(async () => {
    async function fetchPhanTich() {
      const id = await clinicService.getCurrentClinic();
      if (id != null) {
        setClinicId(id.id);
        const clinic = await clinicService.phanTichPhongKhamSoLuong(id.id);
        setPhanTich(clinic.data.data);
      } else {
        const clinic = await clinicService.phanTichSoLuong();
        setPhanTich(clinic.data.data);
      }
    }
    fetchPhanTich();
  }, []);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">
          {clinicId == "" ? "Phòng khám" : "Chuyên khoa"}
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {clinicId == "" ? phanTich.clinic : phanTich.specialty}
          </span>
        </div>
        <span className="featuredSub">
          Tổng số {clinicId == "" ? "Phòng khám" : "Chuyên khoa"}
        </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Bác sĩ</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {clinicId == "" ? phanTich.doctor : phanTich.doctor}
          </span>
        </div>
        <span className="featuredSub">Tổng số Bác sĩ</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">
          {clinicId == "" ? "Bệnh nhân" : "Hồ sơ khám bệnh"}
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {clinicId == "" ? phanTich.patient : phanTich.medicalRecords}
          </span>
        </div>
        <span className="featuredSub">
          Tổng số {clinicId == "" ? "Bệnh nhân" : "Hồ sơ khám bệnh"}
        </span>
      </div>
    </div>
  );
}
