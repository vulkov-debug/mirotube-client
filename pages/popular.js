import React, { useState, useEffect, useCallback } from "react";
import UserRoute from "../components/routes/UserRoute";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import SingleVideoCard from "../components/cards/SingleVideoCard";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

const popular = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [videoCount, setVideoCount] = useState(0)

   const [skip, setSkip] = useState(0)

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const { data: {videos, count} } = await axios.get(`/api/popular-videos/${skip}`);
      setVideos(videos);
      setVideoCount(count)
      setLoading(false);
    };
    fetchVideos();
  }, []);

  const loadMore = useCallback(async (s) => {
    const { data: {videos} } = await axios.get(`/api/popular-videos/${skip}`);
     setVideos(p=> [...p, ...videos])
  },[videos])


  return (
    <>
      <Head>
        <title>MiroTube</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <UserRoute>
        <InfiniteScroll
        dataLength={videoCount}
        next={() => {
           loadMore(skip+20) 
           setSkip(s=> s+20)
        }}
        hasMore={videoCount > skip+20}
        loader={<h4>Loading ...</h4>}
        >
          <div className="row">
            {!loading ? (
              videos.map((v) => <SingleVideoCard v={v} />)
            ) : (
              <SyncOutlined
                spin
                className="d-flex justify-content-center display-1 text-danger p-5 m-auto"
              />
            )}
          </div>
        </InfiniteScroll>
      </UserRoute>
    </>
  );
};

export default popular;
