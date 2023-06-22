import { Button, Menu, Typography, Avatar } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  const outsideClick = () => {
    if (screenSize < 768) {
      setActiveMenu(false);
    }
  }

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const { pathname } = useLocation();

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <NavLink to="/">Cryptoverse</NavLink>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark" selectedKeys={[pathname]} onClick={outsideClick}>
          <Menu.Item icon={<HomeOutlined />} key="/">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key="/cryptocurrencies">
            <NavLink to="/cryptocurrencies">Cryptocurrencies</NavLink>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />} key="/exchanges">
            <NavLink to="/exchanges">Tokens list</NavLink>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />} key="/news">
            <NavLink to="/news">News</NavLink>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};
