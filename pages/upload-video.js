import { PlusCircleOutlined } from "@ant-design/icons";
import React, {useState} from "react";
import UserRoute from "../components/routes/UserRoute";
import VideoUploadForm from "../components/forms/VideoUploadForm";

const uploadVideo = () => {

  const [visible, setVisible] = useState(false)
  return (
    <UserRoute>
       <div className="container-fluid p-2">
        <div className="d-flex justify-content-center">
          <PlusCircleOutlined className="display-1" onClick={()=>setVisible(true)} />
        </div>
        <div className="d-flex justify-content-center pt-2">
          <span><b>Add new video </b></span>
          </div>
      </div>
      <VideoUploadForm visible={visible} setVisible={setVisible}/>
    </UserRoute>
  );
};

export default uploadVideo;
