import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  Button,
  Row,
  Col,
  Space,
  message,
  List,
  Avatar,
  Typography,
  Select,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MainLayout } from "@/shared/layouts/layout";

interface ChatMessage {
  text: string;
  sender: "user" | "admin" | "manager" | "client";
  role: string;
}

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([
        ...messages,
        {
          text: inputText.trim(),
          sender: selectedRole,
          role: selectedRole, // Присвоить роли имя отправителя
        },
      ]);
      setInputText("");
    }
  };

  const renderMessage = (message: ChatMessage) => {
    const avatarStyle = {
      backgroundColor:
        message.sender === "user"
          ? "#87d068"
          : message.sender === "admin"
          ? "#ff4d4d"
          : message.sender === "manager"
          ? "#1890ff"
          : message.sender === "client"
          ? "#faad14"
          : "#87d068", // Color for admin, manager, and client
      verticalAlign: "middle",
    };

    let roleName = message.role;
    if (message.sender === "user") {
      roleName = "Вы";
    }

    return (
      <List.Item
        key={message.text}
        style={{
          textAlign: message.sender === "user" ? "right" : "left",
          marginBottom: "10px",
        }}
      >
        <List.Item.Meta
          avatar={
            <Avatar style={avatarStyle} size="small" icon={<UserOutlined />} />
          }
          title={
            <Typography.Text
              style={{
                color:
                  message.sender === "user"
                    ? "#1890ff"
                    : message.sender === "admin"
                    ? "#fff"
                    : message.sender === "manager"
                    ? "#fff"
                    : message.sender === "client"
                    ? "#fff"
                    : "#fff", // Color for admin, manager, and client
                fontWeight: "bold",
                verticalAlign: "middle",
              }}
            >
              {roleName}
            </Typography.Text>
          }
          description={message.text}
        />
      </List.Item>
    );
  };

  return (
    <MainLayout header={<Typography.Title level={3}>ЧАТ</Typography.Title>}>
      <Col
        span={24}
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Select
              defaultValue="user"
              onChange={(value) => setSelectedRole(value)}
            >
              <Select.Option value="user">Пользователь</Select.Option>
              <Select.Option value="admin">Администратор</Select.Option>
              <Select.Option value="manager">Менеджер</Select.Option>
              <Select.Option value="client">Клиент</Select.Option>
            </Select>
          </Col>
        </Row>

        <List
          ref={chatContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            marginBottom: "10px",
          }}
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={renderMessage}
        />

        <Row gutter={[16, 16]}>
          <Col span={20}>
            <Input
              placeholder="Введите сообщение..."
              value={inputText}
              onChange={handleInputChange}
            />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={handleSendMessage}>
              Отправить
            </Button>
          </Col>
        </Row>
      </Col>
    </MainLayout>
  );
};


