import { PlusCircleOutlined } from "@ant-design/icons";
import React, {useState} from "react";
import UserRoute from "../components/routes/UserRoute";
import VideoUploadForm from "../components/forms/VideoUploadForm";

const uploadVideo = () => {

  const [visible, setVisible] = useState(false)
  return (
    <UserRoute>
      <div className="container-fluid p-5">
        <div className="row col-md-2 offset-md-5">
          <PlusCircleOutlined className="display-1" onClick={()=>setVisible(true)} />
        </div>
        <div className="row col-md-2 offset-md-5 pt-3">
          <span>Add new video</span>
        </div>
      </div>
      <VideoUploadForm visible={visible} setVisible={setVisible}/>
    </UserRoute>
  );
};

export default uploadVideo;
