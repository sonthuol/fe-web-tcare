import React from "react";
import Chart from "../../components/Admin/Chart";
import FeaturedInfor from "../../components/Admin/FeaturedInfo";
import "./style.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/Admin/WidgetSm";
import WidgetLg from "../../components/Admin/WidgetLg";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfor />
      <Chart
        data={userData}
        title="Sales Analytics"
        dataKey="Active user"
        grid
      />
      <div className="homeWidget">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
