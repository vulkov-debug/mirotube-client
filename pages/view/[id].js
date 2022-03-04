import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import SingleVideoCard from "../../components/cards/SingleVideoCard";
import { Card, Tag } from "antd";
const { Meta } = Card;
import Head from "next/head";

import { Context } from "../../context";

const SingleVideoView = () => {
  const {
    state: { playlist },
    dispatch,
  } = useContext(Context);

  const [video, setVideo] = useState({});

  const [playingIndex, setPlayingIndex] = useState(0);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    const fetchVideo = async () => {
      if (id) {
        const { data } = await axios.get(`/api/single-video/${id}`);
        setVideo(data);
      }
    };
    fetchVideo();
  }, [id]);

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
  const {data} = await axios.post(`/api/increment-views-count`, {id})
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
  }

  return (
    <>
      <Head>
        <title>{video.title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <UserRoute>
        <div className="container-fluid row">
          <div className="col-md-9" style={{marginLeft: '-30px', marginRight: '30px'}}>
            {video && video.video && (
              <Card>
                <ReactPlayer
                  url={urlVideo()}
                  controls
                  style={{ top: 0, left: 0 }}
                  width="100%"
                  height="auto"
                  playing
                  onEnded={nextSong}
                />
                <div className="container mt-2">
                  {video.tags &&
                    video.tags.map((tag) => <Tag color="#108ee9" className="cursor-pointer" onClick={()=>tagVideoHandler(tag)}>{tag}</Tag>)}
                </div>
                <hr />
                <Meta
                  description={
                    <>
                      <div className="h4">
                        <strong>{video.title}</strong>
                      </div>
                      <div>{video.description}</div>
                    </>
                  }
                />
              </Card>
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
