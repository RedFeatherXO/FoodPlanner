// src/components/days/Mo.js
import React from "react";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Steps, Checkbox, Button, message, Flex, Spin } from "antd";

function MoHead() {
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

function MoSteps() {
  const [current, setCurrent] = useState(0); //Hook muss immer ausgeführt werden sonst kommt fehler da sich die Hooks anzahl in verschieden Rendern ändert
  var rezept = GetData();
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

function MoPic() {
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

function MoList() {
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

function MoCount() {
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

function MoTime() {
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

function GetData() {
  const [rezept, setRezept] = useState(null);
  const [error, setError] = useState(null);
  const isServerAvailable = useServerStatus(5000); // Überprüfe den Serverstatus alle 5 Sekunden

  useEffect(() => {
    if (isServerAvailable) {
      fetch("/api/recipe")
        .then((response) => {
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

export { MoSteps, MoList, MoPic, MoHead, MoCount, MoTime };
