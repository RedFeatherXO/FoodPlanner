import React from "react";
import { useEffect, useState, useReducer, useContext } from "react";
import { Button, Input, Image, Upload, message, Checkbox, Steps } from "antd";
const { TextArea } = Input;
import { EditOutlined, EllipsisOutlined, SettingOutlined, CheckCircleTwoTone, UploadOutlined } from "@ant-design/icons";
import "../App.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { GlobalStateContext } from "../context/GlobalStateContext.js";
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

function EditName_Time_Count({ _id }) {
  const { globalState, forceUpdate } = useContext(GlobalStateContext);
  const foundItem = globalState.data_catalog.find((item) => item._id === _id);

  const handleGerichtInputChange = () => {};

  const handleSetGerichtInput = () => {};

  return (
    <>
      <div className="Submit" style={{ marginTop: "0px" }}>
        <Input id={"name"} value={foundItem.name} onChange={handleGerichtInputChange} placeholder="Gericht Name" />
        <Button onClick={handleSetGerichtInput}> Festlegen </Button>
      </div>
      <div className="Submit">
        <Input id={"zeit"} value={foundItem.zubereitungszeit} onChange={handleGerichtInputChange} placeholder="Zubereitungszeit" />
        <Button onClick={handleSetGerichtInput}> Festlegen </Button>
      </div>
      <div className="Submit">
        <Input id={"zutaten_fuer"} value={foundItem["Zutaten für"]} onChange={handleGerichtInputChange} placeholder="Zutaten für z.B. 2 Personen" />
        <Button onClick={handleSetGerichtInput}> Festlegen </Button>
      </div>
    </>
  );
}

function EditPicture({ _id }) {
  const { globalState, forceUpdate } = useContext(GlobalStateContext);
  const [newImage, SetImage] = useState(null);
  const foundItem = globalState.data_catalog.find((item) => item._id === _id);

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
      return newFile;
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        SetImage("/images/" + info.file.name);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    showUploadList: true,
  };

  return (
    <>
      {!newImage ? <Image src={foundItem.bild} /> : <Image src={newImage} />}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Vorschaubild hochladen</Button>
      </Upload>
    </>
  );
}

function EditZutaten({ _id }) {
  const { globalState, forceUpdate } = useContext(GlobalStateContext);
  const foundItem = globalState.data_catalog.find((item) => item._id === _id);
  const [ChangedZutatenInput, setChangedZutInput] = useState(null);
  const [EditIndex, setEditIndex] = useState(null);
  const [EditBtnText, setEditBtnText] = useState("Anpassen");

  useEffect(() => {
    if (foundItem) {
      setChangedZutInput(foundItem.zutaten);
    }
  }, [foundItem]);

  const handleEdit = (index) => {
    if (EditBtnText == "Anpassen") {
      setEditIndex(index);
      setEditBtnText("Ok");
    } else if (EditBtnText == "Ok") {
      setEditIndex(null);
      setEditBtnText("Anpassen");
    }
  };

  const handleDelete = (index) => {
    const newValue = ChangedZutatenInput.filter((_, i) => i !== index);
    setChangedZutInput(newValue);
    message.warning("Zutat gelöscht");
  };

  const handleInputChange = (e, index) => {
    const { id, value } = e.target;
    const updatedZutaten = [...ChangedZutatenInput];

    if (id === "menge") {
      updatedZutaten[index].menge = value;
    } else if (id === "name") {
      updatedZutaten[index].name = value;
    }

    setChangedZutInput(updatedZutaten);
  };

  return (
    <>
      <div className="NewZutaten">
        <h3> Zutaten </h3>
        {ChangedZutatenInput &&
          ChangedZutatenInput.map((txt, index) => (
            <div key={index} className="ChangeZutatenContent">
              {EditIndex !== index ? (
                <div>
                  <Checkbox>{`${txt.menge} ${txt.name}`}</Checkbox>
                </div>
              ) : (
                <div style={{ display: "inherit" }}>
                  <Input id={"menge"} value={txt.menge} onChange={(e) => handleInputChange(e, index)} placeholder="Menge" />
                  <Input id={"name"} value={txt.name} onChange={(e) => handleInputChange(e, index)} placeholder="Name" />
                </div>
              )}

              <div>
                <Button id={index} onClick={() => handleEdit(index)}>
                  {EditIndex === index ? "Ok" : "Anpassen"}
                </Button>
                <Button id={index + 1} onClick={() => handleDelete(index)}>
                  Löschen
                </Button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

function EditNewSteps({ _id }) {
  const { globalState, forceUpdate } = useContext(GlobalStateContext);
  const foundItem = globalState.data_catalog.find((item) => item._id === _id);
  const [ChangedStepsInput, setChangedStepsInput] = useState([]);
  const [EditIndex, setEditIndex] = useState(null);
  const [EditBtnText, setEditBtnText] = useState("Anpassen");

  useEffect(() => {
    if (foundItem) {
      setChangedStepsInput(foundItem.zubereitungsschritte || []);
    }
  }, [foundItem]);

  const handleInputChange = (e, index) => {
    const { id, value } = e.target;
    const updatedZutaten = [...ChangedStepsInput];

    updatedZutaten[index] = value;

    setChangedStepsInput(updatedZutaten);
  };

  const [current, setCurrent] = useState(0);

  const items = ChangedStepsInput.map((item, index) => ({
    key: "Schritt " + String(index),
    title: "Schritt " + String(index + 1),
    description: (
      <div className="ChangeStepsContent">
        {EditIndex !== index ? (
          <span style={{ display: "inherit" }}>{item}</span>
        ) : (
          // <div>
          //   <Input id={"Step" + index} value={item} onChange={(e) => handleInputChange(e, index)} placeholder="Schritt Erklärung" style={{ width: "100%"}} />
          // </div>
          <div>
            <TextArea
              id={"Step" + index}
              value={item}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Schritt Erklärung"
              autoSize={{ minRows: 3, maxRows: 5 }}
              style={{ width: "100%"}}
            />
          </div>
        )}
        <div className="ChangedStepsButton">
          <Button id={index} onClick={() => handleEdit(index)}>
            {EditIndex === index ? "Ok" : "Anpassen"}
          </Button>
          <Button id={index + 1} onClick={() => handleDelete(index)}>
            Löschen
          </Button>
        </div>
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

  const handleEdit = (index) => {
    if (EditBtnText == "Anpassen") {
      setEditIndex(index);
      setEditBtnText("Ok");
    } else if (EditBtnText == "Ok") {
      setEditIndex(null);
      setEditBtnText("Anpassen");
    }
  };

  return (
    <>
      <h3> Zubereitung </h3>
      <div className="ChangedSteps">
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
      {/* <div className="Submit">
        <Input value={newAnweisungInput} onChange={handleInputChange} />
        <Button onClick={handleAddAnweisung}> Anweisung hinzufügen </Button>
      </div> */}
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

export { EditName_Time_Count, EditPicture, EditZutaten, EditNewSteps };
