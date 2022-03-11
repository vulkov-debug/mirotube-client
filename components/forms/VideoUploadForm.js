import React, { useState } from "react";
import { Modal, Empty, Progress } from "antd";
import ReactPlayer from "react-player";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { EditableTagGroup } from "../utilities/EditableTagGroup";
import TagSuggest from "../utilities/TagSuggest";
import { toast } from "react-toastify";

const VideoUploadForm = ({ visible, setVisible, setOk }) => {
  const [video, setVideo] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [tags, setTags] = useState([]);
  const [tagsSuggestions, setTagSuggestions] = useState([]);

  const router = useRouter();

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setTitle(file.name.split(".")[0]);
    const videoData = new FormData();
    videoData.append("video", file);

    const suggesions = file.name.split(" ").filter((sug) => sug.length > 4);
    console.log("suggestions", suggesions);
    setTagSuggestions(suggesions);

    setLoading(true);
    const { data } = await axios.post("/api/video-upload", videoData, {
      onUploadProgress: (e) => {
        setProgress(Math.round((100 * e.loaded) / e.total));
      },
    });
    setVideo(data);

    setLoading(false);
  };

  const videoSave = async () => {
    await axios.post("/api/video-save", { video, title, description, tags });
    setVisible(false);
    setTitle("");
    setDescription("");
    setVideo({});
    setOk((prevState) => !prevState);
    router.push("/my-videos");
    toast.success('Successfully added!')
  };

  return (
    <Modal
      title="Upload new video"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <div className="wrapper">
        <input
          className="form-control mb-3"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {loading ? (
          <LoadingOutlined className="display-2 d-flex justify-content-center text-secondary m-5" />
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
        {loading && (
          <Progress
            className="mt-5"
            strokeColor={{
              from: "#108ee9",
              to: "#87d068",
            }}
            percent={progress}
            status="active"
          />
        )}
        <TagSuggest
          tags={tags}
          setTags={setTags}
          tagsSuggestions={tagsSuggestions}
        />
        <EditableTagGroup tags={tags} setTags={setTags} className="p-2" />

        {video && video.Location && (
          <>
            <textarea
              name="description"
              cols="7"
              rows="4"
              placeholder="Enter video description (optional)"
              className="form-control mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        )}
        {video && video.Location ? (
          <button
            onClick={videoSave}
            className="btn btn-block btn-primary mt-3"
            disabled={loading}
          >
            Save
          </button>
        ) : (
            <label className="btn btn-primary btn-block mt-5">
              {loading ? 'Uploading' : 'Upload'}
              <input
                type="file"
                accept="video/*"
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
