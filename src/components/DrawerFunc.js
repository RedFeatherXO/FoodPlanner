import React from "react";
import { useEffect, useState, useReducer } from "react";

import { Button, Input, Checkbox, Upload, message, Steps } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

function GerichtStrings({ value, setValue }) {
  const [tempGerichtStrings, setTempGerichtStrings] = useState({ name: "", zeit: "", Zutaten_für: "" });

  const handleGerichtInputChange = (e) => {
    switch (e.target.id) {
      case "name":
        setTempGerichtStrings({ name: e.target.value, zeit: tempGerichtStrings.zeit, Zutaten_für: tempGerichtStrings.Zutaten_für });
        break;
      case "zeit":
        setTempGerichtStrings({ name: tempGerichtStrings.name, zeit: e.target.value, Zutaten_für: tempGerichtStrings.Zutaten_für });
        break;
      case "zutaten_fuer":
        setTempGerichtStrings({ name: tempGerichtStrings.name, zeit: tempGerichtStrings.zeit, Zutaten_für: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleSetGerichtInput = () => {
    if (tempGerichtStrings.name === "" && tempGerichtStrings.zeit === "" && tempGerichtStrings.Zutaten_für === "") {
      message.warning("Inputs sind leer");
    }
    setValue(tempGerichtStrings);
  };

  return (
    <>
      <div className="Submit" style={{ marginTop: "0px"}}>
        <Input id={"name"} value={tempGerichtStrings.name} onChange={handleGerichtInputChange} placeholder="Gericht Name" />
        <Button onClick={handleSetGerichtInput}> Festlegen </Button>
      </div>
      <div className="Submit">
        <Input id={"zeit"} value={tempGerichtStrings.zeit} onChange={handleGerichtInputChange} placeholder="Zubereitungszeit" />
        <Button onClick={handleSetGerichtInput}> Festlegen </Button>
      </div>
      <div className="Submit">
        <Input id={"zutaten_fuer"} value={tempGerichtStrings.Zutaten_für} onChange={handleGerichtInputChange} placeholder="Zutaten für z.B. 2 Personen" />
        <Button onClick={handleSetGerichtInput}> Festlegen </Button>
      </div>
    </>
  );
}

function NewList({ value, setValue }) {
  const [newZutatenInput, setZutInput] = useState({ menge: "", name: "" });

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "menge":
        setZutInput({ menge: e.target.value, name: newZutatenInput.name });
        break;
      case "name":
        setZutInput({ menge: newZutatenInput.menge, name: e.target.value });
        break;
      default:
        break;
    }
    console.log(e);
    // setZutInput(e.target.value);
  };

  const handleAddZutat = () => {
    if (newZutatenInput.menge.trim() !== "" && newZutatenInput.name.trim() !== "") {
      setValue([...value, newZutatenInput]);
      message.success("Zutat hinzugefügt");
      setZutInput({ menge: "", name: "" }); // Clear input field
    }
  };

  const handleDelete = (index) => {
    const newValue = value.filter((_, i) => i !== index);
    setValue(newValue);
    message.warning("Zutat gelöscht");
  };
  return (
    <>
      <div className="NewZutaten">
        <h3> Zutaten </h3>
        {value &&
          value.map((txt, index) => (
            <div key={index} className="NewZutatenContent">
              <Checkbox>{`${txt.menge} ${txt.name}`}</Checkbox>
              <Button id={index} onClick={() => handleDelete(index)}>
                {" "}
                Delete{" "}
              </Button>
            </div>
          ))}
      </div>
      <div className="Submit">
        <Input id={"menge"} value={newZutatenInput.menge} onChange={handleInputChange} placeholder="Menge" />
        <Input id={"name"} value={newZutatenInput.name} onChange={handleInputChange} placeholder="Name" />
        <Button onClick={handleAddZutat}> Zutat hinzufügen </Button>
      </div>
    </>
  );
}

function NewSteps({ value, setValue }) {
  const [newAnweisungInput, setAnweisungInput] = useState("");

  const handleInputChange = (e) => {
    setAnweisungInput(e.target.value);
  };

  const handleAddAnweisung = () => {
    if (newAnweisungInput.trim() !== "") {
      setValue([...value, newAnweisungInput]);
      message.success("Schritt hinzugefügt");
      setAnweisungInput(""); // Clear input field
    }
  };

  const handleDelete = (index) => {
    const newValue = value.filter((_, i) => i !== index);
    setValue(newValue);
    message.warning("Schritt gelöscht");
  };

  const [current, setCurrent] = useState(0);

  const items = value.map((item, index) => ({
    key: "Schritt " + String(index),
    title: "Schritt " + String(index + 1),
    description: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{item}</span>
        <Button onClick={() => handleDelete(index)}>Delete</Button>
      </div>
    ),
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
      <h3> Zubereitung </h3>
      <div className="newSteps">
        <Steps direction="vertical" current={current} items={items} />
      </div>
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
        {items.length === 0 && <> </>}

        {items.length !== 0 && (
          <Button style={{ margin: "0" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
      <div className="Submit">
        <Input value={newAnweisungInput} onChange={handleInputChange} />
        <Button onClick={handleAddAnweisung}> Anweisung hinzufügen </Button>
      </div>
    </>
  );
}

function NewPic({ value, setValue }) {
  const props = {
    name: "file",
    action: "/api/upload",
    listType: "picture",
    maxCount: 1,
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload(file) {
      // Change the file name here
      const newFileName = `Preview_${Date.now()}${file.name.substring(file.name.lastIndexOf("."))}`;
      const newFile = new File([file], newFileName, { type: file.type });
      // console.log("New file name:", newFile.name);
      return newFile;
    },
    onChange(info) {
      if (info.file.status === "done") {
        setValue("/images/" + info.file.name);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    showUploadList: true,
  };
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Vorschaubild hochladen</Button>
      </Upload>
    </>
  );
}

export { GerichtStrings, NewList, NewSteps, NewPic };
