import React, { useContext, useEffect } from "react";
import { Button, Card, Tooltip, message } from "antd";
import { EditTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { GlobalStateContext } from '../context/GlobalStateContext';
import { useFetchData } from "./FetchData";

function RecipeCardBox({user={name:"dev",_id:"66b38186803417ea7bcad6f3"}}) {
  const { data: recipeCatalog, refetch } = useFetchData(`/api/GetRecipeCatalog`);
  const { globalState, forceUpdate } = useContext(GlobalStateContext);

  const SelectRecipeForDay = async (recipe) => {
    try {
      const response = await fetch("/api/SelectedRecipeForDay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({date: globalState.selectedDate, recipeID: recipe._id, userID: user._id}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }      
      message.success(`Erfolgreich Gericht für ${globalState.selectedDate} ausgewählt`, 3);

      forceUpdate()
    } catch(error) {
      console.error("Error:", error);
      message.error(`Fehler beim Auswählen des Gerichts: ${error.message}`, 3);
    }
  }
  return (
    <>
      {/* {contextHolder} */}
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
                  <EditTwoTone key="edit" />
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
