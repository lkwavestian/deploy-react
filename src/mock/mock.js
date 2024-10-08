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

Mock.mock("/getServerDeploymentList", [
  {
    name: "任务管理系统",
    type: 1,
    version: "V20240815_002",
    ip: "143.4.208.108",
    code: "PROJECT_MANAGE",
    createTime: "2024-08-10 14:40:34",
    releaseTime: "2024-08-10 14:40:34",
    deployTime: "2024-08-10 14:40:34",
    creator: "张三",
    publishMen: "李四",
    currentStatus: 3, //0 发布失败 1 发布成功 2 未发布 3 正在下载部署文件
  },
  {
    name: "任务管理系统",
    type: 2,
    version: "V20240815_001",
    ip: "143.4.208.108",
    code: "PROJECT_MANAGE",
    createTime: "2024-08-10 14:40:34",
    creator: "张三",
    currentStatus: 2,
  },
  {
    name: "任务管理系统",
    type: 1,
    version: "V20240815_002",
    ip: "143.4.208.108",
    code: "PROJECT_MANAGE",
    createTime: "2024-08-10 14:40:34",
    releaseTime: "2024-08-10 14:40:34",
    deployTime: "2024-08-10 14:40:34",
    creator: "张三",
    publishMen: "李四",
    currentStatus: 0,
  },
  {
    name: "任务管理系统",
    type: 1,
    version: "V20240815_002",
    ip: "143.4.208.108",
    code: "PROJECT_MANAGE",
    createTime: "2024-08-10 14:40:34",
    releaseTime: "2024-08-10 14:40:34",
    deployTime: "2024-08-10 14:40:34",
    creator: "张三",
    publishMen: "李四",
    currentStatus: 1,
  },
]);

Mock.mock("/getTreeTable", [
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
]);
