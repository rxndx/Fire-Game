import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { DownOutlined, GithubOutlined, InfoCircleOutlined, SettingOutlined } from "@ant-design/icons";

const Navigation = () => {
    const location = useLocation();
    const currentKey = location.pathname === "/" ? "1" : location.pathname === "/game-settings" ? "2" : "";

    const menu = (
        <Menu
            theme="dark"
            selectedKeys={[currentKey]}
            style={{ lineHeight: "64px", textAlign: "center" }}
        >
            <Menu.Item key="1">
                <Link to="/">
                    <InfoCircleOutlined style={{ marginRight: "8px" }} />
                    Description
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/game-settings">
                    <SettingOutlined style={{ marginRight: "8px" }} />
                    Game Settings
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <a href="https://github.com/rxndx" target="_blank" rel="noopener noreferrer">
                    <GithubOutlined style={{ marginRight: "8px" }} />
                    Profile
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomCenter">
            <a onClick={(e) => e.preventDefault()} style={{ color: "#ffffff", marginLeft: "20px" }}>
                Menu <DownOutlined />
            </a>
        </Dropdown>
    );
};

export default Navigation;