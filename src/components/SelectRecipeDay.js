import React from "react";
import { useEffect, useState, useReducer } from "react";
import { Button, DatePicker, Drawer, Input, Checkbox, Upload, message, Steps, Card, Avatar, Tooltip } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, CheckCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { useFetchData } from "./FetchData";

dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

function RecipeCardBox({date = "", user={name:"dev",_id:"66b38186803417ea7bcad6f3"}}) { //Default userID is from dev user
  const { data: recipeCatalog, error, isServerAvailable, isLoading, refetch } = useFetchData(`/api/GetRecipeCatalog`);
  
  const handleRefresh = () => {
    refetch();
  };

  const SelectRecipeForDay = async (recipe) => {
    console.log(recipe._id);
    try {
      const response = await fetch("/api/SelectedRecipeForDay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({date, recipeID: recipe._id, userID: user._id}),

      });
      message.success("Erfolgreich Gericht für", {date}, "ausgewählt");
    } catch(error) {
      console.log("Error");
    }
    handleRefresh();
  }

  return (
    <>
      <h3>No recipe selected for {date.date}. Please choose a recipe.</h3>
      <div className="CardBoxCollection">
        {recipeCatalog &&
          recipeCatalog.map((item, index) => (
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
                  {" "}
                  Select Gericht{" "}
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
