import React from "react";
import { useEffect, useState, useReducer, useContext } from "react";
import { Button, Input, Image, Upload, message, Checkbox, Steps, Splitter } from "antd";
const { TextArea } = Input;
import { EditOutlined, EllipsisOutlined, SettingOutlined, CheckCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import "../App.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

function EditName_Time_Count({ foundItem, value, setValue }) {

  const handleGerichtInputChange = (e) => {
    const { id, value: NewValue } = e.target;
    if(id === "name") setValue({ name: NewValue, zubereitungszeit: foundItem.zubereitungszeit, zutatenFuer: foundItem["Zutaten für"] })
    else if(id === "zubereitungszeit") setValue({ name: foundItem.name, zubereitungszeit: NewValue, zutatenFuer: foundItem["Zutaten für"] })
    else if(id === "zutatenFuer") setValue({ name: foundItem.name, zubereitungszeit: foundItem.zubereitungszeit, zutatenFuer: NewValue })
  };

  return (
    <>
      <div className="Submit" style={{ marginTop: "0px" }}>
        <Input id={"name"} value={value.name} onChange={(e) => handleGerichtInputChange(e)} placeholder="Gericht Name" />
      </div>
      <div className="Submit">
        <Input id={"zubereitungszeit"} value={value.zubereitungszeit} onChange={(e) => handleGerichtInputChange(e)} placeholder="Zubereitungszeit" />
      </div>
      <div className="Submit">
        <Input id={"zutatenFuer"} value={value.zutatenFuer} onChange={(e) => handleGerichtInputChange(e)} placeholder="Zutaten für z.B. 2 Personen" />
      </div>
    </>
  );
}

function EditPicture({ foundItem, value, setValue  }) {
  const [uploadedImages, SetUploadedImages] = useState([
    {
      uid: "-1",
      name: foundItem.bild.split("/").pop(),
      status: "done",
      url: foundItem.bild,
    },
  ]);

  const handlebeforeUpload = (file) => {
    // Change the file name here
    const newFileName = `Preview_${Date.now()}${file.name.substring(file.name.lastIndexOf("."))}`;
    const newFile = new File([file], newFileName, { type: file.type });
    return newFile;
  };

  const handleChange = ({ fileList: newFileList }) => {
    SetUploadedImages(newFileList);
  };

  const handlePreview = async (file) => {
    setValue("/images/" + file.name)
  };

  return (
    <>
      <Splitter
        style={{
          height: 200,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          height: "auto",
        }}
      >
        <Splitter.Panel defaultSize="50%" min="20%" max="70%" style={{ overflowY: "hidden" }}>
          <Image src={value == null ? value.bild : value} />
        </Splitter.Panel>
        <Splitter.Panel>
          <Upload
            className="EditPicUpload"
            action="/api/upload"
            beforeUpload={handlebeforeUpload}
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
            fileList={uploadedImages}
          >
            {uploadedImages.length >= 4 ? null : (
              <button type="button" className="EditPicUploadBtn">
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            )}
          </Upload>
        </Splitter.Panel>
      </Splitter>
    </>
  );
}

function EditZutaten({ foundItem, value, setValue  }) {
  const [EditIndex, setEditIndex] = useState(null);
  const [EditBtnText, setEditBtnText] = useState("Anpassen");

  // useEffect(() => {
  //   if (foundItem) {
  //     setValue(foundItem.zutaten);
  //   }
  // }, [foundItem]);

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
    const newValue = value.filter((_, i) => i !== index);
    setValue(newValue);
    message.warning("Zutat gelöscht");
  };

  const handleInputChange = (e, index) => {
    const { id, value: newValue } = e.target;
    const updatedZutaten = [...value];
    console.log("updatedZutaten ", updatedZutaten)
    if (id === "menge") {
      updatedZutaten[index].menge = newValue;
    } else if (id === "name") {
      updatedZutaten[index].name = newValue;
    }

    setValue(updatedZutaten);
  };

  return (
    <>
      <div className="NewZutaten">
        <h3> Zutaten </h3>
        {value &&
          value.map((txt, index) => (
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

function EditNewSteps({ foundItem, value, setValue  }) {
  const [EditIndex, setEditIndex] = useState(null);
  const [EditBtnText, setEditBtnText] = useState("Anpassen");
  const [newAnweisungInput, setAnweisungInput] = useState("");

  useEffect(() => {
    if (foundItem) {
      setValue(foundItem.zubereitungsschritte || []);
      
    }
  }, [foundItem]);

  const handleInputChange = (e, index) => {
    const { value: newValue } = e.target;
    const updatedSteps  = [...value];

    updatedSteps [index] = newValue;

    setValue(updatedSteps);
  };

  const handleNewStepInputChange = (e) => {
    setAnweisungInput(e.target.value);
  };

  const handleAddAnweisung = () => {
    if (newAnweisungInput.trim() !== "") {
      setValue([...value, newAnweisungInput]);
      message.success("Schritt hinzugefügt");
      setAnweisungInput(""); // Clear input field
    }
  };

  const [current, setCurrent] = useState(0);

  const items = value.map((item, index) => ({
    key: "Schritt " + String(index),
    title: "Schritt " + String(index + 1),
    description: (
      <div className="ChangeStepsContent">
        {EditIndex !== index ? (
          <span style={{ display: "inherit", width: "50vw" }}>{item}</span>
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
              style={{ width: "100%" }}
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

  const handleDelete = (index) => {
    const newValue = value.filter((_, i) => i !== index);
    setValue(newValue);
    message.warning("Schritt gelöscht");
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
      <div className="Submit">
        <Input value={newAnweisungInput} onChange={handleNewStepInputChange} />
        <Button onClick={handleAddAnweisung}> Anweisung hinzufügen </Button>
      </div>
    </>
  );
}

export { EditName_Time_Count, EditPicture, EditZutaten, EditNewSteps };
