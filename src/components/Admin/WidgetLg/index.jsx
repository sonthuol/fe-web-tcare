import React from "react";
import "./style.css";
export default function WidgetLg() {
  const Button = ({ type, name }) => {
    return <button className={"widgetLgButton " + type}>{name}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTd">Customer</th>
            <th className="widgetLgTd">Date</th>
            <th className="widgetLgTd">Amount</th>
            <th className="widgetLgTd">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://vnn-imgs-f.vgcloud.vn/2021/11/24/17/lisa-blackpink-nhiem-covid-19-1.jpg"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Sơn Thươl</span>
            </td>
            <td className="widgetLgDate">21/02/2022</td>
            <td className="widgetAmount">400.000đ</td>
            <td className="widgetLgStatus">
              <Button type="Approved" name="Approved" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://vnn-imgs-f.vgcloud.vn/2021/11/24/17/lisa-blackpink-nhiem-covid-19-1.jpg"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Sơn Thươl</span>
            </td>
            <td className="widgetLgDate">21/02/2022</td>
            <td className="widgetAmount">400.000đ</td>
            <td className="widgetLgStatus">
              <Button type="Declined" name="Declined" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://vnn-imgs-f.vgcloud.vn/2021/11/24/17/lisa-blackpink-nhiem-covid-19-1.jpg"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Sơn Thươl</span>
            </td>
            <td className="widgetLgDate">21/02/2022</td>
            <td className="widgetAmount">400.000đ</td>
            <td className="widgetLgStatus">
              <Button type="Pending" name="Pending" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://vnn-imgs-f.vgcloud.vn/2021/11/24/17/lisa-blackpink-nhiem-covid-19-1.jpg"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Sơn Thươl</span>
            </td>
            <td className="widgetLgDate">21/02/2022</td>
            <td className="widgetAmount">400.000đ</td>
            <td className="widgetLgStatus">
              <Button type="Approved" name="Approved" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
