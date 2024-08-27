// src/components/days/Mo.js
import React from "react";
import { useEffect, useState, useReducer } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Steps, Checkbox, Button, message, Flex, Spin, Skeleton } from "antd";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { useFetchData } from "./FetchData";

dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

function Head({ date = "2024-07-09", name = "dev" }) {
  const [HeadText, setHeadText] = useState("-");
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const query = `?name=dev`;
  const { data: user, error, isServerAvailable } = useFetchData(`/api/Test2${query}`);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(date).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (isServerAvailable) {
      if (user) {
        // Condition ? trueAns : falseAns
        var _id = user.ausgewählteRezepte.find(CheckforDate) ? user.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const query = `?Recipe_id=${_id}`;
          const fetchRez = async () => {
            try {
              const response = await fetch(`/api/recipeTest${query}`);
              const rez = await response.json();
              setHeadText(rez.name);
              // console.log(rez);
            } catch (error) {
              console.error(error);
            }
          };

          fetchRez();
        } else {
          setHeadText("Kein Gericht für diesen Tag");
        }
      }
    }
  }, [isServerAvailable, user, date]);

  if (!user) {
    return (
      <div className="food-details">
        {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} /> */}
        {/* <Skeleton value="small" active style={{ height: '1px' }}/> */}
        <Skeleton.Input active size="large" shape="square" />
      </div>
    );
  }
  return (
    <div className="food-details">
      <h1>{HeadText}</h1>
    </div>
  );
}

