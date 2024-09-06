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
  Tooltip,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "../../../service/index";
import { ExclamationCircleOutlined } from "@ant-design/icons";

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
  useEffect(() => {
    console.log("useEffect");
    getList();
  }, []);
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const getList = () => {
    setLoading(true);
    axios
      .post("/getTreeTable", {})
      .then((response) => {
        setList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  const editItem = (record) => {
    setIsModalOpen(true);

    form.setFieldsValue({
      code: record.code,
      name: record.name,
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
  return (
    <>
      <Table
        columns={columns}
        rowSelection={{
          ...rowSelection,
          // checkStrictly,
        }}
        dataSource={list}
        // rowClassName="editable-row"
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
    </>
  );
};
export default TreeTable;
