import React, { useState, useEffect, useCallback } from "react";
import UserRoute from "../components/routes/UserRoute";
import { Progress, Modal, Empty } from "antd";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SingleEditVideoCard from "../components/cards/SingleEditVideoCard";
import VideoUploadForm from "../components/forms/VideoUploadForm";
import ReactPlayer from "react-player";
import { EditableTagGroup } from "../components/utilities/EditableTagGroup";
import Head from "next/head";

const { confirm } = Modal;

const myVideos = () => {
  const [videos, setVideos] = useState([]);
  const [ok, setOk] = useState(false);

  const [tags, setTags] = useState([]);

  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [editVisible, setEditVisible] = useState(false);
  const [videoEditState, setVideoEditState] = useState({});
  const [progress, setProgress] = useState(0);

  const [skip, setSkip] = useState(0);
  const [userVideosCount, setVideosCount] = useState(100);

  const router = useRouter();

  useEffect(() => {
    const myVideos = async () => {
      const {
        data: { videos, count },
      } = await axios.get(`/api/user-videos/${skip}`);
      setVideos(videos);
      setVideosCount(count);
    };
    myVideos();
  }, [ok]);

  const loadMore = useCallback(
    async (s) => {
      const {
        data: { videos },
      } = await axios.get(`/api/user-videos/${s}`);
      setVideos((p) => [...p, ...videos]);
    },
    [videos]
  );

  const handleVideoRemove = async (videoData) => {
    try {
      confirm({
        title: "Do you want to delete this item?",
        icon: <ExclamationCircleOutlined />,
        content: `${videoData.title}`,
        onOk() {
          axios.post("/api/video-remove", videoData);
          const deletedItem = videos.indexOf(videoData._id);
          const changedVideos = videos;
          changedVideos.splice(deletedItem, 1);
          setVideos(changedVideos);
          setOk(!ok);
          toast.success("Video was removed!");
        },
        onCancel() {},
      });
    } catch (error) {
      toast.error("Video remove error!");
    }
  };

  const handleVideoEdit = async (v) => {
    try {
      setEditVisible(true);
      setVideoEditState(v);
      setTags(v.tags);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVideoUpdate = async (e) => {
    try {
      const file = e.target.files[0];
      const videoData = new FormData();
      videoData.append("video", file);
      setLoading(true);
      const { data } = await axios.put(`/api/video-edit`, videoData, {
        onUploadProgress: (e) => {
          setProgress((e.loaded * 100) / e.total);
        },
      });
      setVideoEditState({ ...videoEditState, video: data });
      console.log("videoEditState", videoEditState);

      setLoading(false);
      setOk(!ok);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVideoSubmit = async () => {
    const { _id, title, description, video } = videoEditState;
    const { data } = await axios.post(`/api/video-edit-submit/${_id}`, {
      title,
      description,
      video,
      tags,
    });
    if (data.ok) toast.success(`Successfully updated ${title}`);
    setEditVisible(false);
    setOk((prevState) => !prevState);
  };
  return (
    <>
      <Head>
        <title>My videos</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <UserRoute>
        <Modal
          visible={editVisible}
          footer={null}
          onCancel={() => setEditVisible(false)}
        >
          <div className="wrapper mt-4">
            <input
              className="form-control mb-3"
              placeholder="Enter video title"
              value={videoEditState.title}
              onChange={(e) =>
                setVideoEditState({ ...videoEditState, title: e.target.value })
              }
            />

            {loading ? (
              <LoadingOutlined className="display-2 d-flex justify-content-center text-secondary m-5" />
            ) : videoEditState.video && videoEditState.video.Location ? (
              <div width={720} height={480}>
                <ReactPlayer
                  url={videoEditState.video.Location}
                  controls={true}
                  width="100%"
                  height="100%"
                />
              </div>
            ) : (
              <Empty />
            )}
            <hr />
            <EditableTagGroup tags={tags} setTags={setTags} />
            <hr />
            {loading && (
              <Progress
                className="m-3"
                strokeColor={{
                  from: "#108ee9",
                  to: "#87d068",
                }}
                percent={progress}
                status="active"
              />
            )}
            <label className="btn btn-primary btn-block mb-3">
              Upload new video
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleVideoUpdate}
                disabled={loading}
              />
            </label>
            {videoEditState.video && videoEditState.video.Location && (
              <>
                <textarea
                  name="description"
                  cols="7"
                  rows="4"
                  placeholder="Enter video description (optional)"
                  className="form-control"
                  value={videoEditState.description}
                  onChange={(e) =>
                    setVideoEditState({
                      ...videoEditState,
                      description: e.target.value,
                    })
                  }
                />
              </>
            )}
            <button
              className="btn btn-block btn-primary mt-3"
              onClick={handleVideoSubmit}
            >
              Save
            </button>
          </div>
        </Modal>
        <div className="row">
          <div className="container-fluid p-2">
            <div className="d-flex justify-content-center">
              <PlusCircleOutlined
                className="display-1"
                onClick={() => setVisible(true)}
              />
            </div>
            <div className="d-flex justify-content-center pt-2">
              <span>
                <b>Add new video </b>
              </span>
            </div>
          </div>
          <VideoUploadForm
            visible={visible}
            setVisible={setVisible}
            setOk={setOk}
          />
        </div>
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={userVideosCount}
          hasMore={userVideosCount > skip + 20}
          next={() => {
            loadMore(skip + 20);
            setSkip((p) => p + 20);
          }}
          loader={<h4>Loading ...</h4>}
        >
          <div className="row">
            {videos.map((v) => (
              <SingleEditVideoCard
                v={v}
                key={v._id}
                handleVideoRemove={handleVideoRemove}
                handleVideoEdit={handleVideoEdit}
              />
            ))}
          </div>
        </InfiniteScroll>
      </UserRoute>
    </>
  );
};

export default myVideos;
