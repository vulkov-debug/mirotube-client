import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import { Card, Switch, Tag, Rate } from "antd";
const { Meta } = Card;
import Head from "next/head";
import Player from "../../components/player";

import { Context } from "../../context";
import { LoadingOutlined } from "@ant-design/icons";

const SingleVideoView = () => {
  const {
    state: { playlist },
    dispatch,
  } = useContext(Context);

  const [video, setVideo] = useState({});
  const { title } = video;

  const [playingIndex, setPlayingIndex] = useState(0);

  const [loop, setLoop] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const [value, setValue] = useState();

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    fetchVideo();
  }, [id]);

  useEffect(() => {
    if(video && video.voted) {rateCalc()}
  }, [video]);

  useEffect(()=> {
    axios.post('/api/rate-save', {rate: value, videoId: video._id})
  },[value])

  const rateCalc = () => {
    const votedUsers = video.voted.length
    const voteSum = 0
    video.voted.map(v=> voteSum += v.rate)
    setValue(voteSum/votedUsers)
  };

  const fetchVideo = async () => {
    if (id) {
      const { data } = await axios.get(`/api/single-video/${id}`);
      setVideo(data);
    }
  };

  useEffect(() => {
    const currentIndex = "";

    if (playlist && playlist != null) {
      currentIndex = playlist.findIndex((i) => i._id == id);
      if (currentIndex == -1) {
        dispatch({ type: "REMOVE-PLAYLIST" });
      }
      setPlayingIndex(currentIndex);
    }
    if (!playlist && video && video.tags) {
      const fetchVideosByTags = async () => {
        const { data } = await axios.post("/api/get-videos-by-tag", video.tags);
        dispatch({ type: "SET-PLAYLIST", payload: data });
      };
      fetchVideosByTags();
    }
  }, [id, video]);

  const nextSong = async () => {
    const { data } = await axios.post(`/api/increment-views-count`, { id });
    if (playlist && playlist[playingIndex + 1]) {
      router.push(`/view/${playlist[playingIndex + 1]._id}`);
    }
  };

  const urlVideo = () => {
    if (
      playlist &&
      playlist[playingIndex + 1] &&
      playlist[playingIndex] &&
      playlist[playingIndex].video
    ) {
      return playlist[playingIndex].video.Location;
    } else {
      return video.video.Location;
    }
  };

  const tagVideoHandler = async (tag) => {
    const { data } = await axios.post("/api/get-videos-by-tag", [tag]);
    dispatch({ type: "SET-PLAYLIST", payload: data });
  };

  const handleRate = async (v) => {
    setValue(v);
    const { data } = await axios.post("/api/rate-video", { videoId: video._id, rate: v });
    
  };

  return (
    <>
      <Head>
        <title>{video.title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <UserRoute>
        <div className="container-fluid row">
          <div
            className="col-md-9"
            style={{ marginLeft: "-30px", marginRight: "30px" }}
          >
            {video && video.video ? (
              <Card>
                <Player
                  url={urlVideo()}
                  title={title}
                  onEnded={nextSong}
                  loop={loop}
                />
                <div className="container m-3">
                  {video.tags &&
                    video.tags.map((tag) => (
                      <Tag
                        color="#108ee9"
                        className="cursor-pointer"
                        onClick={() => tagVideoHandler(tag)}
                      >
                        {tag}
                      </Tag>
                    ))}
                  <span className="float-right">
                    <Rate
                    allowHalf
                      tooltips={desc}
                      onChange={(v) => handleRate(v)}
                      value={value}
                    />
                    {value ? (
                      <span className="ant-rate-text">{desc[value - 1]}</span>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <hr />
                <br />
                <Meta
                  description={
                    <>
                      <div className="h4">
                        <strong>{video.title}</strong>
                        <Switch
                          className="float-right ml-4"
                          checked={autoPlay}
                          onChange={(v) => {
                            setAutoPlay(v);
                            dispatch({ type: "REMOVE-PLAYLIST" });
                          }}
                          checkedChildren="AutoPlay"
                          unCheckedChildren="AutoPlay"
                        />
                        <Switch
                          className="float-right"
                          checked={loop}
                          onChange={(v) => setLoop(v)}
                          checkedChildren="Loop"
                          unCheckedChildren="Loop"
                        />
                      </div>
                      <div>
                        <span>by {video.author.name}</span>
                      </div>
                      <div>{video.description}</div>
                      <h6 className="float-right">{video.viewCount} views</h6>
                    </>
                  }
                />
                <strong>
                  Upload date:{" "}
                  {new Date(video.createdAt).toString().split("GMT")[0]}
                </strong>
              </Card>
            ) : (
              <LoadingOutlined spin />
            )}
          </div>
          <div className="col-md-3 p-3 ">
            {playlist &&
              playlist.map((item) => (
                <div onClick={() => router.push(`/view/${item._id}`)}>
                  <Card
                    className="m-2"
                    hoverable
                    cover={
                      <ReactPlayer
                        url={item.video.Location}
                        alt="video"
                        width="100%"
                        height="100%"
                        cover
                      />
                    }
                  >
                    <Meta
                      title="test"
                      description={
                        <>
                          <div className="h4">
                            <strong>{item.title}</strong>
                          </div>
                          <div>{item.description}</div>
                        </>
                      }
                    />
                  </Card>
                  <hr />
                </div>
              ))}
          </div>
        </div>
      </UserRoute>
    </>
  );
};

export default SingleVideoView;
