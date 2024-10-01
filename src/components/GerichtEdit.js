import React from "react";
import { useEffect, useState, useReducer,useContext } from "react";
import { Button, Input, Image, Upload, message  } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, CheckCircleTwoTone, UploadOutlined } from "@ant-design/icons";
import "../App.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { GlobalStateContext} from '../context/GlobalStateContext.js';
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

function EditName_Time_Count({_id}) {
    const { globalState, forceUpdate } = useContext(GlobalStateContext);
    const foundItem = globalState.data_catalog.find(item => item._id === _id);
    console.log(foundItem)

    const handleGerichtInputChange = () => {

    }

    const handleSetGerichtInput = () => {

    }
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

function EditPicture({_id}) {
    const { globalState, forceUpdate } = useContext(GlobalStateContext);
    const  [newImage, SetImage]  = useState(null)
    const foundItem = globalState.data_catalog.find(item => item._id === _id);

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
            message.success(`${info.file.name} file uploaded successfully`);
            SetImage("/images/" + info.file.name)
          } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        showUploadList: true,
      };

    return (
        <>
            {!newImage ? (
                <Image src={foundItem.bild} />
            ) : (<Image src={newImage}/>)}
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Vorschaubild hochladen</Button>
            </Upload>
        </>
    )
}

export { EditName_Time_Count,EditPicture };
