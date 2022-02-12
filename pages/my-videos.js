import React, { useState, useEffect } from "react";
import UserRoute from "../components/routes/UserRoute";
import { Card, Tooltip, Modal } from "antd";
import axios from "axios";
import ReactPlayer from "react-player";
import {
  CloseCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
          <Card
          onClick={()=> router.push(`/view/${v._id}`)} 
            className="col-md-2 col-sm-5 m-3 p-0"
            hoverable
            cover={
              <>
                <ReactPlayer
                  url={v && v.video.Location ? v.video.Location : "/course.png"}
                  alt="video"
                  width="100%"
                  height="100%"
                  cover
                />
              </>
            }
            actions={[
              <Tooltip title="Edit video">
                <EditOutlined className="text-warning" />
              </Tooltip>,
              <Tooltip title="Remove video">
                <CloseCircleOutlined
                  onClick={() => handleVideoRemove(v)}
                  className="text-danger"
                />
              </Tooltip>,
            ]}
          >
            <Meta title={v.title} description={v.description ? v.description : v.title}  />
          </Card>
        ))}
      </div>
    </UserRoute>
  );
};

export default myVideos;
