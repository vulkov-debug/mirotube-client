import React, { useState, useEffect } from "react";
import { Menu, Modal } from "antd";
import {
  AppstoreOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  PlayCircleOutlined,
  HomeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const { SubMenu } = Menu;

const LeftBar = ({ playlists, fetchPlaylists }) => {
  const [current, setCurrent] = useState([]);

  const [visible, setVisible] = useState(false);
  const [playlist, setPlaylist] = useState("");

  const [ok, setOk] = useState(true);

  


  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const addPlaylist = async () => {
    setVisible(false);
    await axios.post("/api/add-playlist", {
      name: playlist,
    });
    toast.success(`${playlist} addded successfully!`);
    setPlaylist("");
    fetchPlaylists();
  };

const  openKeysFunc = () => {
    if(window && window.localStorage.getItem('keys')) {
      return window.localStorage.getItem('keys').split(',')
    } else {
      return ['sub1'] 
    } 
      
    }
  
  return (
    <>
      <Menu
        selectedKeys={[current]}
        defaultOpenKeys={openKeysFunc}
        mode="inline"
        theme="dark"
        onOpenChange={(item)=> localStorage.setItem('keys', item)}
      >
        <Menu.Item
          key="/"
          icon={<HomeOutlined />}
          onClick={() => router.push("/")}
        >
          Home
        </Menu.Item>
        <SubMenu
          key="sub1"
          icon={<UnorderedListOutlined />}
          title="My playlists"
        >
          <Menu.Item
            key="/my-videos"
            icon={<PlayCircleOutlined />}
            onClick={() => router.push("/my-videos")}
          >
            My videos
          </Menu.Item>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <Menu.Item
                key={`/playlist/listen/${playlist._id}`}
                onClick={() => {router.push(`/playlist/listen/${playlist._id}`)
              }}
              >
                {playlist.name}
              </Menu.Item>
            ))
          ) : (
            <LoadingOutlined spin className="d-flex justify-content-center" />
          )}
        </SubMenu>
        <SubMenu
          key="sub2"
          icon={<UnorderedListOutlined />}
          title="Edit playlists"
        >
          <Menu.Item
            key="4"
            icon={<PlusOutlined style={{ marginRight: "-8px" }} />}
            onClick={() => setVisible(true)}
          >
            Add new Playlist
          </Menu.Item>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <Menu.Item
                key={`/playlist/${playlist._id}`}
                onClick={() => router.push(`/playlist/${playlist._id}`)}
              >
                {playlist.name}
              </Menu.Item>
            ))
          ) : (
            <LoadingOutlined spin className="d-flex justify-content-center" />
          )}
        </SubMenu>
        <SubMenu key="sub5" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="8">Option 9</Menu.Item>
          <Menu.Item key="9">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="10">Option 11</Menu.Item>
            <Menu.Item key="11">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
      <Modal
        visible={visible}
        footer={null}
        title="Add new Playlist"
        onCancel={() => setVisible(false)}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Enter playlist name"
          value={playlist}
          onChange={(e) => setPlaylist(e.target.value)}
        />
        <button
          className="btn btn-block btn-primary mt-3"
          onClick={addPlaylist}
        >
          Save
        </button>
      </Modal>
    </>
  );
};

export default LeftBar;
