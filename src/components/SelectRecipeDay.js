import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Tooltip, message, Drawer } from "antd";
import { EditTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { GlobalStateContext } from "../context/GlobalStateContext";
import { useFetchData } from "./FetchData";
import { EditName_Time_Count, EditPicture, EditZutaten, EditNewSteps } from "./GerichtEdit";

function RecipeCardBox({ user = { name: "dev", _id: "66b38186803417ea7bcad6f3" } }) {
  const { globalState, forceUpdate } = useContext(GlobalStateContext);
  const [visible, setVisible] = useState(false);
  const [foundItem, setFoundItem] = useState(null);

  const [NewGerichtStrings, setGerichtStrings] = useState({ name: "Gericht Name", zubereitungszeit: "", zutatenFuer: "" });
  const [NewStepsArr, setStepsArr] = useState([]);
  const [NewPicPath, setPicPath] = useState("");
  const [NewZutatenArr, setZutatenArr] = useState([]);

  const SelectRecipeForDay = async (recipe) => {
    try {
      const response = await fetch("/api/SelectedRecipeForDay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: globalState.selectedDate, recipeID: recipe._id, userID: user._id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      message.success(`Erfolgreich Gericht für ${globalState.selectedDate} ausgewählt`, 3);

      forceUpdate();
    } catch (error) {
      console.error("Error:", error);
      message.error(`Fehler beim Auswählen des Gerichts: ${error.message}`, 3);
    }
  };

  useEffect(() => {
    if (foundItem) {
      setPicPath(foundItem.bild);
      setGerichtStrings({ name: foundItem.name, zubereitungszeit: foundItem.zubereitungszeit, zutatenFuer: foundItem["Zutaten für"] })
      // Erstelle eine tiefe Kopie der Zutaten, um foundItem nicht zu verändern
      const zutatenCopy = JSON.parse(JSON.stringify(foundItem.zutaten));
      setZutatenArr(zutatenCopy);
    }
  }, [foundItem]);

  const OpenCard = (item) => {
    setFoundItem(globalState.data_catalog.find((i) => i._id === item._id));
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setFoundItem(null);
  };

  const hasChanges = (original, updated) => {
    // console.log("Original values:", original);
    // console.log("Name:", original.name);
    // console.log("Zubereitungszeit:", original.zubereitungszeit);
    // console.log("Zutaten für:", original["Zutaten für"]);
    // console.log("Bild:", original.bild);
    // console.log("Zubereitungsschritte:", original.zubereitungsschritte);
    // console.log("Zutaten:", original.zutaten);

    // console.log("Updated values:",updated);
    // console.log("Name:", updated.name);
    // console.log("Zubereitungszeit:", updated.zubereitungszeit);
    // console.log("Zutaten für:", updated["Zutaten für"]);
    // console.log("Bild:", updated.bild);
    // console.log("Zubereitungsschritte:", updated.zubereitungsschritte);
    // console.log("Zutaten:", updated.zutaten);
    return (
      original.name !== updated.name ||
      original.zubereitungszeit !== updated.zubereitungszeit ||
      original["Zutaten für"] !== updated["Zutaten für"] ||
      original.bild !== updated.bild ||
      JSON.stringify(original.zubereitungsschritte) !== JSON.stringify(updated.zubereitungsschritte) ||
      JSON.stringify(original.zutaten) !== JSON.stringify(updated.zutaten)
    );
  };

  const UploadEdit = async () => {
    
    if (
      NewGerichtStrings.name !== "" &&
      NewGerichtStrings.zubereitungszeit !== "" &&
      NewGerichtStrings.zutatenFuer !== "" &&
      NewPicPath !== "" &&
      NewZutatenArr.length !== 0 &&
      NewStepsArr.length !== 0
    ) {
      var ObjectToPush = {
        name: NewGerichtStrings.name,
        zubereitungszeit: NewGerichtStrings.zubereitungszeit,
        "Zutaten für": NewGerichtStrings.zutatenFuer,
        bild: String(NewPicPath),
        zubereitungsschritte: NewStepsArr,
        zutaten: NewZutatenArr,
      };
      if (hasChanges(foundItem, ObjectToPush)) {
        try {
          const response = await fetch(`/api/UpdateRecipe/${foundItem._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ObjectToPush),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Recipe updated with ID:", data.id);
            message.success("Recipe uploaded successfully!");

            // Clear form data
            setFoundItem(null);
            forceUpdate();
          } else {
            message.error("Failed to upload recipe");
            console.error("Failed to upload recipe:", response.statusText);
          }
        } catch (error) {
          console.error("Error while uploading recipe:", error);
          message.error("Error while uploading recipe");
        }
      } else {
        message.info("Keine Änderungen vorgenommen.");
      }
    } else {
      message.error("Alle Inputs müssen ausgefüllt sein");
    }
  };

  return (
    <>
      {foundItem && (
        <Drawer title={"Gericht Edit Drawer"} onClose={onClose} open={visible} placement="right" size="large">
          <div className="DrawerBox SubmitBtn">
            <Button onClick={UploadEdit}> Gericht Ändern </Button>
          </div>
          <div className="DrawerBox">
            <EditName_Time_Count foundItem={foundItem} value={NewGerichtStrings} setValue={setGerichtStrings} />
          </div>
          <div className="DrawerBox">
            <EditPicture foundItem={foundItem} value={NewPicPath} setValue={setPicPath} />
          </div>
          <div className="DrawerBox">
            <EditZutaten foundItem={foundItem} value={NewZutatenArr} setValue={setZutatenArr} />
          </div>
          <div className="DrawerBox">
            <EditNewSteps foundItem={foundItem} value={NewStepsArr} setValue={setStepsArr} />
          </div>
        </Drawer>
      )}
      <h3>No recipe selected for {globalState.selectedDate}. Please choose a recipe.</h3>
      <div className="CardBoxCollection">
        {globalState.data_catalog &&
          globalState.data_catalog.map((item, index) => (
            <Card
              style={{ width: "25%", textAlign: "center" }}
              cover={
                <div className="CardDivImg">
                  <img alt={item.name} src={item.bild} />
                </div>
              }
              key={index}
              actions={[
                <Button className="SelectBtn" style={{ marginBottom: "10px" }} onClick={() => SelectRecipeForDay(item)}>
                  Select Gericht
                </Button>,
                <Tooltip title="Edit Recipe">
                  <EditTwoTone key="edit" onClick={() => OpenCard(item)} />
                </Tooltip>,
                <Tooltip title="View Details">
                  <EllipsisOutlined key="ellipsis" />
                </Tooltip>,
              ]}
            >
              <div style={{ padding: "10px 0" }}>{item.name}</div>
            </Card>
          ))}
      </div>
    </>
  );
}

export { RecipeCardBox };
