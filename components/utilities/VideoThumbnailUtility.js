import { LoadingOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import VideoThumbnail from "react-video-thumbnail";

const VideoThumbnailUtility = ({ v }) => {
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState('')


  return (
    <div className="text-center pt-auto"> 
       <div hidden>
       <VideoThumbnail
          videoUrl={v && v.video.Location}
          width={262}
          snapshotAtTime={5}
          height={130}
          thumbnailHandler={(thumbnail) => setThumbnail(thumbnail)}
          // cors={true}
        />
       </div>
        {thumbnail ? <img src={thumbnail} alt="image" /> : <LoadingOutlined spin className='display-4 mt-5'/>}
    </div>
  );
};

export default VideoThumbnailUtility;
