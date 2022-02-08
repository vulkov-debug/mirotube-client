import React from "react";
import { Menu, Input, AutoComplete, Dropdown, Button } from "antd";
import Link from "next/link";

const { Item } = Menu;

const TopNav = () => {

    const menu = (
        <Menu>
          <Menu.Item>
           <Link href='/login'><a className="d-flex justify-content-center"><b>Login</b></a></Link>
          </Menu.Item>
          <Menu.Item>
           <Link href='/register'><a className="d-flex justify-content-center"><b>Register</b></a></Link>
          </Menu.Item>
        </Menu>
      );

  return (
    <Menu mode="horizontal inline" theme="dark" className="d-flex">
      <Item className="mr-2">
        <Link href="/">
          <a>MiroTube</a>
        </Link>
      </Item>
      <Item className="mr-2">
        <Link href="/popular">
          <a> Popular</a>
        </Link>
      </Item>
      <Item className="mr-2">
        <Link href="/newest">
          <a>Newest</a>
        </Link>
      </Item>

      <AutoComplete style={{ width: 600 }} className=" m-auto ">
        <Input.Search size="medium" placeholder="input here" />
      </AutoComplete>

      <Dropdown overlay={menu} placement="bottomCenter">
       <Item>Not logged in</Item>
      </Dropdown>
    </Menu>
  );
};

export default TopNav;
