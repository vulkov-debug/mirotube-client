import React, { useState, useEffect, useCallback } from "react";
import SingleVideoCard from "../components/cards/SingleVideoCard";

import UserRoute from "../components/routes/UserRoute";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";


const index = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [skip, setSkip] = useState(0);
  const [allVideosCount, setAllVideosCount] = useState(0);

  useEffect(() => {
      fetchVideos(skip);
  }, []);

  const fetchVideos = async (skip) => {
    setLoading(true);
    const {
      data: { all, count },
    } = await axios.get(`/api/videos/${skip}`);
    console.log("all", all);
    setVideos(all);
    setAllVideosCount(count);

    console.log("count", count);
    setLoading(false);
  }

  const loadMore = useCallback(async (skip) => {
    const {
      data: { all },
    } = await axios.get(`/api/videos/${skip}`);
    setVideos((prevVideos) => [...prevVideos, ...all]);
  },[videos])

  return (
    <>
      <Head>
        <title>MiroTube</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <UserRoute>
        <InfiniteScroll
          dataLength={27}
          next={() => {
            loadMore(skip+ 20);
            setSkip(p=>p+20)
          }}
          hasMore={allVideosCount > (skip + 20)}
          loader={
            <div key="loading" className="loader">
              Loading ...
            </div>
          }
        >
          <div className="row">
            {!loading ? (
              videos.map((v) => (
                <SingleVideoCard v={v} key={v._id} />
              ))
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

export default index;
