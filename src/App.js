import React from "react";
import { useEffect, useState, useReducer } from "react";
import { Layout, Button, DatePicker, Drawer, Input, Checkbox, Upload, message, Steps } from "antd";
import "./App.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { ZubSteps, List, Pic, Head, Count, Time, Devbtn } from "./components/RetrieveData.js";
import { GerichtName, NewList, NewSteps, NewPic } from "./components/DrawerFunc.js";
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);
const { Header, Content } = Layout;

const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export default function App() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD")); //ISO8601 2019-01-25 -> 25.01.2019
  const [selectedIndex, setSelectedIndex] = useState(dayjs().isoWeekday() - 1); // (0) -> Default value

  const [gerichtName, setGerichtName] = useState("Gericht Name");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const changeColor = (index) => {
    setSelectedIndex(index);
    setSelectedDate(
      dayjs(
        String(dayjs(selectedDate).year()) +
          "-" +
          String(dayjs(selectedDate).month() + 1) +
          "-" +
          dayjs(selectedDate)
            .isoWeekday(index + 1)
            .date()
      )
    );
  };

  const onChange = (date) => {
    if (date) {
      setSelectedDate(dayjs(String(date.year()) + "-" + String(date.month() + 1) + "-" + date.isoWeekday(selectedIndex + 1).date()));
    }
  };

  return (
    <>
      <Layout className="layout">
        <Drawer title={gerichtName} onClose={onClose} open={open} placement="left" size="large">
          {/* State lifting from DrawerFunc.js */}
          <GerichtName value={gerichtName} setValue={setGerichtName} />
          <div className="DrawerBox">{NewPic && <NewPic />}</div>
          <div className="DrawerBox ZutatenDrawer">{NewList && <NewList />}</div>
          <div className="DrawerBox">{NewSteps && <NewSteps />}</div>
          <Button className="SubmitUpload" type="primary"> Upload Gericht </Button>
        </Drawer>
        <Header className="header">
          <div className="CreateRec">
            <Button type="primary" onClick={showDrawer}>
              Create new Recipe
            </Button>
          </div>
          <h2 style={{ color: "var(--MenuColor)" }}> Food planer </h2>
          <div className="Account"> Account</div>
        </Header>

        <div className="DateSelection">
          <div className="DateBox YearSelection">
            <DatePicker defaultValue={dayjs()} format="YYYY" onChange={onChange} picker="year" value={dayjs(selectedDate)} />
            {Devbtn && <Devbtn date={selectedDate} />}
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
        </Content>
      </Layout>
    </>
  );
}
