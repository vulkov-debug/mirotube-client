import React from 'react';
import {Menu} from 'antd'
import {PieChartOutlined, DesktopOutlined, MailOutlined, AppstoreOutlined, PlusOutlined, UnorderedListOutlined, UploadOutlined, PlayCircleOutlined } from '@ant-design/icons'
import {useRouter} from 'next/router'

const {SubMenu} = Menu

const LeftBar = () => {

  const router = useRouter()
  return <>
  <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        //   inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<PlayCircleOutlined />} onClick={()=> router.push('/my-videos')}>
            My videos
          </Menu.Item>
          <Menu.Item key="2" icon={<UploadOutlined />} onClick={()=> router.push('/upload-video')}>
            Upload video
          </Menu.Item>
          <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="My playlists">
            <Menu.Item key="5" icon={<PlusOutlined />}>Add new Playlist</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
  </>;
};

export default LeftBar;
