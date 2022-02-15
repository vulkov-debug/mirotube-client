import React, { useState, useEffect } from "react";
import UserRoute from "../components/routes/UserRoute";
import { Card, Modal } from "antd";
import axios from "axios";
import ReactPlayer from "react-player";
import {
  CloseCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SingleEditVideoCard from "../components/cards/SingleEditVideoCard";

const { confirm } = Modal;
const { Meta } = Card;

const myVideos = () => {
  const [videos, setVideos] = useState([]);
  const [ok, setOk] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const myVideos = async () => {
      const { data } = await axios.get("/api/user-videos");
      setVideos(data);
    };
    myVideos();
  }, []);

  const handleVideoRemove = async (videoData) => {
    try {
    confirm({
      title: "Do you want to delete these items?",
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
        {videos.map((v) => (
          <SingleEditVideoCard v={v}/>
        ))}
      </div>
    </UserRoute>
  );
};

export default myVideos;
