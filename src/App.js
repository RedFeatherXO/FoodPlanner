import React from "react";
import { useEffect, useState } from "react";
import { Layout, Button, Pagination, DatePicker } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./App.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import {ZubSteps, List, Pic, Head, Count, Time} from "./components/RetrieveData.js"
import {
  MoSteps,
  MoList,
  MoPic,
  MoHead,
  MoCount,
  MoTime,
} from "./components/Mo.js";
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);
const { Header, Content } = Layout;

const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const dayComponentsSteps = [MoSteps]; //, Di, Mi, Do, Fr, Sa, So];
const dayComponentsLists = [MoList];
const dayComponentsPics = [MoPic];
const dayComponentsHeads = [MoHead];
const dayComponentsCounts = [MoCount];
const dayComponentsTimes = [MoTime];



export default function App() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD')); //ISO8601 2019-01-25 -> 25.01.2019
  const [selectedIndex, setSelectedIndex] = useState(0); // (0) -> Default value
  const changeColor = (index) => {
    setSelectedIndex(index);
  };

  const onChange = (date, dateString) => {
    if(date) {
      setSelectedDate(date);
    }
  };
  // {
  //   "$L": "en",
  //   "$d": "2024-05-06T22:00:00.000Z",
  //   "$y": 2024,
  //   "$M": 4,
  //   "$D": 7,
  //   "$W": 2,
  //   "$H": 0,
  //   "$m": 0,
  //   "$s": 0,
  //   "$ms": 0,
  //   "$x": {},
  //   "$isDayjsObject": true
  // }
  const SelectedDayComponent =
    selectedIndex !== null ? dayComponentsSteps[selectedIndex] : null;
  const SelectedDayComponentList =
    selectedIndex !== null ? dayComponentsLists[selectedIndex] : null;
  const SelectedDayComponentPic =
    selectedIndex !== null ? dayComponentsPics[selectedIndex] : null;
  const SelectedDayComponentHead =
    selectedIndex !== null ? dayComponentsHeads[selectedIndex] : null;
  const SelectedDayComponentCount =
    selectedIndex !== null ? dayComponentsCounts[selectedIndex] : null;
  const SelectedDayComponentTime =
    selectedIndex !== null ? dayComponentsTimes[selectedIndex] : null;
  return (
    <>
      <Layout className="layout">
        <Header className="header">
          <div className="CreateRec"> Create new recipe</div>
          <h2 style={{ color: "var(--MenuColor)" }}> Food planer </h2>
          <div className="Account"> Account</div>
        </Header>

        <div className="DateSelection">
          <div className="DateBox MonthSelection">
            <div>
              <DatePicker
                defaultValue={dayjs()}
                format="MMMM"
                onChange={onChange}
                picker="month"
              />
            </div>
            <div>
              <DatePicker
                defaultValue={dayjs()}
                format="wo"
                onChange={onChange}
                picker="week"
              />
            </div>
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
          <div className="DateBox YearSelection">
            <DatePicker
              defaultValue={dayjs()}
              format="YYYY"
              onChange={onChange}
              picker="year"
            />
          </div>
        </div>
        <Content className="content">
          <div className="food-preview">
            {SelectedDayComponentHead && <SelectedDayComponentHead />}
            <div className="boxes-container">
              <div className="box box1">
                <div className="Hbox">
                  {SelectedDayComponentCount && <SelectedDayComponentCount />}
                </div>
                {SelectedDayComponentList && <SelectedDayComponentList />}
              </div>
              <div className="box box2">
                <div className="box-content">
                  {SelectedDayComponentPic && <SelectedDayComponentPic />}
                </div>
              </div>
              <div className="box box3">
                <div className="Hbox">
                  {SelectedDayComponentTime && <SelectedDayComponentTime />}
                </div>
                {ZubSteps(selectedDate) && <ZubSteps />}
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}
