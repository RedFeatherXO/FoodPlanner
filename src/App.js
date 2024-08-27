import React from "react";
import { useEffect, useState, useReducer } from "react";
import { Layout, Button, DatePicker, message, Tooltip } from "antd";
import "./App.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { ZubSteps, List, Pic, Head, Count, Time, Devbtn, ServerInfoAndHeader } from "./components/RetrieveData.js";
import { RecipeCardBox } from "./components/SelectRecipeDay.js";
import { UploadDrawer } from "./components/GerichtUpload.js";
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);
const { Header, Content } = Layout;

const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const user = {name:"dev", _id: "66b38186803417ea7bcad6f3" };

export default function App() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD")); //ISO8601 2019-01-25 -> 25.01.2019
  const [selectedIndex, setSelectedIndex] = useState(dayjs().isoWeekday() - 1); // (0) -> Default value
  // State lifting from RetrieveData.js
  const [ServerInfo, setServerInfo] = useState([{ RecipeAvailable: false, ServerAvailable: false }]);

  const showDrawer = () => {
    setOpen(true);
  };

  const changeColor = (index) => {
    setSelectedIndex(index);
    const newDate = dayjs(
      String(dayjs(selectedDate).year()) +
        "-" +
        String(dayjs(selectedDate).month() + 1) +
        "-" +
        dayjs(selectedDate)
          .isoWeekday(index + 1)
          .date()
    ).format("YYYY-MM-DD");
    setSelectedDate(newDate);
  };

  const onChange = (date) => {
    if (date) {
      setSelectedDate(dayjs(String(date.year()) + "-" + String(date.month() + 1) + "-" + date.isoWeekday(selectedIndex + 1).date()));
    }
  };

  return (
    <>
      <Layout className="layout">
        {UploadDrawer && <UploadDrawer open={open} setOpen={setOpen} />}
        <Header className="header">
          <div className="CreateRec">
            <Button type="primary" onClick={showDrawer}>
              Create new Recipe
            </Button>
          </div>
          <ServerInfoAndHeader date={selectedDate} value={ServerInfo} setValue={setServerInfo} />
          <div className="Account"> Account</div>
        </Header>

        <div className="DateSelection">
          <div className="DateBox YearSelection">
            <DatePicker defaultValue={dayjs()} format="YYYY" onChange={onChange} picker="year" value={dayjs(selectedDate)} />
            {Devbtn && <Devbtn date={selectedDate} ServerInfo={ServerInfo}/>}
          </div>
          <div className="DateBox DaySelection">
            <ul className="week-menu">
              {days.map((day, index) => (
                <li key={index} onClick={() => changeColor(index)} className={selectedIndex === index ? "selected" : ""}>
                  {day}
                </li>
              ))}
            </ul>
          </div>
          <div className="DateBox MonthSelection">
            <div>
              <DatePicker defaultValue={dayjs()} format="MMMM" onChange={onChange} picker="month" value={dayjs(selectedDate)} />
            </div>
            <div>
              <DatePicker defaultValue={dayjs()} format="wo" onChange={onChange} picker="week" value={dayjs(selectedDate)} />
            </div>
          </div>
        </div>

        <Content className="content">
          {ServerInfo.RecipeAvailable || !ServerInfo.ServerAvailable ? (
            <div className="food-preview">
              {Head && <Head date={selectedDate} />}
              <div className="boxes-container">
                <div className="box box1">
                  <div className="Hbox">{Count && <Count date={selectedDate} />}</div>
                  {List && <List date={selectedDate} />}
                </div>
                <div className="box box2">
                  <div className="box-content">{Pic && <Pic date={selectedDate} />}</div>
                </div>
                <div className="box box3">
                  <div className="Hbox">{Time && <Time date={selectedDate} />}</div>
                  {ZubSteps && <ZubSteps date={selectedDate} />}
                </div>
              </div>
            </div>
          ) : (
            <div className="recipe-selection-menu">{RecipeCardBox && <RecipeCardBox date={selectedDate} user={user}/>}</div>
          )}
        </Content>
      </Layout>
    </>
  );
}
