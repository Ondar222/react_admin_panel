import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Input,
  Button,
  message,
  Space,
  List,
  Avatar,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import io from "socket.io-client";
import { MainLayout } from "@/shared/layouts/layout";

interface Message {
  sender: string;
  content: string;
}

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const messageEndRef = useRef(null);
  const socket = useRef<SocketIO.Socket | null>(null);

  // Загрузка сообщений с localStorage при загрузке страницы
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Сохранение сообщений в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Подключение к серверу Socket.IO
    socket.current = io("http://localhost:3000"); // Замените на адрес вашего сервера

    // Обработчик получения нового сообщения
    socket.current?.on("message", (message: Message) => {
      setMessages([
        ...messages,
        message,
      ]);
    });

    // Очистка подключения при размонтировании компонента
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Автоматически скроллим к последнему сообщению
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== "" && userName !== "") {
      // Отправка сообщения на сервер
      socket.current?.emit("message", {
        sender: userName,
        content: newMessage.trim(),
      });

      // Добавление сообщения в список сообщений
      setMessages([
        ...messages,
        { sender: userName, content: newMessage.trim() },
      ]);
      setNewMessage("");
    } else {
      message.warning("Введите имя пользователя и сообщение!");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  return (<MainLayout header={<Typography.Title level={2}>Чат</Typography.Title>}>
    <div className="chat-app">
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col span={24}>
          <Card title="Чат" bordered={true}>
            <Space direction="vertical">
              <Input
                placeholder="Введите имя пользователя"
                value={userName}
                onChange={handleUserNameChange}
              />
            </Space>
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<UserOutlined />}
                        style={{ backgroundColor: "#87d068" }}
                      />
                    }
                    title={item.sender}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
            <div ref={messageEndRef} />
          </Card>
          <Space style={{ marginTop: 16 }}>
            <Input style={{width: "70vw"}}
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <Button type="primary" onClick={sendMessage}>
              Отправить
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
    </MainLayout>
  );
};

export default ChatPage;