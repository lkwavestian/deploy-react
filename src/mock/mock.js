import Mock from "mockjs";

Mock.mock("/getServerManagementList", [
  {
    id: 1,
    name: "任务管理系统服务器",
    ip: "143.4.2.8.109",
    remark: "内置mysql、redis",
    createTime: "2024-08-15 14:40:34",
  },
  {
    id: 2,
    name: "本地服务器",
    ip: "127.0.0.1",
    remark: "本地",
    createTime: "2024-08-15 14:40:34",
  },
  {
    id: 3,
    name: "终本续管",
    ip: "143.4.2.8.109",
    remark: "内置mysql、redis",
    createTime: "2024-08-15 14:21:55",
  },
  {
    id: 4,
    name: "终本续管",
    ip: "143.4.2.8.109",
    remark: "内置mysql、redis",
    createTime: "2024-08-14 14:40:00",
  },
  {
    id: 5,
    name: "文本预览服务",
    ip: "143.4.2.8.109",
    remark: "测试服务器",
    createTime: "2024-08-15 14:40:34",
  },
]);

Mock.mock("/getProjectManagementList", [
  {
    name: "任务管理系统",
    code: "PROJECT_MANAGE",
    type: 1,
    ip: "143.4.2.8.109",
    version: "V20240815_002",
    time: "2024-08-10 14:40:34",
  },
  {
    name: "任务管理系统",
    code: "PROJECT_MANAGE",
    type: 2,
    ip: "143.4.2.8.109",
    version: "V20240815_002",
    time: "2024-08-10 14:40:34",
  },
  {
    name: "终本续管",
    code: "ZBXG",
    type: 1,
    ip: "143.4.2.8.109",
    version: "V20240815_012",
    time: "2024-08-10 14:40:34",
  },
  {
    name: "终本续管",
    code: "ZBXG",
    type: 2,
    ip: "143.4.2.8.109",
    version: "V20240815_002",
    time: "2024-08-14 14:40:00",
  },
  {
    name: "文本预览服务",
    code: "FILE_VIEW",
    type: 2,
    ip: "143.4.2.8.109",
    version: "V20240815_001",
    time: "2024-08-14 14:40:34",
  },
]);
