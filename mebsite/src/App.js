import React from 'react';
import { Layout, Menu, Button, Checkbox} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './App.css';

const { Header, Content } = Layout;

const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

function App() {
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="CreateRec"> Create new recipe</div>
        <h2 style={{color: "white"}}> Food planer </h2>
        <div className="Account"> Account</div>        
      </Header>
      <div className="week-selection">
        <Button icon={<LeftOutlined />} className='LRButton' />
        <Menu mode="horizontal" defaultSelectedKeys={['1']} className="week-menu">
          {days.map((day, index) => (
            <Menu.Item key={index + 1} className="week-menu-item">{day}</Menu.Item>
          ))}
        </Menu>
        <Button icon={<RightOutlined />} className='LRButton'/>
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
              <div className="box-content">
                
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