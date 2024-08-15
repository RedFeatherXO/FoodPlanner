import React from "react";
import { useEffect, useState, useReducer } from "react";
import { Layout, Button, Pagination, DatePicker } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./App.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import {
  ZubSteps,
  List,
  Pic,
  Head,
  Count,
  Time,
  Devbtn,
} from "./components/RetrieveData.js";
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);
const { Header, Content } = Layout;

const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export default function App() {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  ); //ISO8601 2019-01-25 -> 25.01.2019
  const [selectedIndex, setSelectedIndex] = useState(0); // (0) -> Default value
  

  const changeColor = (index) => {
    setSelectedIndex(index);
    // console.log("^^^^^^ changeColor ^^^^^^");
    // console.log(dayjs(String(selectedDate.year())+"-"+String(selectedDate.month()+1)+"-"+selectedDate.isoWeekday(index+1).date()));
    // console.log("----- changeColor -----");
    setSelectedDate(dayjs(String(dayjs(selectedDate).year())+"-"+String(dayjs(selectedDate).month()+1)+"-"+dayjs(selectedDate).isoWeekday(index+1).date()));
  };

  //
  const onChange = (date, dateString) => {
    if (date) {
      // console.log("^^^^^^ OnChange ^^^^^^");
      // console.log(dayjs(String(date.year())+"-"+String(date.month()+1)+"-"+date.isoWeekday(selectedIndex+1).date()));
      // console.log("----- OnChange -----");
      setSelectedDate(dayjs(String(date.year())+"-"+String(date.month()+1)+"-"+date.isoWeekday(selectedIndex+1).date()));
    }
  };
  return (
    <>
      <Layout className="layout">
        <Header className="header">
          <div className="CreateRec"> Create new recipe</div>
          <h2 style={{ color: "var(--MenuColor)" }}> Food planer </h2>
          <div className="Account"> Account</div>
        </Header>

        <div className="DateSelection">
          <div className="DateBox YearSelection">
              <DatePicker
                defaultValue={dayjs()}
                format="YYYY"
                onChange={onChange}
                picker="year"
                value={dayjs(selectedDate)}
              />
              {/* {Devbtn && <Devbtn date={selectedDate}/>} */}
              {Devbtn && <Devbtn/>}
          </div>
          <div className="DateBox DaySelection">
            <ul className="week-menu">
              {days.map((day, index) => (
                <li
                  key={index}
                  onClick={() => changeColor(index)}
                  className={selectedIndex === index ? "selected" : ""}
                >
                  {day}
                </li>
              ))}
            </ul>
          </div>
          <div className="DateBox MonthSelection">
            <div>
                <DatePicker
                  defaultValue={dayjs()}
                  format="MMMM"
                  onChange={onChange}
                  picker="month"
                  value={dayjs(selectedDate)}
                />
            </div>
            <div>
                <DatePicker
                  defaultValue={dayjs()}
                  format="wo"
                  onChange={onChange}
                  picker="week"
                  value={dayjs(selectedDate)}
                />
            </div>
          </div>
        </div>
        <Content className="content">
          <div className="food-preview">
            {Head && <Head />}
            <div className="boxes-container">
              <div className="box box1">
                <div className="Hbox">
                  {Count && <Count />}
                </div>
                {List && <List />}
              </div>
              <div className="box box2">
                <div className="box-content">
                  {Pic && <Pic />}
                </div>
              </div>
              <div className="box box3">
                <div className="Hbox">
                  {Time && <Time />}
                </div>
                {ZubSteps && <ZubSteps />}
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}
