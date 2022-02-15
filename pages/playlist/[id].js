import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddVideoToPlaylist from "../../components/forms/AddVideoToPlaylist";
import SinglePlaylistVideoCard from "../../components/cards/SinglePlaylistVideoCard";

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

  let arrOfIdsAndNames = [];
  let arrOfNames = [];

  const fetchUserVideos = async () => {
    const { data } = await axios.get("/api/user-videos");
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
    console.log("objOfAllIdsAndNames", objOfAllIdsAndNames);
    const arrOfSelected = [];
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
  };

  const fetchPlaylistVideos = async () => {
    const { data } = await axios.post("/api/get-playlist-videos", {
      playlist: id,
    });
    setPlaylistVideos(data);
  };
  return (
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
      />
      <div className="row">
        {!loading ? (
          playlistVideos.map((v) => <SinglePlaylistVideoCard v={v} />)
        ) : (
          <SyncOutlined
            spin
            className="d-flex justify-content-center display-1 text-danger p-5 m-auto"
          />
        )}
      </div>
    </UserRoute>
  );
};

export default userPlaylist;
