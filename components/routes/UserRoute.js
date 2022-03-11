import React, {useState, useEffect, useMemo, useCallback} from "react";
import dynamic from 'next/dynamic'
const LeftBar = dynamic(()=> import("../../components/LeftBar"), {ssr: false} )  ;

import axios from "axios";

const UserRoute = ({ children }) => {

  const [playlists, setPlaylists] = useState([]);
  const [ok, setOk] = useState(false)

  const fetchPlaylists = async () => {
    const { data } = await axios.get("/api/get-playlists");
    setPlaylists(data);
    setOk(!ok)
  };
  useEffect(() => {
    fetchPlaylists();
  },[]);

  const LeftBarFunc = useMemo(() => (
  <LeftBar playlists={playlists} fetchPlaylists={fetchPlaylists} ok={ok}/>
  ),[ok])
  
  
  return (
    <div className="container-fluid row  p-0">
      <div className="col-md-2 p-0">
    {LeftBarFunc}
      </div>
      <div className="col-md-10">{children}</div>
    </div>
  );
};

export default UserRoute;
