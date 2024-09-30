// src/components/days/Mo.js
import React from "react";
import { useContext, useEffect, useState, useReducer } from "react";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import { Steps, Checkbox, Button, message, Flex, Spin, Skeleton, Modal } from "antd";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { useFetchData } from "./FetchData";
import { GlobalStateContext } from "../context/GlobalStateContext";

dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

function Head({ name = "dev" }) {
  const [HeadText, setHeadText] = useState("-");
  const { globalState, forceUpdate } = useContext(GlobalStateContext);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Willst du das Rezept für diesen Tag Löschen?");
  const showModal = () => {
    setOpen(true);
  };

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(globalState.selectedDate).format("YYYY-MM-DD");
  }

  const handleOk = async () => {
    setModalText("Willst du das Rezept für diesen Tag Löschen?");
    setConfirmLoading(true);
    try {
      const recipe_id = globalState.data_choosen.ausgewählteRezepte.find(CheckforDate) ? globalState.data_choosen.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
      if (recipe_id != null) {
        const response = await fetch(`/api/DeleteRecipe/${recipe_id}/${globalState.selectedDate}`, { method: "DELETE" });

        if (response.ok) {
          // console.log("Rezept erfolgreich gelöscht");
          forceUpdate();
        } else {
          console.error("Fehler beim Löschen des Rezepts: ", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error while deleting: ", error);
    }
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2500);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    if (globalState.data_choosen) {
      if (globalState.data_choosen.ausgewählteRezepte) {
        // Condition ? trueAns : falseAns
        var _id = globalState.data_choosen.ausgewählteRezepte.find(CheckforDate) ? globalState.data_choosen.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const rez = globalState.data_catalog.find((e) => e._id == _id);
          setHeadText(rez.name);
          // console.log(rez);
        } else {
          setHeadText("Kein Gericht für diesen Tag");
        }
      } else {
        setHeadText("Kein Gericht für diesen Tag");
      }
    }
  }, [globalState.selectedDate, globalState.data_choosen]);

  if (!globalState.data_choosen) {
    return (
      <div className="food-details">
        {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} /> */}
        {/* <Skeleton value="small" active style={{ height: '1px' }}/> */}
        <Skeleton.Input active size="large" shape="square" />
      </div>
    );
  }
  return (
    <div className="food-details boxes-container">
      <div className="box_Head"></div>
      <div className="box_Head">
        <h1>{HeadText}</h1>
      </div>
      <div className="box_Head box_delete">
        <Button shape="circle" icon={<DeleteOutlined />} size="large" onClick={showModal}></Button>
        <Modal
          title="Löschen vom Rezept"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okButtonProps={{
            danger: true,
          }}
        >
          <p>{modalText}</p>
        </Modal>
      </div>
    </div>
  );
}

function ZubSteps({ name = "dev" }) {
  const [current, setCurrent] = useState(0); //Hook muss immer ausgeführt werden sonst kommt fehler da sich die Hooks anzahl in verschieden Rendern ändert
  const [StepsArr, setStepsArr] = useState(["-"]);
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const { globalState } = useContext(GlobalStateContext);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(globalState.selectedDate).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (globalState.data_choosen) {
      if (globalState.data_choosen.ausgewählteRezepte) {
        // Condition ? trueAns : falseAns
        var _id = globalState.data_choosen.ausgewählteRezepte.find(CheckforDate) ? globalState.data_choosen.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const rez = globalState.data_catalog.find((e) => e._id == _id);
          setStepsArr(rez.zubereitungsschritte);
        } else {
          setStepsArr(["-"]);
        }
      }
    }
  }, [globalState.data_choosen, globalState.selectedDate]);

  if (!globalState.data_choosen) {
    return (
      <div className="box-content3">
        {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} /> */}
        <Skeleton value="small" active />
      </div>
    );
  }
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  const items = StepsArr.map((item, index) => ({
    key: "Schritt " + String(index),
    title: "Schritt " + String(index),
    description: item,
  }));
  return (
    <>
      <div className="box-content3">
        <Steps direction="vertical" current={current} items={items} />
      </div>
      <div className="fixed-buttons">
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

        <Button style={{ margin: "0" }} onClick={() => prev()}>
          Previous
        </Button>
      </div>
    </>
  );
}

function Pic({ name = "dev" }) {
  const [bildUrl, setbildUrl] = useState("/images/Placeholder2.webp");
  const { globalState } = useContext(GlobalStateContext);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(globalState.selectedDate).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (globalState.data_choosen) {
      if (globalState.data_choosen.ausgewählteRezepte) {
        // Condition ? trueAns : falseAns
        var _id = globalState.data_choosen.ausgewählteRezepte.find(CheckforDate) ? globalState.data_choosen.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const rez = globalState.data_catalog.find((e) => e._id == _id);
          setbildUrl(rez.bild);
        }
      }
    }
  }, [globalState.data_choosen, globalState.selectedDate]);

  if (!globalState.data_choosen) {
    return (
      <div className="food-image">
        {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 148 }} spin />} /> */}
        <Skeleton.Avatar active size="large" />
      </div>
    );
  }
  let imagePath = bildUrl;
  return <img className="food-image" alt="Food" src={imagePath} />;
}

