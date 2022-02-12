import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";

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
        <div className="col-md-10">
          {video && video.video && (
            <ReactPlayer
              url={video.video.Location}
              controls
              style={{ marginTop: "10px", marginLeft: "10px" }}
              width={800}
              height={500}
            />
          )}
        </div>
        <div className="col-md-2"></div>
      </div>
    </UserRoute>
  );
};

export default SingleVideoView;
