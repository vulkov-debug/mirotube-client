import React, { useState, useEffect } from "react";
import UserRoute from "../components/routes/UserRoute";
import { Card, Modal } from "antd";
import axios from "axios";
import ReactPlayer from "react-player";
import {
  CloseCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SingleEditVideoCard from "../components/cards/SingleEditVideoCard";
import VideoUploadForm from "../components/forms/VideoUploadForm";

const { confirm } = Modal;
const { Meta } = Card;

const myVideos = () => {
  const [videos, setVideos] = useState([]);
  const [ok, setOk] = useState(false)

  const [visible, setVisible] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const myVideos = async () => {
      const { data } = await axios.get("/api/user-videos");
      setVideos(data);
    };
    myVideos();
  }, [ok]);

  const handleVideoRemove = async (videoData) => {
    try {
    confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: `${videoData.title}`,
      onOk() {
       axios.post("/api/video-remove", videoData);
       const deletedItem = videos.indexOf(videoData._id)
       const changedVideos = videos
       changedVideos.splice(deletedItem, 1)
       setVideos(changedVideos)
       setOk(!ok)
        toast.success("Video was removed!");
      },
      onCancel() {},
    });
    } catch (error) {
      toast.error("Video remove error!");
    }
  };

  return (
    <UserRoute>
      <div className="row">
      <div className="container-fluid p-2">
        <div className="d-flex justify-content-center">
          <PlusCircleOutlined className="display-1" onClick={()=>setVisible(true)} />
        </div>
        <div className="d-flex justify-content-center pt-2">
          <span><b>Add new video </b></span>
          </div>
      </div>
      <VideoUploadForm visible={visible} setVisible={setVisible} setOk={setOk}/>
      </div>
      <div className="row">
        {videos.map((v) => (
          <SingleEditVideoCard v={v} handleVideoRemove={handleVideoRemove}/>
        ))}
      </div>
    </UserRoute>
  );
};

export default myVideos;
