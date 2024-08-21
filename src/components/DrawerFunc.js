import React from "react";
import { useEffect, useState, useReducer } from "react";

import { Button, Input, Checkbox, Upload, message, Steps } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

function GerichtName({ value, setValue }) {
  const [tempGericht, setTempGericht] = useState("");

  const handleGerichtInputChange = (e) => {
    setTempGericht(e.target.value);
  };

  const handleSetGerichtInput = () => {
    if (tempGericht !== "") {
      setValue(tempGericht);
    }
  };

  return (
    <div className="Submit">
      <Input value={tempGericht} onChange={handleGerichtInputChange} placeholder="Gericht Name" />
      <Button onClick={handleSetGerichtInput}> Name festlegen </Button>
    </div>
  );
}

function NewList() {
  const [newZutatenInput, setZutInput] = useState("");
  const [newZutaten, setNewZutaten] = useState([]);

  const handleInputChange = (e) => {
    setZutInput(e.target.value);
  };

  const handleAddZutat = () => {
    if (newZutatenInput.trim() !== "") {
      setNewZutaten([...newZutaten, newZutatenInput]);
      message.success("Zutat hinzugefügt");
      setZutInput(""); // Clear input field
    }
  };
  return (
    <>
      <div className="NewZutaten">
        <h3> Zutaten </h3>
        {newZutaten.map((txt, index) => (
          <div className="NewZutatenContent">
            <Checkbox key={index}>{txt}</Checkbox>
            <Button> Delete </Button>
          </div>
        ))}
      </div>
      <div className="Submit">
        <Input value={newZutatenInput} onChange={handleInputChange} />
        <Button onClick={handleAddZutat}> Zutat hinzufügen </Button>
      </div>
    </>
  );
}

function NewSteps() {
  const [newAnweisungInput, setAnweisungInput] = useState("");

  const handleInputChange = (e) => {
    setAnweisungInput(e.target.value);
  };

  const handleAddAnweisung = () => {
    if (newAnweisungInput.trim() !== "") {
      setStepsArr([...StepsArr, newAnweisungInput]);
      message.success("Schritt hinzugefügt");
      setAnweisungInput(""); // Clear input field
    }
  };

  const [current, setCurrent] = useState(0);
  const [StepsArr, setStepsArr] = useState([]);

  const items = StepsArr.map((item, index) => ({
    key: "Schritt " + String(index),
    title: "Schritt " + String(index+1),
    description: item,
  }));

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <>
      <Steps direction="vertical" current={current} items={items} />
      <div className="Mockfixed-buttons">
        {current < items.length - 1 && ( //&& used in JSX for conditional rendering
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === items.length - 1 && (
          <Button type="primary" onClick={() => message.success("Processing complete!")}>
            Done
          </Button>
        )}
        {items.length === 0 && (
            <Button type="primary" onClick={() => message.error("Musst auch einen Schritt hinzufügen")}>
            Done
          </Button>
        )}

        <Button style={{ margin: "0" }} onClick={() => prev()}>
          Previous
        </Button>
      </div>
      <div className="Submit">
        <Input value={newAnweisungInput} onChange={handleInputChange} />
        <Button onClick={handleAddAnweisung}> Zutat hinzufügen </Button>
      </div>
    </>
  );
}

function NewPic() {
    const props = {
        name: "file",
        action: "/api/upload",
        listType: "picture",
        headers: {
          authorization: "authorization-text",
        },
        onChange(info) {
          if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        previewFile(file) {
            // Optional: Custom Preview Handler, hier kannst du die lokale Vorschau logik implementieren
            return Promise.resolve(URL.createObjectURL(file));
          },
      };
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
}

export { GerichtName, NewList, NewSteps,NewPic };
