import React from "react";
import { useEffect, useState, useReducer } from "react";
import { Layout, Button, DatePicker, Drawer, Input, Checkbox, Upload, message, Steps, Card, Avatar, Tooltip } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, CheckCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import "../App.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { GerichtStrings, NewList, NewSteps, NewPic } from "./DrawerFunc.js";
import { useFetchData } from "./FetchData";
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

export function UploadDrawer({open, setOpen}) {
  const { data: recipeCatalog, error, isServerAvailable, isLoading, refetch } = useFetchData(`/api/GetRecipeCatalog`);
  const [NewGerichtStrings, setGerichtStrings] = useState({ name: "Gericht Name", zeit: "", Zutaten_für: "" });
  const [NewStepsArr, setStepsArr] = useState([]);
  const [NewPicPath, setPicPath] = useState("");
  const [NewZutatenArr, setZutatenArr] = useState([]);

  const onClose = () => {
    setOpen(false);
  };
  
  const handleNewGerichtUpload = async () => {
    // Upload new Gericht to MongoDb
    if (
      NewGerichtStrings.name !== "" &&
      NewGerichtStrings.zeit !== "" &&
      NewGerichtStrings.Zutaten_für !== "" &&
      NewPicPath !== "" &&
      NewZutatenArr.length !== 0 &&
      NewStepsArr.length !== 0
    ) {
      var ObjectToPush = {
        name: NewGerichtStrings.name,
        zubereitungszeit: NewGerichtStrings.zeit,
        "Zutaten für": NewGerichtStrings.Zutaten_für,
        bild: String(NewPicPath),
        zubereitungsschritte: NewStepsArr,
        zutaten: NewZutatenArr,
      };
      try {
        const response = await fetch("/api/recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ObjectToPush),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Recipe inserted with ID:", data.id);
          message.success("Recipe uploaded successfully!");
          
          // Clear form data
          setGerichtStrings({ name: "", zeit: "", Zutaten_für: "" });
          setPicPath("");
          setStepsArr([]);
          setZutatenArr([]);
          refetch();
        } else {
          message.error("Failed to upload recipe");
          console.error("Failed to upload recipe:", response.statusText);
        }
      } catch (error) {
        console.error("Error while uploading recipe:", error);
        message.error("Error while uploading recipe");
      }
    } else {
      message.error("Alle Inputs müssen ausgefüllt sein");
    }
  };
  
  return (
    <Drawer title={NewGerichtStrings.name} onClose={onClose} open={open} placement="left" size="large">
      {/* State lifting from DrawerFunc.js */}
      <div className="DrawerBox">
        <GerichtStrings value={NewGerichtStrings} setValue={setGerichtStrings} />
      </div>
      <div className="DrawerBox">
        <NewPic value={NewPicPath} setValue={setPicPath} />
      </div>
      <div className="DrawerBox">
        <NewList value={NewZutatenArr} setValue={setZutatenArr} />
      </div>
      <div className="DrawerBox">
        <NewSteps value={NewStepsArr} setValue={setStepsArr} />
      </div>
      <Button className="SubmitUpload" type="primary" onClick={() => handleNewGerichtUpload()}>
        Upload Gericht zur Datenbank
      </Button>
    </Drawer>
  );
}
