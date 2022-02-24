import React from "react";
import { Card, Tooltip } from "antd";
import ReactPlayer from "react-player";
import { EditOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Meta } = Card;

const SingleEditVideoCard = ({ v, handleVideoRemove }) => {
  const router = useRouter();
  return (
    <Card
      className="col-md-2 col-sm-5 m-3 p-0"
      hoverable
      cover={
        <>
          <ReactPlayer
            onClick={() => router.push(`/view/${v._id}`)}
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
      <Meta
        title={v.title}
        description={v.description ? v.description : v.title}
      />
    </Card>
  );
};

export default SingleEditVideoCard;
