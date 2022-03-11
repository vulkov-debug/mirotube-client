import React, {useContext, useState, useEffect}  from "react";
import { Menu, Input, AutoComplete, Dropdown, Button } from "antd";
import Link from "next/link";
import { Context } from "../context";
import { toast } from "react-toastify";
import axios from "axios";
import {PlayCircleOutlined} from '@ant-design/icons'


const { Item } = Menu;

const TopNav = () => {

  const [current, setCurrent] = useState([]);

  const {state: {user}, dispatch} = useContext(Context)

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    try {
      dispatch({type:"LOGOUT", payload: null})
      localStorage.removeItem('user')
      await axios.get('/api/logout')
      toast('User logout successfull')
    } catch (error) {
      toast.error('Error logout')
    }
  } 


    const menu = (
        <Menu >
          {!user ? <><Menu.Item key='login'>
           <Link href='/login'><a className="d-flex justify-content-center"><b>Login</b></a></Link>
          </Menu.Item>
          <Menu.Item key='/register'>
           <Link href='/register'><a className="d-flex justify-content-center"><b>Register</b></a></Link>
          </Menu.Item></> : 
          <>
          <Menu.Item key='/details'>
          <Link href='/user-details'><a className="d-flex justify-content-center"><b>User details</b></a></Link>
         </Menu.Item>
         <Menu.Item key='logout'>
          <div onClick={logout}><b>Logout</b></div>
         </Menu.Item>
          </>
          }
        </Menu>
      );

  return (
    <div className="container-fluid p-0">

    <Menu mode="horizontal inline" theme="dark" className="d-flex" selectedKeys={[current]}>
      <div className="ml-4 mr-3 text-danger h3 mt-1" >
      <PlayCircleOutlined />
      </div>
      <Item className="mr-2" key='/popular'>
        <Link href="/popular">
          <a> Popular</a>
        </Link>
      </Item>
      <Item className="mr-2" key='/newest'>
        <Link href="/newest">
          <a>Newest</a>
        </Link>
      </Item>
      <Item className="mr-2" key='/highest-rated'>
        <Link href="/highest-rated">
          <a>Highest rated</a>
        </Link>
      </Item>
      {user && <AutoComplete style={{ width: 600 }} className=" m-auto">
        <Input.Search size="medium" placeholder="Search here" />
      </AutoComplete>
}
      <Dropdown overlay={menu} placement="bottomRight" className="ml-auto">
       <Item>{user ? user.name : "Not logged in"}</Item>
      </Dropdown>
    </Menu>
    </div>
  );
};

export default TopNav;
