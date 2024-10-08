import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import styles from "./index.module.css";
import ServerManagement from "../../components/ServerManagement";
import ProjectManagement from "../../components/ProjectManagement";
import ServerDeployment from "../../components/ServerDeployment";
import ProjectDeployment from "../../components/ProjectDeployment";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("升级管理", "uploadManager", <SettingOutlined />, [
    getItem("服务器管理", "1"),
    getItem("项目管理", "2"),
    getItem("部署管理-服务器", "3"),
    getItem("测试", "4"),
  ]),
];

const UploadManager = () => {
  const [currentKey, setCurrentKey] = useState("1");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrentKey(e.key);
  };
  return (
    <div className={styles.wrapper}>
      <Menu
        style={{ width: 256 }}
        inlineCollapsed={false}
        onClick={onClick}
        mode="inline"
        items={items}
        // key={currentKey}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["uploadManager"]}
      />
      <div className={styles.content}>
        {currentKey === "1" ? (
          <ServerManagement />
        ) : currentKey === "2" ? (
          <ProjectManagement />
        ) : currentKey === "3" ? (
          <ServerDeployment />
        ) : (
          <ProjectDeployment />
        )}
      </div>
    </div>
  );
};
export default UploadManager;
