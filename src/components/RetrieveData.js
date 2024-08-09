// src/components/days/Mo.js
import React from "react";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Steps, Checkbox, Button, message, Flex, Spin } from "antd";

function Head() {
  var rezept = GetData();
  if (!rezept) {
    return (
      <div className="food-details">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      </div>
    );
  }
  return (
    <div className="food-details">
      <h1>{rezept.name}</h1>
    </div>
  );
}

function ZubSteps(date = null) {
  const [current, setCurrent] = useState(0); //Hook muss immer ausgeführt werden sonst kommt fehler da sich die Hooks anzahl in verschieden Rendern ändert
  var rezept = GetData(date);
  if (!rezept) {
    return (
      <div className="box-content3">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      </div>
    );
  }
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  const items = rezept.zubereitungsschritte.map((item, index) => ({
    key: "Schritt " + String(index),
    title: "Schritt " + String(index),
    description: item,
  }));
  return (
    <>
      <div className="box-content3">
        <Steps direction="vertical" current={current} items={items} />
      </div>
      <div className="fixed-buttons">
        {current < items.length - 1 && ( //&& used in JSX for conditional rendering
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === items.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}

        <Button style={{ margin: "0" }} onClick={() => prev()}>
          Previous
        </Button>
      </div>
    </>
  );
}

function Pic() {
  var rezept = GetData();
  if (!rezept) {
    return (
      <div className="food-image">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 148 }} spin />} />
      </div>
    );
  }
  let imagePath = rezept.bild;
  return <img className="food-image" alt="Food" src={imagePath} />;
}

function List() {
  var rezept = GetData();
  if (!rezept) {
    return (
      <div className="box-content2">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 148 }} spin />} />
      </div>
    );
  }
  return (
    <div className="box-content2">
      {rezept.zutaten.map((item, index) => (
        <Checkbox className="ZutatenCheck" key={index}>
          <div className="checkbox-content">
            <span className="first-column">{item.menge}</span>
            <span className="second-column">{item.name}</span>
          </div>
        </Checkbox>
      ))}
    </div>
  );
}

function Count() {
  var rezept = GetData();
  if (!rezept) {
    return (
      <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 33 }} spin />} />
      </>
    );
  }

  return (
    <>
      <h2>Zutaten ({rezept.zutaten.length} Stück)</h2>
    </>
  );
}

function Time() {
  var rezept = GetData();
  if (!rezept) {
    return (
      <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 33 }} spin />} />
      </>
    );
  }

  return (
    <>
      <h2>Zubereitung ({rezept.zubreitungszeit}) </h2>
    </>
  );
}

function GetData(date = null) {
  const [rezept, setRezept] = useState(null);
  const [error, setError] = useState(null);
  const isServerAvailable = useServerStatus(5000); // Überprüfe den Serverstatus alle 5 Sekunden

  useEffect(() => {
    if (isServerAvailable) {
      fetch("/api/recipe").then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setRezept(data))
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(error.toString());
        });
    }
  }, [isServerAvailable]);

  return rezept;
}

function useServerStatus(pollingInterval = 5000) {
  const [isServerAvailable, setIsServerAvailable] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch("/api/health"); // Ein einfacher Health-Check-Endpunkt
        if (response.ok) {
          setIsServerAvailable(true);
        } else {
          setIsServerAvailable(false);
        }
      } catch (error) {
        setIsServerAvailable(false);
      }
    };

    const intervalId = setInterval(checkServerStatus, pollingInterval);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [pollingInterval]);

  return isServerAvailable;
}

function TestGetData(date = null) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const isServerAvailable = useServerStatus(5000); // Überprüfe den Serverstatus alle 5 Sekunden
  //useEffect runs on every render. That means that when the count changes, a render happens, which then triggers another effect.
  useEffect(() => {//Wird durch useEffect beim jedem Rendern ausgeführt und dannn ochmal alle 5000ms durch dependency value change isServerAvailable
    console.log(date);
    if (isServerAvailable) {
      const query = '?name=dev&date=09.07.2024';
      fetch(`/api/Test${query}`).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setUser(data))
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(error.toString());
        });
    }
  }, [isServerAvailable]); 

  return user;
}

function devLog(user){
  console.log(user);
}

function Devbtn(date=null){
  var user = TestGetData(date);
  if (!user) {
    return (
      <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 33 }} spin />} />
      </>
    );
  }

  return (
    <>
      <Button type="primary" onClick={() => devLog(user)}>Primary Button</Button>
    </>
  );
}

export { ZubSteps, List, Pic, Head, Count, Time, Devbtn };
