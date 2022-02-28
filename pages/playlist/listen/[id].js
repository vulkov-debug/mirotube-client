import React, {useState, useEffect, useContext} from 'react'
import UserRoute from '../../../components/routes/UserRoute';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SyncOutlined } from '@ant-design/icons';
import SingleVideoCard from '../../../components/cards/SingleVideoCard';
import { Context } from '../../../context';

const LitenPlaylist = () => {

  const {state, dispatch} = useContext(Context)

   const router = useRouter()

   const {id} = router.query

const [loading, setLoading] = useState(false)
    const [playlistVideos, setPlaylistVideos] = useState([])

    useEffect(()=> {
    if(id) fetchPlaylistVideos()
    },[id])

    const fetchPlaylistVideos = async () => {
        setLoading(true)
        const { data } = await axios.post("/api/get-playlist-videos", {
          playlist: id,
        });
        setLoading(false)
        setPlaylistVideos(data);
        dispatch({type: "SET-PLAYLIST", payload: data})
      };

  return (
    <UserRoute>
        <div className="row">
        {!loading ? playlistVideos.map((v) => <SingleVideoCard v={v} />) : <SyncOutlined spin className='d-flex justify-content-center display-1 text-danger p-5 m-auto'/>}
      </div>
        </UserRoute>
  )
}

export default LitenPlaylist