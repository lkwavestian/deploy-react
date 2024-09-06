import { DownOutlined, FormOutlined, UpOutlined } from "@ant-design/icons";
import { Divider, Tree, Tabs } from "antd";
import React, { useState, useRef } from "react";
import styles from "./index.module.css";
import lodash from "lodash";
import ServerManagement from "../ServerManagement";
import TreeTable from "./TreeTable";
const treeData = [
  {
    title: "服务器升级管理",
    key: "0-0",
    children: [
      {
        title: "127.0.0.1（本地服务器）",
        key: "0-0-0",
        children: [
          {
            title: "本地项目A",
            key: "0-0-0-0",
          },
          {
            title: "leaf",
            key: "本地项目B",
          },
        ],
      },
      {
        title: "143.4.208.108",
        key: "0-0-1",
        children: [
          {
            title: "leaf",
            key: "任务管理系统",
          },
          {
            title: "leaf",
            key: "终端服务器",
          },
        ],
      },
      {
        title: "143.4.208.111",
        key: "0-0-2",
        children: [
          {
            title: "执行辅助",
            key: "0-0-2-0",
          },
          {
            title: "SASS系统辅助",
            key: "0-0-2-1",
          },
        ],
      },
      {
        title: "143.4.208.13",
        key: "0-0-3",
        children: [
          {
            title: "中转",
            key: "0-0-3-0",
          },
          {
            title: "备份",
            key: "0-0-3-1",
          },
          {
            title: "Nginx代理",
            key: "0-0-3-2",
          },
        ],
      },
    ],
  },
];

const defaultPanes = [
  {
    label: `服务器管理`,
    children: <ServerManagement />,
    key: "serviceManager",
  },
];
const ProjectDeployment = () => {
  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-3"]);
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
  };

  const toggleExpandAll = (toggle) => {
    if (toggle) {
      setExpandedKeys([]);
    } else {
      setExpandedKeys(["0-0-0", "0-0-1", "0-0-2", "0-0-3", "0-0"]);
    }
  };

  const onChange = (key) => {
    setActiveKey(key);
  };
  const add = () => {
    if (items.map((item) => item.key).includes("projectManager")) {
      return;
    }
    const newActiveKey = `projectManager`;
    setItems([
      ...items,
      {
        label: "项目管理",
        children: <TreeTable />,
        key: newActiveKey,
      },
    ]);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.topMenu}>
          <span></span>
          <span>升级管理</span>
          <FormOutlined style={{ cursor: "pointer" }} onClick={() => add()} />
          {expandedKeys.includes("0-0") ? (
            <UpOutlined onClick={() => toggleExpandAll(true)} />
          ) : (
            <DownOutlined onClick={() => toggleExpandAll(false)} />
          )}
        </div>
        <Divider />
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          expandedKeys={expandedKeys}
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      </div>
      <div className={styles.right}>
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
          items={items}
        />
      </div>
    </div>
  );
};
export default ProjectDeployment;
