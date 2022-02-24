import React, { useState, useEffect } from "react";
import { Card, Button, List, Modal } from "antd";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import Link from 'next/link'
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
const { Meta } = Card;
const {confirm} = Modal


const SinglePlaylistVideoCard = ({
  loading,
  playlistVideos,
  setPlaylistVideos,
  updatePlaylist
}) => {
  
  const router = useRouter()
  const playlistId = router.query.id

  const [ok, setOk] = useState(false);

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = (e, index) => {
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;

    const allPlaylistVideos = playlistVideos;

    const movingItem = allPlaylistVideos[movingItemIndex];
    allPlaylistVideos.splice(movingItemIndex, 1);
    allPlaylistVideos.splice(targetItemIndex, 0, movingItem);

    setPlaylistVideos(allPlaylistVideos);
    updatePlaylist()
    setOk(!ok);
  };

  const deleteVideoFromPlaylist = (item, index) => {
    confirm({
      title:`Confirm to delete`,
      icon: <ExclamationCircleOutlined/>,
      content: `Are you sure to delete ${item.title} from playlist?`,
      onOk:()=> {  
         axios.get(`/api/delete-video-from-playlist/${playlistId}/${item._id}`)
         toast.warning(`${item.title} was removed!`)
         const playlistVideosEdit = playlistVideos
         playlistVideosEdit.splice(index, 1)
         setPlaylistVideos(playlistVideosEdit)
         setOk(!ok)
      },
      onCancel: ()=> {}
    })

  }

  return (
    <div className="col-md-10 offset-md-1 mt-4">
      <List
        onDragOver={(e) => e.preventDefault()}
        itemLayout="horizontal"
        dataSource={playlistVideos}
        renderItem={(item, index) => (
          <List.Item
            actions={[<div className="nav-link text-primary" style={{cursor: 'pointer'}} onClick={()=> deleteVideoFromPlaylist(item, index)}>Delete from playlist</div>]}
            draggable
            onDragStart={(e) => handleDrag(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            <List.Item.Meta
              avatar={
                <ReactPlayer
                  url={item.video.Location}
                  width='100px'
                  height='60px'
                />
              }
              title={<Link href={`${process.env.NEXT_PUBLIC_URI}/view/${item._id}`}><a>{item.title}</a></Link>}
              description={item.description.substring(0, 50)}
            />
          </List.Item>
        )}
      />
      
    </div>
  );
};

export default SinglePlaylistVideoCard;
