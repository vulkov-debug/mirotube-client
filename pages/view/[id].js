import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import SingleVideoCard from "../../components/cards/SingleVideoCard";
import { Card } from "antd";
const { Meta } = Card;
import Head from 'next/head'

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
        console.log("data", data);
        console.log("id", id);
      }
    };
    fetchVideo();

    const currentIndex = "";

    if (playlist) {
      console.log("playlist", playlist);
      currentIndex = playlist.findIndex((i) => i._id == id);
      if (currentIndex == -1) {
        dispatch({ type: "REMOVE-PLAYLIST" });
      }
      console.log("currentIndex", currentIndex);
      setPlayingIndex(currentIndex);
      console.log(
        "playlist[playingIndex].video.Location",
        playlist[playingIndex].video.Location
      );
    }
  }, [id]);

  const nextSong = () => {
    if (playlist && playlist[playingIndex + 1]) {
      router.push(`/view/${playlist[playingIndex + 1]._id}`);
    } else {
      return dispatch({ type: "REMOVE-PLAYLIST" });
    }
  };

  const urlVideo = () => {
    if (
      playlist &&
      playlist[playingIndex + 1] &&
      playlist[playingIndex].video
    ) {
      return playlist[playingIndex].video.Location;
    } else {
      return video.video.Location;
    }
  };

  return (
    <>
    <Head>
      <title>{video.title}</title>
      <link rel='icon' href='/favicon.png'/>
    </Head>
    <UserRoute>
      <div className="row">
        <div className="col-md-9">
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
        <div className="col-md-3 ">
          {playlist &&
            playlist.map((item) => (
              <>
              <Card
              onClick={()=>router.push(`/view/${item._id}`)}
              className="m-3"
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
              </>
            ))}
        </div>
      </div>
    </UserRoute>
    </>
  );
};

export default SingleVideoView;
