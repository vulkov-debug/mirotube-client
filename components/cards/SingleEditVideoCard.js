import React from "react";
import { Card, Tooltip } from "antd";
import ReactPlayer from "react-player";
import { EditOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import VideoThumbnailUtility from "../utilities/VideoThumbnailUtility";

const { Meta } = Card;

const SingleEditVideoCard = ({ v, handleVideoRemove, handleVideoEdit }) => {
  const router = useRouter();
  return (
    <Card
      className="col-md-2 col-sm-5 m-3 p-0"
      hoverable
      cover={
        <div
          style={{ height: "120px" }}
          onClick={() => router.push(`/view/${v._id}`)}
        >
          <VideoThumbnailUtility v={v} />
        </div>
      }
      actions={[
        <Tooltip title="Edit video">
          <EditOutlined
            className="text-warning"
            onClick={() => handleVideoEdit(v)}
          />
        </Tooltip>,
        <Tooltip title="Remove video">
          <CloseCircleOutlined
            onClick={() => handleVideoRemove(v)}
            className="text-danger"
          />
        </Tooltip>,
      ]}
    >
      <Meta
        onClick={() => router.push(`/view/${v._id}`)}
        title={v.title}
        description={v.description ? v.description : v.title}
      />
    </Card>
  );
};

export default SingleEditVideoCard;
