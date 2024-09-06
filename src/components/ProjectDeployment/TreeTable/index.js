import { Button, Space, Switch, Table, Badge } from "antd";
import React, { useState } from "react";

const columns = [
  {
    title: "服务器项目/名称",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "项目编码",
    dataIndex: "code",
    key: "code",
    align: "center",
  },
  {
    title: "部署类型",
    dataIndex: "type",
    key: "type",
    align: "center",
    render: (text) => {
      return text === 1 ? (
        <Badge count="前端" color="rgb(47, 122, 246)" />
      ) : text === 2 ? (
        <Badge count="后端" color="rgb(245, 103, 0)" />
      ) : (
        ""
      );
    },
  },
  { title: "服务器IP", dataIndex: "ip", key: "ip", align: "center" },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: (_, record) => {
      return (
        <div>
          {/* <Button onClick={() => editItem(record)}>编辑</Button> */}
          <Button>编辑</Button>
          <Button
            type="primary"
            danger
            style={{ marginLeft: 10 }}
            // onClick={showDeleteConfirm}
          >
            删除
          </Button>
        </div>
      );
    },
    align: "center",
  },
];
const data = [
  {
    key: 1,
    name: "本地服务器",
    ip: "1.27.20.7",
    children: [
      {
        key: 11,
        name: "本地服务器A",
        ip: "1.27.20.7",
        code: "ZBXG",
        type: 1,
      },
      {
        key: 12,
        name: "本地服务器B",
        ip: "1.27.20.7",
        code: "PROJECT_MANAGE",
        type: 1,
      },
    ],
  },
  {
    key: 2,
    name: "143.4.208.108",
    ip: "143.4.208.108",
    children: [
      {
        key: 21,
        name: "任务管理系统",
        code: "FILE_VIEW",
        ip: "143.4.208.108",
        type: 2,
      },
      {
        key: 22,
        name: "终端服务器",
        code: "ZBXG",
        ip: "143.4.208.108",
        type: 1,
      },
    ],
  },
  {
    key: 3,
    name: "143.4.208.111",
    ip: "143.4.208.111",
    children: [
      {
        key: 31,
        name: "执行辅助",
        code: "PROJECT_MANAGE",
        ip: "143.4.208.111",
        type: 1,
      },
      {
        key: 32,
        name: "文本预览服务",
        code: "FILE_VIEW",
        ip: "143.4.208.111",
        type: 2,
      },
    ],
  },
  {
    key: 4,
    name: "143.4.208.13",
    ip: "143.4.208.13",
    children: [
      {
        key: 41,
        name: "中转",
        code: "PROJECT_MANAGE",
        ip: "143.4.208.13",
        type: 1,
      },
      {
        key: 42,
        name: "备份",
        code: "ZBXG",
        ip: "143.4.208.13",
        type: 2,
      },
      {
        key: 43,
        name: "Nginx代理",
        code: "PROJECT_MANAGE",
        ip: "143.4.208.13",
        type: 2,
      },
    ],
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
const TreeTable = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  return (
    <>
      <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      >
        CheckStrictly:{" "}
        <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
      <Table
        columns={columns}
        rowSelection={{
          ...rowSelection,
          checkStrictly,
        }}
        dataSource={data}
        // rowClassName="editable-row"
      />
    </>
  );
};
export default TreeTable;
