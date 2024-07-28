// src/components/days/Mo.js
import React from "react";
import { Steps, Checkbox } from "antd";

const MoSteps = () => {
  return (
    <Steps
      direction="vertical"
      current={0}
      items={[
        {
          title: "In Progress",
          // description: 'dwd',
          description:
            "300 ml Wasser im Wasserkocher aufkochen, in einen Topf umfüllen, 0,25 TL Salz zugeben und erneut aufkochen. Reis nach Packungsanweisung ca. 15 Min. zugedeckt darin garen. Inzwischen das Fleisch trocken tupfen, erst in ca. 3 cm dicke Scheiben, dann in ca. 3 cm gro-ße Würfel schneiden. Frühlingszwiebeln putzen, waschen und mit Grün schräg in ca. 3 cm große Stücke schneiden. Paprika waschen, vierteln, putzen und in mundgerechte Streifen schneiden.",
        },
        {
          title: "Next",
          description:
            "Eine Pfanne mit 1 EL Öl erhitzen, Fleisch ca. 3 Min. darin anbraten. Herausnehmen und übriges Öl 1 EL darin erhitzen, die Paprika ca. 1 Min. darin braten. Currypaste einrühren, ca. 5 Sek. mitbraten, dann Fleisch und Kokosmilch zugeben. Aufkochen lassen, die Frühlingszwiebeln zugeben und ca. 4 Min. bei schwacher Hitze köcheln. Mit der Sojasauce und dem Limettensaft abschmecken. Koriander waschen und trocken schütteln, Blättchen abzupfen, klein hacken und über das Thai-Curry streuen. Mit dem Reis servieren.",
        },
        {
          title: "rafas",
          // description: 'dwd',
          description:
            "300 ml Wasser im Wasserkocher aufkochen, in einen Topf umfüllen, 0,25 TL Salz zugeben und erneut aufkochen. Reis nach Packungsanweisung ca. 15 Min. zugedeckt darin garen. Inzwischen das Fleisch trocken tupfen, erst in ca. 3 cm dicke Scheiben, dann in ca. 3 cm gro-ße Würfel schneiden. Frühlingszwiebeln putzen, waschen und mit Grün schräg in ca. 3 cm große Stücke schneiden. Paprika waschen, vierteln, putzen und in mundgerechte Streifen schneiden.",
        },
        {
          title: "Ifwas",
          description:
            "Eine Pfanne mit 1 EL Öl erhitzen, Fleisch ca. 3 Min. darin anbraten. Herausnehmen und übriges Öl 1 EL darin erhitzen, die Paprika ca. 1 Min. darin braten. Currypaste einrühren, ca. 5 Sek. mitbraten, dann Fleisch und Kokosmilch zugeben. Aufkochen lassen, die Frühlingszwiebeln zugeben und ca. 4 Min. bei schwacher Hitze köcheln. Mit der Sojasauce und dem Limettensaft abschmecken. Koriander waschen und trocken schütteln, Blättchen abzupfen, klein hacken und über das Thai-Curry streuen. Mit dem Reis servieren.",
        },
      ]}
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
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
        </div>
      </Checkbox>
      <Checkbox className="ZutatenCheck">
        <div className="checkbox-content">
          <span className="first-column">½ Bund</span>
          <span className="second-column">Koriandergrün</span>
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
export { MoSteps, MoList };