function ZubSteps({ date = "2024-07-09", name = "dev" }) {
  const [current, setCurrent] = useState(0); //Hook muss immer ausgeführt werden sonst kommt fehler da sich die Hooks anzahl in verschieden Rendern ändert
  const [StepsArr, setStepsArr] = useState(["-"]);
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const query = `?name=dev`;
  const { data: user, error, isServerAvailable } = useFetchData(`/api/Test2${query}`);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(date).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (isServerAvailable) {
      if (user) {
        // Condition ? trueAns : falseAns
        var _id = user.ausgewählteRezepte.find(CheckforDate) ? user.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const query = `?Recipe_id=${_id}`;
          const fetchRez = async () => {
            try {
              const response = await fetch(`/api/recipeTest${query}`);
              const rez = await response.json();
              setStepsArr(rez.zubereitungsschritte);
              // console.log(rez);
            } catch (error) {
              console.error(error);
            }
          };

          fetchRez();
        } else {
          setStepsArr(["-"]);
        }
      }
    }
  }, [isServerAvailable, user, date]);

  if (!user) {
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

function Pic({ date = "2024-07-09", name = "dev" }) {
  const [bildUrl, setbildUrl] = useState([{ menge: "-", name: "-" }]);
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const query = `?name=dev`;
  const { data: user, error, isServerAvailable } = useFetchData(`/api/Test2${query}`);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(date).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (isServerAvailable) {
      if (user) {
        // Condition ? trueAns : falseAns
        var _id = user.ausgewählteRezepte.find(CheckforDate) ? user.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const query = `?Recipe_id=${_id}`;
          const fetchRez = async () => {
            try {
              const response = await fetch(`/api/recipeTest${query}`);
              const rez = await response.json();
              setbildUrl(rez.bild);
              // console.log(rez);
            } catch (error) {
              console.error(error);
            }
          };

          fetchRez();
        } else {
          setbildUrl("/images/Placeholder2.webp");
        }
      }
    }
  }, [isServerAvailable, user, date]);

  if (!user) {
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

function List({ date = "2024-07-09", name = "dev" }) {
  const [ListArr, setListArr] = useState([{ menge: "-", name: "-" }]);
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const query = `?name=dev`;
  const { data: user, error, isServerAvailable } = useFetchData(`/api/Test2${query}`);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(date).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (isServerAvailable) {
      if (user) {
        // Condition ? trueAns : falseAns
        var _id = user.ausgewählteRezepte.find(CheckforDate) ? user.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const query = `?Recipe_id=${_id}`;
          const fetchRez = async () => {
            try {
              const response = await fetch(`/api/recipeTest${query}`);
              const rez = await response.json();
              setListArr(rez.zutaten);
              // console.log(rez);
            } catch (error) {
              console.error(error);
            }
          };

          fetchRez();
        } else {
          setListArr([{ menge: "-", name: "-" }]);
        }
      }
    }
  }, [isServerAvailable, user, date]);

  if (!user) {
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

function Count({ date = "2024-07-09", name = "dev" }) {
  const [CountText, setCountText] = useState("-- Stück");
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const query = `?name=dev`;
  const { data: user, error, isServerAvailable } = useFetchData(`/api/Test2${query}`);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(date).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (isServerAvailable) {
      if (user) {
        // Condition ? trueAns : falseAns
        var _id = user.ausgewählteRezepte.find(CheckforDate) ? user.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          const query = `?Recipe_id=${_id}`;
          const fetchRez = async () => {
            try {
              const response = await fetch(`/api/recipeTest${query}`);
              const rez = await response.json();
              setCountText(rez.zutaten.length);
              // console.log(rez);
            } catch (error) {
              console.error(error);
            }
          };

          fetchRez();
        } else {
          setCountText("-- Stück");
        }
      }
    }
  }, [isServerAvailable, user, date]);

  if (!user) {
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

function Time({ date = "2024-07-09", name = "dev" }) {
  const [TimeText, setTimeText] = useState("-- min");
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const query = `?name=dev`;
  const { data: user, error, isServerAvailable } = useFetchData(`/api/Test2${query}`);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(date).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (isServerAvailable) {
      if (user) {
        // Condition ? trueAns : falseAns
        var _id = user.ausgewählteRezepte.find(CheckforDate) ? user.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        if (_id) {
          // var _id = user.ausgewählteRezepte.find(CheckforDate).rezepte_id;
          const query = `?Recipe_id=${_id}`;
          const fetchRez = async () => {
            try {
              const response = await fetch(`/api/recipeTest${query}`);
              const rez = await response.json();
              setTimeText(rez.zubereitungszeit);
              // console.log(rez);
            } catch (error) {
              console.error(error);
            }
          };

          fetchRez();
        } else {
          setTimeText("-- min");
        }
      }
    }
  }, [isServerAvailable, user, date]);

  if (!user) {
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

function ServerInfoAndHeader({ date = "2024-07-09", name = "dev", value, setValue }) {
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const query = `?name=dev`;
  const { data: user, error, isServerAvailable } = useFetchData(`/api/Test2${query}`);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(date).format("YYYY-MM-DD");
  }

  useEffect(() => {
    if (isServerAvailable) {
      if (user) {
        // Condition ? trueAns : falseAns
        var _id = user.ausgewählteRezepte.find(CheckforDate) ? user.ausgewählteRezepte.find(CheckforDate).rezepte_id : null;
        var tempServerInfo = { RecipeAvailable: _id, ServerAvailable: isServerAvailable };
        console.log("TempServerInfo: ",user.ausgewählteRezepte);
        setValue(tempServerInfo);
      }
    } else {
      var tempServerInfo = { RecipeAvailable: false, ServerAvailable: isServerAvailable };
      setValue(tempServerInfo);
    }
  }, [isServerAvailable, user, date]);

  if (!user) {
    return (
      <>
        <h2 style={{ color: "var(--MenuColor)" }}> Food planer </h2>
      </>
    );
  }

  return (
    <>
      <h2 style={{ color: "var(--MenuColor)" }}> Food planer </h2>
    </>
  );
}

function Devbtn({ date = "2024-07-09", name = "dev", ServerInfo=null }) {
  // const query = `?name=dev&date=${date || '2024-07-09'}`;
  const [ButtonText, setButtonText] = useState("Dev Test");
  const query = `?name=dev`;
  // Verwende useFetchData einmal, um den Status zu überwachen und die Daten zu laden
  const { data: user, error, isServerAvailable } = useFetchData(`/api/Test2${query}`);

  useEffect(() => {
    if (isServerAvailable) {
      if (user)
        // console.log(user.name, "Server is available, data loaded:", user);
        console.log("Loaded data with: ", dayjs(date).format("YYYY-MM-DD"));
    }
  }, [isServerAvailable, user, date]);

  function CheckforDate(choosenRecipe) {
    return choosenRecipe.datum === dayjs(date).format("YYYY-MM-DD");
  }
  const devLog = (user) => {
    console.log("Loaded data with: ", dayjs(date).format("YYYY-MM-DD"));
    console.log(ServerInfo);
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

  if (!user) {
    return (
      <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 33 }} spin />} />
      </>
    );
  }

  return (
    <>
      <Button type="primary" onClick={() => devLog(user)}>
        {ButtonText}
      </Button>
    </>
  );
}

export { ZubSteps, List, Pic, Head, Count, Time, Devbtn, ServerInfoAndHeader };
