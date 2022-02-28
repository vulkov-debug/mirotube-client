import React, {useState, useEffect} from "react";
import dynamic from 'next/dynamic'
const LeftBar = dynamic(()=> import("../../components/LeftBar"), {ssr: false} )  ;
// import LeftBar from "../LeftBar";
import axios from "axios";

const UserRoute = ({ children }) => {

  const [playlists, setPlaylists] = useState([]);
  const [ok, setOk] = useState(false)

  const fetchPlaylists = async () => {
    const { data } = await axios.get("/api/get-playlists");
    setPlaylists(data);
    console.log("playlists", playlists);
    setOk(!ok)
  };
  useEffect(() => {
    fetchPlaylists();
  },[]);

  
  
  
  return (
    <div className="container-fluid row p-0">
      <div className="col-md-2">
      <LeftBar playlists={playlists} fetchPlaylists={fetchPlaylists}/>
    
      </div>
      <div className="col-md-10">{children}</div>
    </div>
  );
};

export default UserRoute;
