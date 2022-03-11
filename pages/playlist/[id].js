import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddVideoToPlaylist from "../../components/forms/AddVideoToPlaylist";
import SinglePlaylistVideoCard from "../../components/cards/SinglePlaylistVideoCard";
import { toast } from "react-toastify";
import Head from 'next/head'

const userPlaylist = () => {
  const router = useRouter();
  const id = router.query.id;

  const [visible, setVisible] = useState(false);
  const [userVideos, setUserVideos] = useState([]);

  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [videoNames, setVideoNames] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [objOfAllIdsAndNames, setObjOfAllIdsAndNames] = useState({});

  const [videosInModal, setVideosInModal] = useState([]);

  let arrOfIdsAndNames = [];
  let arrOfNames = [];

  const arrOfSelected = [];

  const fetchUserVideos = async () => {
    const { data } = await axios.get("/api/user-videos/0");
    setUserVideos(data);
    console.log("videos", data);
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        arrOfIdsAndNames[data[i].title] = data[i]._id;
        arrOfNames.push(data[i].title);
      }
      setObjOfAllIdsAndNames(Object.assign({}, arrOfIdsAndNames));

      setVideoNames(arrOfNames);
    }
  };

  useEffect(() => {
    fetchUserVideos();
  }, []);

  useEffect(() => {
    if (id) fetchPlaylistVideos();
  }, [id]);

  const handleSubmit = async () => {
    for (let i = 0; i < Object.keys(objOfAllIdsAndNames).length; i++) {
      let [key, value] = Object.entries(objOfAllIdsAndNames)[i];
      if (selectedItems.includes(key)) {
        arrOfSelected.push(value);
      }
    }
    const { data } = await axios.post("/api/add-videos-to-playlist", {
      arrOfSelected,
      id,
    });
    fetchPlaylistVideos();
    setVideosInModal([])
  };

  const fetchPlaylistVideos = async () => {
    const { data } = await axios.post("/api/get-playlist-videos", {
      playlist: id,
    });
    setPlaylistVideos(data);
  };

  const updatePlaylist = async () => {
    const { data } = await axios.post(`/api/update-playlist`, {
      id,
      playlist: playlistVideos,
    });
    if (data.ok) {
      toast.success(`Successfully edited playlist`);
    }
  };

  const handleChangeItemsInPlaylist = async (v) => {
   console.log('v', v)
   setVideosInModal([])
   setSelectedItems(v)

    const arrOfModalVideos = []

   for (let i = 0; i < Object.keys(objOfAllIdsAndNames).length; i++) {
     let [key, value] = Object.entries(objOfAllIdsAndNames)[i];
     if (v.includes(key)) {
       arrOfSelected.push(value);
       const { data } = await axios.get(`/api/single-video/${value}`);
       console.log('data', data)
       arrOfModalVideos.push(data)
 }}
   console.log('arrOfSelected', arrOfSelected)
   console.log('arrOfModalVideos', arrOfModalVideos)
   setVideosInModal(arrOfModalVideos)
      }

  return (<>
  <Head>
    <title>Edit Playlist</title>
    <link rel="icon" href="/favicon.png" />
  </Head>
    <UserRoute>
      <div className="container-fluid p-2">
        <div className="d-flex justify-content-center">
          <PlusCircleOutlined
            className="display-1"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="d-flex justify-content-center pt-2">
          <span>
            <b>Add new video to the playlist</b>
          </span>
        </div>
      </div>
      <AddVideoToPlaylist
        visible={visible}
        setVisible={setVisible}
        videoNames={videoNames}
        handleSubmit={handleSubmit}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        handleChangeItemsInPlaylist={handleChangeItemsInPlaylist}
        videosInModal={videosInModal}
      />
      <div className="row">
        <SinglePlaylistVideoCard
          playlistVideos={playlistVideos}
          setPlaylistVideos={setPlaylistVideos}
          loading={loading}
          updatePlaylist={updatePlaylist}
          arrOfSelected={arrOfSelected}
        />
      </div>
    </UserRoute>
  </>
  );
};

export default userPlaylist;
