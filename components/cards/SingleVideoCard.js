import React from 'react'
import { Card } from "antd";
import ReactPlayer from "react-player";
const { Meta } = Card;
import { useRouter } from "next/router";

const SingleVideoCard = ({v}) => {
    const router = useRouter();
  return (
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
    >
      <Meta title={v.title} description={v.description ? v.description : v.title}  />
    </Card>
  )
}

export default SingleVideoCard