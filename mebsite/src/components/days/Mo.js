// src/components/days/Mo.js
import React, { useState } from "react";
import { Steps, Checkbox, Button, message } from "antd";

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

const MoHead = () => {
  return (
    <div className="food-details">
      <h1>Thai-Curry (Omnivore)</h1>
    </div>
  );
};

const MoSteps = () => {
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
};

const MoPic = () => {
  return (
    <img
      className="food-image"
      alt="Food"
      src="https://imgs.search.brave.com/JaLw0ucv8iTF8twxsIf7I25IuKvvBM6b358vpVoHqJA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aGVm/bGF2b3Vyc29ma2l0/Y2hlbi5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDgv/VGhhaS1SZWQtQ3Vy/cnktMS01MDB4NzUw/LmpwZw"
    />
  );
};

const MoList = () => {
  return (
    <div className="box-content2">
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">75g</span>
          <span className="second-column">Basmatireis</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">125g</span>
          <span className="second-column">Hähnchenbrustfilet</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">2</span>
          <span className="second-column">Frühlingszwiebeln</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">0,5</span>
          <span className="second-column">rote Paprika</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">1 EL</span>
          <span className="second-column">Sonnenblumenöl</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">0,5 EL</span>
          <span className="second-column">rote Thai-Currypaste</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">1 Dose</span>
          <span className="second-column">Kokosmilch</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">0,5 EL</span>
          <span className="second-column">Sojasauce</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">0,5 EL</span>
          <span className="second-column">Limettensaft</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
        </div>
      </Checkbox>
    </div>
  );
};
export { MoSteps, MoList, MoPic, MoHead };
