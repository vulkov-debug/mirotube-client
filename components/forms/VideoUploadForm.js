import React, { useState } from "react";
import { Modal, Empty, Button } from "antd";
import ReactPlayer from "react-player";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import {useRouter} from 'next/router' 

const VideoUploadForm = ({visible, setVisible }) => {
  const [video, setVideo] = useState({});
  const [title, setTitle] = useState ('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const videoData = new FormData();
    videoData.append("video", file);
    setLoading(true);
    const { data } = await axios.post("/api/video-upload", videoData);
    setVideo(data);
    setLoading(false);
  };

  const videoSave = async () => {
    await axios.post('/api/video-save', {video, title, description})
    setVisible(false)
    router.push('/my-videos')
  };

  return (
    <Modal title="Upload new video" visible={visible} footer={null} onCancel={()=> setVisible(false)}>
      <div className="wrapper">
          <input className="form-control mb-3" placeholder="Enter video title" value={title} onChange={e=> setTitle(e.target.value)}/>
        {loading ? (
          <LoadingOutlined className="display-2 d-flex justify-content-center text-secondary" />
        ) : video && video.Location ? (
          <div width={720} height={480}>
            <ReactPlayer
              url={video.Location}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
        ) : (
          <Empty />
        )}
        {video && video.Location && (
          <textarea
            name="description"
            cols="7"
            rows="4"
            placeholder="Enter video description (optional)"
            className="form-control"
      value={description} onChange={e=> setDescription(e.target.value)}
          />
        )}
        {video && video.Location ? (
          <button
            onClick={videoSave}
            className="btn btn-block btn-primary mt-3"
          >
            Save
          </button>
        ) : (
          <label className="btn btn-primary btn-block mt-5">
            Upload
            <input
              type="file"
              hidden
              onChange={handleVideoUpload}
              disabled={loading}
            />
          </label>
        )}
      </div>
    </Modal>
  );
};

export default VideoUploadForm;
