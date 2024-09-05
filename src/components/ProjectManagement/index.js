import React, { Fragment, useState, useEffect } from "react";
import styles from "./index.module.css";
import axios from "../../service/index";
import {
  Button,
  Input,
  Table,
  Tag,
  Modal,
  Form,
  Select,
  Badge,
  Radio,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
function ProjectManagement() {
  useEffect(() => {
    console.log("useEffect");
    getList();
  }, []);

  const columns = [
    {
      title: "项目名称",
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
      render: (text) => {
        return text === 1 ? (
          <Badge count="前端" color="rgb(47, 122, 246)" />
        ) : (
          <Badge count="后端" color="rgb(245, 103, 0)" />
        );
      },
    },
    {
      title: "服务器IP",
      dataIndex: "ip",
      key: "ip",
      align: "center",
      render: (text) => {
        return <Tag color="blue">{text}</Tag>;
      },
    },
    {
      title: "当前版本号",
      dataIndex: "version",
      key: "version",
      align: "center",
      render: (text) => {
        return (
          <Tag color="#cd201f" style={{ borderRadius: 10 }}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "上次部署时间",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        return (
          <div>
            <Button onClick={() => editItem(record)}>编辑</Button>
            <Button
              type="primary"
              danger
              style={{ marginLeft: 10 }}
              onClick={showDeleteConfirm}
            >
              删除
            </Button>
          </div>
        );
      },
      align: "center",
    },
  ];
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [type, setType] = useState(undefined);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectListItemID, setSelectListItemID] = useState(0);

  const getList = () => {
    setLoading(true);
    axios
      .post("/getProjectManagementList", {
        name,
        ip,
        type,
      })
      .then((response) => {
        setList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  const reset = () => {
    setName("");
    setIp("");
    setType(undefined);
    getList("");
  };

  const closeModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("values :>> ", values);
        closeModal();
        getList();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const editItem = (record) => {
    console.log("record :>> ", record);
    console.log("selectListItemID :>> ", selectListItemID);
    setIsModalOpen(true);
    form.setFieldsValue({
      code: record.code,
      name: record.name,
      service: String(selectListItemID),
      type: String(record.type),
    });
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "确认要删除这项吗?",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        getList();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const getListItme = () => {
    const listData = [
      {
        id: 0,
        topText: "所有服务器",
      },
      {
        id: 1,
        topText: "127.0.0.1",
        bottomText: "本地服务器",
      },
      {
        id: 2,
        topText: "143.4.208.108",
        bottomText: "任务管理系统、终端服务器",
      },
      {
        id: 3,
        topText: "143.4.208.111 ",
        bottomText: "执行辅助、SASS系统辅助",
      },
      {
        id: 4,
        topText: "143.4.208.12",
        bottomText: "临时服务器",
      },
      {
        id: 5,
        topText: "143.4.208.13",
        bottomText: "中转、备份、nginx",
      },
    ];
    return (
      <Fragment>
        {listData.map((item) => (
          <div
            className={styles.listItem}
            onClick={() => listItemClick(item)}
            style={{
              fontSize: item.id === 0 ? 16 : 14,
              fontWeight: selectListItemID === item.id ? 700 : 400,
            }}
          >
            <span>{item.topText}</span>
            <span>{item.bottomText}</span>
          </div>
        ))}
      </Fragment>
    );
  };

  const listItemClick = (item) => {
    setSelectListItemID(item.id);
    getList();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>{getListItme()}</div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.searchItem}>
              <span className={styles.text}>项目名称：</span>
              <Input
                placeholder="请输入项目名称"
                onChange={(e) => setName(e.target.value)}
                onPressEnter={() => getList()}
                value={name}
              />
            </div>
            <div className={styles.searchItem}>
              <span className={styles.text}>项目编码：</span>
              <Input
                placeholder="请输入项目编码"
                onChange={(e) => setIp(e.target.value)}
                onPressEnter={() => getList()}
                value={ip}
              />
            </div>
            <div className={styles.searchItem}>
              <span className={styles.text}>部署类型：</span>
              <Select
                style={{
                  width: 120,
                }}
                placeholder="请选择部署类型"
                onChange={(value) => setType(value)}
                options={[
                  {
                    value: "1",
                    label: "前端",
                  },
                  {
                    value: "2",
                    label: "后端",
                  },
                ]}
                value={type}
              />
            </div>
            <Button
              style={{ backgroundColor: "rgb(26, 179, 148)", color: "white" }}
              onClick={() => getList()}
            >
              搜索
            </Button>
            <Button
              style={{ backgroundColor: "rgb(247, 165, 74)", color: "white" }}
              onClick={reset}
            >
              重置
            </Button>
          </div>
          <div className={styles.headerRight}>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              新增
            </Button>
          </div>
        </div>
        <Table
          dataSource={list}
          columns={columns}
          key="id"
          style={{ marginTop: 10 }}
          pagination={false}
          loading={loading}
        />
        {isModalOpen && (
          <Modal
            title="新增项目"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={closeModal}
            okText="确认"
            cancelText="取消"
          >
            <Form
              form={form}
              name="addService"
              initialValues={{ remember: true }}
              autoComplete="off"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              colon={true}
            >
              <Form.Item
                label="服务器"
                name="service"
                rules={[{ required: true, message: "服务器是必填项" }]}
              >
                <Select
                  options={[
                    {
                      value: "1",
                      label: "127.0.0.1(本地服务器)",
                    },
                    {
                      value: "2",
                      label: "143.4.208.108(任务管理系统、终端服务器)",
                    },

                    {
                      value: "3",
                      label: "143.4.208.111(执行辅助、SASS系统辅助)",
                    },
                    {
                      value: "4",
                      label: "143.4.208.12(临时服务器)",
                    },
                    {
                      value: "5",
                      label: "143.4.208.13(中转、备份、nginx)",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="部署类型"
                name="type"
                rules={[{ required: true, message: "部署是必填项！" }]}
              >
                <Radio.Group>
                  <Radio value={"1"}>前端</Radio>
                  <Radio value={"2"}>后端</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="项目名称"
                name="name"
                rules={[{ required: true, message: "项目名称是必填项！" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="项目编码"
                name="code"
                rules={[{ required: true, message: "项目编码是必填项！" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="描述" name="describe">
                <Input.TextArea />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ProjectManagement;
