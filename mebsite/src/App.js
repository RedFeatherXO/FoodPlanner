import React, { useState } from "react";
import { Layout, Button, Pagination } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./App.css";

import { MoSteps, MoList, MoPic, MoHead } from "./components/days/Mo";
// import Di from './components/days/Di';
// import Mi from './components/days/Mi';
// import Do from './components/days/Do';
// import Fr from './components/days/Fr';
// import Sa from './components/days/Sa';
// import So from './components/days/So';

const { Header, Content } = Layout;

const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const dayComponentsSteps = [MoSteps]; //, Di, Mi, Do, Fr, Sa, So];
const dayComponentsLists = [MoList];
const dayComponentsPics = [MoPic];
const dayComponentsHeads = [MoHead];

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const changeColor = (index) => {
    setSelectedIndex(index);
  };
  const handlePrevClick = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : days.length - 1
    );
  };

  const handleNextClick = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex !== null && prevIndex < days.length - 1 ? prevIndex + 1 : 0
    );
  };

  const SelectedDayComponent =
    selectedIndex !== null ? dayComponentsSteps[selectedIndex] : null;
  const SelectedDayComponentList =
    selectedIndex !== null ? dayComponentsLists[selectedIndex] : null;
  const SelectedDayComponentPic =
    selectedIndex !== null ? dayComponentsPics[selectedIndex] : null;
  const SelectedDayComponentHead =
    selectedIndex !== null ? dayComponentsHeads[selectedIndex] : null;
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="CreateRec"> Create new recipe</div>
        <h2 style={{ color: "var(--MenuColor)" }}> Food planer </h2>
        <div className="Account"> Account</div>
      </Header>
      <div className="week-selection">
        <Pagination
          className="WeekJumper"
          total={85}
          pageSize={1}
          responsive={false}
          showSizeChanger={false}
          simple={true}
        />
        <Button
          icon={<LeftOutlined />}
          className="LRButton"
          onClick={handlePrevClick}
        />
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
        <Button
          icon={<RightOutlined />}
          className="LRButton"
          onClick={handleNextClick}
        />
      </div>
      <Content className="content">
        <div className="food-preview">
          {SelectedDayComponentHead && <SelectedDayComponentHead />}
          <div className="boxes-container">
            <div className="box box1">
              <div className="Hbox">
                <h2>Zutaten (11 Stück)</h2>
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
                <h2>Zubereitung (25 min) </h2>
              </div>
              {SelectedDayComponent && <SelectedDayComponent />}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default App;

//<Image className="food-image" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