function List({ name = "dev" }) {
  const [ListArr, setListArr] = useState([{ menge: "-", name: "-" }]);
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const { globalState } = useContext(GlobalStateContext);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(globalState.selectedDate).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (globalState.data_choosen) {
      if (globalState.data_choosen.ausgewählteRezepte) {
        // Condition ? trueAns : falseAns
        var _id = globalState.data_choosen.ausgewählteRezepte.find(CheckforDate) ? globalState.data_choosen.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const rez = globalState.data_catalog.find((e) => e._id == _id);
          setListArr(rez.zutaten);
        } else {
          setListArr([{ menge: "-", name: "-" }]);
        }
      }
    }
  }, [globalState.data_choosen, globalState.selectedDate]);

  if (!globalState.data_choosen) {
    return (
      <div className="box-content2">
        {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 148 }} spin />} /> */}
        <Skeleton value="small" active />
      </div>
    );
  }
  return (
    <div className="box-content2">
      {ListArr.map((item, index) => (
        <Checkbox className="ZutatenCheck" key={index}>
          <div className="checkbox-content">
            <span className="first-column">{item.menge}</span>
            <span className="second-column">{item.name}</span>
          </div>
        </Checkbox>
      ))}
    </div>
  );
}

function Count({ name = "dev" }) {
  const [CountText, setCountText] = useState("-- Stück");
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const { globalState } = useContext(GlobalStateContext);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(globalState.selectedDate).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (globalState.data_choosen) {
      if (globalState.data_choosen.ausgewählteRezepte) {
        // Condition ? trueAns : falseAns
        var _id = globalState.data_choosen.ausgewählteRezepte.find(CheckforDate) ? globalState.data_choosen.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const rez = globalState.data_catalog.find((e) => e._id == _id);
          setCountText(rez.zutaten.length);
        } else {
          setCountText("-- Stück");
        }
      }
    }
  }, [globalState.data_choosen, globalState.selectedDate]);

  if (!globalState.data_choosen) {
    return (
      <>
        {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 33 }} spin />} /> */}
        <Skeleton active />
      </>
    );
  }

  return (
    <>
      <h2>Zutaten ({CountText} Stück)</h2>
    </>
  );
}

function Time({ name = "dev" }) {
  const [TimeText, setTimeText] = useState("-- min");
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const { globalState } = useContext(GlobalStateContext);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(globalState.selectedDate).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (globalState.data_choosen) {
      if (globalState.data_choosen.ausgewählteRezepte) {
        // Condition ? trueAns : falseAns
        var _id = globalState.data_choosen.ausgewählteRezepte.find(CheckforDate) ? globalState.data_choosen.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const rez = globalState.data_catalog.find((e) => e._id == _id);
          setTimeText(rez.zubereitungszeit);
          // console.log(rez);
        } else {
          setTimeText("-- min");
        }
      }
    }
  }, [globalState.data_choosen, globalState.selectedDate]);

  if (!globalState.data_choosen) {
    return (
      <>
        {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 33 }} spin />} /> */}
        <Skeleton active />
      </>
    );
  }

  return (
    <>
      <h2>Zubereitung ({TimeText}) </h2>
    </>
  );
}

function Devbtn({ date = "2024-07-09", name = "dev", ServerInfo = null }) {
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const [ButtonText, setButtonText] = useState("Dev Test");
  // Verwende useFetchData einmal, um den Status zu überwachen und die Daten zu laden
  const { globalState } = useContext(GlobalStateContext);

  // useEffect(() => {
  //   if (globalState.isServerAvailable) {
  //     if (globalState.data_catalog)
  //       // console.log(user.name, "Server is available, data loaded:", user);
  //       console.log("Loaded data with: ", dayjs(globalState.selectedDate).format("YYYY-MM-DD"));
  //   }
  // }, [globalState.isServerAvailable, globalState.data_catalog, globalState.update]);

  const devLog = () => {
    console.log("Loaded data with: ", dayjs(globalState.selectedDate).format("YYYY-MM-DD"));
    console.log("isServerAvailable: ", globalState.isServerAvailable, " isRecipeAvailable: ", globalState.isRecipeAvailable);
    // var _id = user.ausgewählteRezepte.find(CheckforDate) ? user.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
    // if (_id) {
    //   const query = `?Recipe_id=${_id}`;
    //   const fetchRez = async () => {
    //     try {
    //       const response = await fetch(`/api/recipeTest${query}`);
    //       const rez = await response.json();
    //       setButtonText(rez.name);
    //       // console.log(rez);
    //     } catch (error) {
    //       console.error(error, "Query: ", query);
    //     }
    //   };

    //   fetchRez();
    // } else {
    //   setButtonText("No Recipe");
    // }
  };

  if (!globalState.data_catalog) {
    return (
      <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 33 }} spin />} />
      </>
    );
  }

  return (
    <>
      <Button type="primary" onClick={() => devLog()}>
        {ButtonText}
      </Button>
    </>
  );
}

export { ZubSteps, List, Pic, Head, Count, Time, Devbtn };
