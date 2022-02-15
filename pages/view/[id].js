import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import SingleVideoCard from "../../components/cards/SingleVideoCard";
import {Card} from 'antd'
const {Meta} = Card
const SingleVideoView = () => {
  const [video, setVideo] = useState({});

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    const fetchVideo = async () => {
      if (id) {
        const { data } = await axios.get(`/api/single-video/${id}`);
        setVideo(data);
        console.log("data", data);
        console.log("id", id);
      }
    };
    fetchVideo();
  }, [id]);

  return (
    <UserRoute>
      {/* {JSON.stringify(video)} */}
      <div className="row">
        <div className="col-md-9">
          {video && video.video && (
            <ReactPlayer
              url={video.video.Location}
              controls
              style={{ top: 0, left: 0, position: 'absolute' }}
              width='100%'
              height='auto'
              playing
            />
          )}
        </div>
        <div className="col">
        {video && video.video && <><Card
    // onClick={()=> router.push(`/view/${v._id}`)} 
      // className="col-md-2 col-sm-5 m-3 p-0"
      hoverable
      cover={
        <>
          <ReactPlayer
            url={video.video.Location}
            alt="video"
            width="100%"
            height="100%"
            cover
          />
        </>
      }
    >
      <Meta title='test' description='test'  />
    </Card>
    <Card
    // onClick={()=> router.push(`/view/${v._id}`)} 
      // className="col-md-2 col-sm-5 m-3 p-0"
      hoverable
      cover={
        <>
          <ReactPlayer
            url={video.video.Location}
            alt="video"
            width="100%"
            height="100%"
            cover
          />
        </>
      }
    >
      <Meta title='test' description='test'  />
    </Card>
    <Card
    // onClick={()=> router.push(`/view/${v._id}`)} 
      // className="col-md-2 col-sm-5 m-3 p-0"
      hoverable
      cover={
        <>
          <ReactPlayer
            url={video.video.Location}
            alt="video"
            width="100%"
            height="100%"
            cover
          />
        </>
      }
    >
      <Meta title='test' description='test'  />
    </Card>
    <Card
    // onClick={()=> router.push(`/view/${v._id}`)} 
      // className="col-md-2 col-sm-5 m-3 p-0"
      hoverable
      cover={
        <>
          <ReactPlayer
            url={video.video.Location}
            alt="video"
            width="100%"
            height="100%"
            cover
          />
        </>
      }
    >
      <Meta title='test' description='test'  />
    </Card>
    <Card
    // onClick={()=> router.push(`/view/${v._id}`)} 
      // className="col-md-2 col-sm-5 m-3 p-0"
      hoverable
      cover={
        <>
          <ReactPlayer
            url={video.video.Location}
            alt="video"
            width="100%"
            height="100%"
            cover
          />
        </>
      }
    >
      <Meta title='test' description='test'  />
    </Card></>}
        </div>
      </div>
    </UserRoute>
  );
};

export default SingleVideoView;
