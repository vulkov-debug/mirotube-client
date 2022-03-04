import React, { useState, useEffect } from "react";
import SingleVideoCard from "../components/cards/SingleVideoCard";

import UserRoute from "../components/routes/UserRoute";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import Head from 'next/head'

const index = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const { data } = await axios.get("/api/videos");
      setVideos(data);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  return (
    <>
      <Head>
        <title>MiroTube</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <UserRoute>
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
      </UserRoute>
    </>
  );
};

export default index;
