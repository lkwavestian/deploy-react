import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "../../service/index";
import { Button, Input, Table, Tag, Modal, Form } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function ServerManagement() {
  useEffect(() => {
    console.log("useEffect");
    getList();
  }, []);

  const columns = [
    {
      title: "服务器名称",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "服务器IP",
      dataIndex: "ip",
      key: "ip",
      render: (_, record) => {
        return (
          <Tag color="blue" key={record.ip}>
            {record.ip}
          </Tag>
        );
      },
      align: "center",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
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
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getList = () => {
    setLoading(true);
    axios
      .post("/getServerManagementList", {
        name,
        ip,
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
    setIsModalOpen(true);
    form.setFieldsValue({
      ip: record.ip,
      name: record.name,
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.searchItem}>
            <span className={styles.text}>服务器名称：</span>
            <Input
              placeholder="请输入服务器名称"
              onChange={(e) => setName(e.target.value)}
              onPressEnter={() => getList()}
              value={name}
            />
          </div>
          <div className={styles.searchItem}>
            <span className={styles.text}>服务器IP：</span>
            <Input
              placeholder="请输入服务器IP"
              onChange={(e) => setIp(e.target.value)}
              onPressEnter={() => getList()}
              value={ip}
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
        <div className={styles.right}>
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
          title="新增服务器"
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
              label="服务器名称"
              name="name"
              rules={[{ required: true, message: "服务器名称是必填项！" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="服务器IP"
              name="ip"
              rules={[{ required: true, message: "服务器IP是必填项！" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default ServerManagement;
