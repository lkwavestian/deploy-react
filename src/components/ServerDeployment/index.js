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
  Divider,
  Row,
  Col,
  Popover,
  Tooltip,
  Spin,
} from "antd";
import {
  CloseCircleOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  FormOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
function ProjectManagement() {
  useEffect(() => {
    console.log("useEffect");
    getList();
  }, []);

  const [form] = Form.useForm();
  const { confirm } = Modal;
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("");
  const [status, setStatus] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectListItemID, setSelectListItemID] = useState(0);

  const getList = () => {
    setLoading(true);
    axios
      .post("/getServerDeploymentList", {
        name,
        creator,
        type,
        status,
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
    setCreator("");
    setType(undefined);
    setStatus(undefined);
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
            <Tooltip title={item.bottomText}>
              <span className={styles.overflowHidden}>{item.bottomText}</span>
            </Tooltip>
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
                style={{
                  width: 120,
                }}
                placeholder="请输入项目名称"
                onChange={(e) => setName(e.target.value)}
                onPressEnter={() => getList()}
                value={name}
              />
            </div>
            <div className={styles.searchItem}>
              <span className={styles.text}>创建人：</span>
              <Input
                style={{
                  width: 120,
                }}
                placeholder="请输入创建人"
                onChange={(e) => setCreator(e.target.value)}
                onPressEnter={() => getList()}
                value={creator}
              />
            </div>
            <div className={styles.searchItem}>
              <span className={styles.text}>部署类型：</span>
              <Select
                style={{
                  width: 150,
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
            <div className={styles.searchItem}>
              <span className={styles.text}>发布状态：</span>
              <Select
                style={{
                  width: 150,
                }}
                placeholder="请选择发布状态"
                onChange={(value) => setStatus(value)}
                options={[
                  {
                    value: "0",
                    label: "未发布",
                  },
                  {
                    value: "1",
                    label: "发布成功",
                  },
                  {
                    value: "2",
                    label: "发布失败",
                  },
                ]}
                value={status}
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
        <Spin spinning={loading}>
          <div className={styles.listWrapper}>
            {list.map((item) => {
              return (
                <div className={styles.listItem}>
                  <div className={styles.listHeader}>
                    <div className={styles.leftPart}>
                      <div>{item.name}</div>
                      <div>
                        {item.type === 1 ? (
                          <Badge count="前端" color="rgb(47, 122, 246)" />
                        ) : (
                          <Badge count="后端" color="rgb(245, 103, 0)" />
                        )}
                      </div>
                      <Tag color="#cd201f" style={{ borderRadius: 10 }}>
                        {item.version}
                      </Tag>
                      <Popover content="其他信息...." trigger="click">
                        <InfoCircleOutlined />
                      </Popover>
                    </div>
                    <div className={styles.rightPart}>
                      <CloseOutlined />
                    </div>
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={styles.listMain}>
                    <div className={styles.listMainItem}>
                      <div className={styles.spanItem}>
                        <span>服务器IP</span>
                        <span>{item.ip}</span>
                      </div>
                      <div className={styles.spanItem}>
                        <span>项目编码</span>
                        <span>{item.code}</span>
                      </div>
                      <div className={styles.spanItem}>
                        <span>部署文件</span>
                        <span>文件相关..</span>
                      </div>
                    </div>
                    <Divider
                      type="vertical"
                      style={{ margin: 0, height: "100%" }}
                    />

                    <div
                      className={styles.listMainItem + " " + styles.middle}
                      style={{ flexGrow: 1, paddingLeft: 30, paddingRight: 30 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <div className={styles.spanItem}>
                          <span>创建时间</span>
                          <span>{item.createTime}</span>
                        </div>
                        <div className={styles.spanItem}>
                          <span>发布时间</span>
                          <span>{item.releaseTime}</span>
                        </div>
                        <div className={styles.spanItem}>
                          <span>部署时间</span>
                          <span>{item.deployTime}</span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <div className={styles.spanItem}>
                          <span>创建人</span>
                          <span>{item.creator}</span>
                        </div>
                        <div className={styles.spanItem}>
                          <span>发布人</span>
                          <span>{item.publishMen}</span>
                        </div>
                      </div>
                    </div>
                    <Divider
                      type="vertical"
                      style={{ margin: 0, height: "100%" }}
                    />

                    <div
                      className={styles.listMainItem}
                      style={{ flexBasis: 150 }}
                    >
                      <span style={{ fontSize: 12 }}>当前状态</span>
                      {item.currentStatus === 0 ? (
                        <span style={{ color: "red" }}>
                          发布失败
                          <Popover content="失败原因...." trigger="click">
                            <InfoCircleOutlined />
                          </Popover>
                        </span>
                      ) : item.currentStatus === 1 ? (
                        <span style={{ color: "green" }}>发布成功</span>
                      ) : item.currentStatus === 2 ? (
                        <span>未发布</span>
                      ) : (
                        <span style={{ color: "#0d3abf" }}>
                          正在下载部署文件
                        </span>
                      )}
                    </div>
                    <Divider
                      type="vertical"
                      style={{ margin: 0, height: "100%" }}
                    />

                    <div className={styles.listMainItem}>
                      {item.currentStatus === 0 || item.currentStatus === 2 ? (
                        <Fragment>
                          <Button
                            icon={<UploadOutlined />}
                            style={{
                              backgroundColor: "#198754",
                              color: "white",
                            }}
                          >
                            发布
                          </Button>
                          <Button
                            icon={<FormOutlined />}
                            style={{
                              backgroundColor: "#0d6efd",
                              color: "white",
                            }}
                          >
                            编辑
                          </Button>
                        </Fragment>
                      ) : item.currentStatus === 3 ? (
                        <Button
                          icon={<CloseCircleOutlined />}
                          style={{
                            backgroundColor: "rgb(246, 131, 47)",
                            color: "white",
                          }}
                        >
                          取消
                        </Button>
                      ) : (
                        <Button
                          icon={<UploadOutlined />}
                          style={{ backgroundColor: "#198754", color: "white" }}
                        >
                          发布
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Spin>

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
