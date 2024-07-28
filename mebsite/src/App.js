import React, {useState } from 'react';
import { Layout, Menu, Button, Checkbox,Pagination,Steps  } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './App.css';

import Mo from './components/days/Mo';
// import Di from './components/days/Di';
// import Mi from './components/days/Mi';
// import Do from './components/days/Do';
// import Fr from './components/days/Fr';
// import Sa from './components/days/Sa';
// import So from './components/days/So';

const { Header, Content } = Layout;

const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const dayComponents = [Mo];//, Di, Mi, Do, Fr, Sa, So];

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const changeColor = (index) => {
    setSelectedIndex(index);
  };
  const handlePrevClick = () => {
    setSelectedIndex((prevIndex) => 
      (prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : days.length - 1));
  };

  const handleNextClick = () => {
    setSelectedIndex((prevIndex) => 
      (prevIndex !== null && prevIndex < days.length - 1 ? prevIndex + 1 : 0));
  };

  const SelectedDayComponent = selectedIndex !== null ? dayComponents[selectedIndex] : null;
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="CreateRec"> Create new recipe</div>
        <h2 style={{color: "var(--MenuColor)"}}> Food planer </h2>
        <div className="Account"> Account</div>        
      </Header>
      <div className="week-selection">
        <Pagination className='WeekJumper'
          total={85}
          pageSize={1}
          responsive={false}
          showSizeChanger={false}
          simple={true}
        />
        <Button icon={<LeftOutlined />} className='LRButton' onClick={handlePrevClick} />
        <ul className='week-menu'>
          {days.map((day, index) => (
            <li
              key={index}
              onClick={() => changeColor(index)}
              className={selectedIndex === index ? 'selected' : ''}
            >
              {day}
            </li>
          ))}
        </ul>
        <Button icon={<RightOutlined />} className='LRButton' onClick={handleNextClick} />
      </div>
      <Content className="content">
        <div className="food-preview">
          <div className="food-details">
            <h1>Thai-Curry (Omnivore)</h1>
          </div>
          <div className="boxes-container">
            <div className="box box1">
              <div className='Hbox'>
                <h2>Zutaten (11 Stück)</h2> 
              </div>                            
              <div className="box-content2">
                <Checkbox className='ZutatenCheck'>
                  <div className="checkbox-content">
                    <span className='first-column'>75g</span>
                    <span className="second-column">Basmatireis</span>
                  </div>
                </Checkbox>
                <Checkbox className='ZutatenCheck'>
                  <div className="checkbox-content">
                    <span className='first-column'>125g</span>
                    <span className="second-column">Hähnchenbrustfilet</span>
                  </div>                  
                </Checkbox>
                <Checkbox className='ZutatenCheck'>
                  <div className="checkbox-content">
                    <span className='first-column'>2</span>
                    <span className="second-column">Frühlingszwiebeln</span>
                  </div>
                </Checkbox>
                <Checkbox className='ZutatenCheck'>
                  <div className="checkbox-content">
                    <span className='first-column'>0,5</span>
                    <span className="second-column">rote Paprika</span>
                  </div>
                </Checkbox>
                <Checkbox className='ZutatenCheck'>
                  <div className="checkbox-content">
                    <span className='first-column'>75g</span>
                    <span className="second-column">Basmatireis</span>
                  </div>
                </Checkbox>
              </div>
            </div>
            <div className="box box2">
              <div className='box-content'>
                <img className="food-image" alt='Food' src="https://img.chefkoch-cdn.de/rezepte/2589581406492572/bilder/1532344/crop-640x800/nudel-haehnchen-pfanne.jpg"/>
              </div>
            </div>
            <div className="box box3">
              <div className='Hbox'>
                <h2 className='Hbox'>Zubereitung (25 min)</h2>
              </div>             
              <div className="box-content2">
                {SelectedDayComponent && <SelectedDayComponent />}
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default App;



//<Image className="food-image" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>