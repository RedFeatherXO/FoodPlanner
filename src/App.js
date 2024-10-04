import React, { useContext, useEffect, useState, useReducer } from "react";
import { Layout, Button, DatePicker, message, Tooltip,Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./App.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { ZubSteps, List, Pic, Head, Count, Time, Devbtn } from "./components/RetrieveData.js";
import { RecipeCardBox } from "./components/SelectRecipeDay.js";
import { UploadDrawer } from "./components/GerichtUpload.js";
import { GlobalStateContext} from './context/GlobalStateContext.js';
import { useFetchData } from "./components/FetchData.js"
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);
const { Header, Content } = Layout;

const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const user = {name:"dev", _id: "66b38186803417ea7bcad6f3" };

export default function App() {
  const [open, setOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD")); //ISO8601 2019-01-25 -> 25.01.2019
  const [selectedIndex, setSelectedIndex] = useState(dayjs().isoWeekday() - 1); // (0) -> Default value
  // State lifting from RetrieveData.js
  const [ServerInfo, setServerInfo] = useState([{ RecipeAvailable: false, ServerAvailable: false }]);
  const { forceUpdate, globalState, updateSelectedDate } = useContext(GlobalStateContext);
  // useFetchData("")
  const showDrawer = () => {
    setOpen(true);
  };

  const changeColor = (index) => {
    setSelectedIndex(index);

    const currentDate = dayjs(globalState.selectedDate);
    let newDate = dayjs(currentDate).isoWeekday(index + 1); // +1 weil Montag bei 1 anfängt
    const formattedDate = newDate.format("YYYY-MM-DD");

    updateSelectedDate(formattedDate);
    console.log(formattedDate,globalState.data_choosen);
    forceUpdate();
  };
  

  const onChange = (date) => {
    if (date) {
      updateSelectedDate(dayjs(String(date.year()) + "-" + String(date.month() + 1) + "-" + date.isoWeekday(selectedIndex + 1).date()));
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
          <div>
            <h2 style={{ color: "var(--MenuColor)" }}> Food planer </h2>
          </div>
          <div className="Account"> Account</div>
        </Header>

        <div className="DateSelection">
          <div className="DateBox YearSelection">
            <DatePicker defaultValue={dayjs()} format="YYYY" onChange={onChange} picker="year" value={dayjs(globalState.selectedDate)} />
            {Devbtn && <Devbtn date={globalState.selectedDate} ServerInfo={ServerInfo}/>}
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
              <DatePicker defaultValue={dayjs()} format="MMMM" onChange={onChange} picker="month" value={dayjs(globalState.selectedDate)} />
            </div>
            <div>
              <DatePicker defaultValue={dayjs()} format="wo" onChange={onChange} picker="week" value={dayjs(globalState.selectedDate)} />
            </div>
          </div>
        </div>
        
        

        <Content className="content">
          {!globalState.data_catalog ? (
            <Spin indicator={<LoadingOutlined style={{ fontSize: 33 }} spin />} />
          ) : (
            !globalState.isRecipeAvailable || globalState.isServerAvailable ? (
              <div className="recipe-selection-menu">
                {RecipeCardBox && <RecipeCardBox user={user} />}
              </div>
            ) : (
              <div className="food-preview">
                {Head && <Head />}
                <div className="boxes-container">
                  <div className="box box1">
                    <div className="Hbox">{Count && <Count />}</div>
                    {List && <List />}
                  </div>
                  <div className="box box2">
                    <div className="box-content">{Pic && <Pic />}</div>
                  </div>
                  <div className="box box3">
                    <div className="Hbox">{Time && <Time />}</div>
                    {ZubSteps && <ZubSteps />}
                  </div>
                </div>
              </div>
            )
          )}
        </Content>
      </Layout>
    </>
  );
}
