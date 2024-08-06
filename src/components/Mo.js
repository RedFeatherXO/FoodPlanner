// src/components/days/Mo.js
import React from "react";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Steps, Checkbox, Button, message, Flex, Spin } from "antd";

const steps = [
  {
    title: "Schritt 1",
    description:
      "300 ml Wasser im Wasserkocher aufkochen, in einen Topf umfüllen, 0,25 TL Salz zugeben und erneut aufkochen. Reis nach Packungsanweisung ca. 15 Min. zugedeckt darin garen. Inzwischen das Fleisch trocken tupfen, erst in ca. 3 cm dicke Scheiben, dann in ca. 3 cm große Würfel schneiden. Frühlingszwiebeln putzen, waschen und mit Grün schräg in ca. 3 cm große Stücke schneiden. Paprika waschen, vierteln, putzen und in mundgerechte Streifen schneiden.",
  },
  {
    title: "Schritt 2",
    description:
      "Eine Pfanne mit 1 EL Öl erhitzen, Fleisch ca. 3 Min. darin anbraten. Herausnehmen und übriges Öl 1 EL darin erhitzen, die Paprika ca. 1 Min. darin braten. Currypaste einrühren, ca. 5 Sek. mitbraten, dann Fleisch und Kokosmilch zugeben. Aufkochen lassen, die Frühlingszwiebeln zugeben und ca. 4 Min. bei schwacher Hitze köcheln. Mit der Sojasauce und dem Limettensaft abschmecken. Koriander waschen und trocken schütteln, Blättchen abzupfen, klein hacken und über das Thai-Curry streuen. Mit dem Reis servieren.",
  },
  {
    title: "Schritt 2",
    description:
      "Eine Pfanne mit 1 EL Öl erhitzen, Fleisch ca. 3 Min. darin anbraten. Herausnehmen und übriges Öl 1 EL darin erhitzen, die Paprika ca. 1 Min. darin braten. Currypaste einrühren, ca. 5 Sek. mitbraten, dann Fleisch und Kokosmilch zugeben. Aufkochen lassen, die Frühlingszwiebeln zugeben und ca. 4 Min. bei schwacher Hitze köcheln. Mit der Sojasauce und dem Limettensaft abschmecken. Koriander waschen und trocken schütteln, Blättchen abzupfen, klein hacken und über das Thai-Curry streuen. Mit dem Reis servieren.",
  },
  {
    title: "Schritt 2",
    description:
      "Eine Pfanne mit 1 EL Öl erhitzen, Fleisch ca. 3 Min. darin anbraten. Herausnehmen und übriges Öl 1 EL darin erhitzen, die Paprika ca. 1 Min. darin braten. Currypaste einrühren, ca. 5 Sek. mitbraten, dann Fleisch und Kokosmilch zugeben. Aufkochen lassen, die Frühlingszwiebeln zugeben und ca. 4 Min. bei schwacher Hitze köcheln. Mit der Sojasauce und dem Limettensaft abschmecken. Koriander waschen und trocken schütteln, Blättchen abzupfen, klein hacken und über das Thai-Curry streuen. Mit dem Reis servieren.",
  },
];

function MoHead() {
  return (
    <div className="food-details">
      <h1>Thai-Curry (Omnivore)</h1>
    </div>
  );
}

function MoSteps() {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));
  return (
    <>
      <div className="box-content3">
        <Steps direction="vertical" current={current} items={items} />
      </div>
      <div className="fixed-buttons">
        {current < steps.length - 1 && ( //&& used in JSX for conditional rendering
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}

        <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
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
  return (
    <img
      className="food-image"
      alt="Food"
      src={rezept.name}
    />
  );
}

function MoList() {
  var rezept = GetData();
  if (!rezept) {
    return (
      <div className="box-content2-spin">
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

function GetData() {
  const [rezept, setRezept] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);
  return rezept;
}

export { MoSteps, MoList, MoPic, MoHead };
