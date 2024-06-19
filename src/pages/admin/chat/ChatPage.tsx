import React, { useState, useEffect, useRef } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Input, 
  Button, 
  List, 
  Avatar,
  Tag,
  Space,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { io } from 'socket.io-client';
import { MainLayout } from '@/shared/layouts/layout';

interface Message {
  sender: string;
  content: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
  role: 'client' | 'employee'; 
}
export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const socket = useRef<SocketIO.Socket | null>(null);
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    role: 'client', // По умолчанию - клиент
  });

  useEffect(() => {
    // Подключение к серверу Socket.IO
    socket.current = io('http://localhost:4000'); 

    socket.current.on('connect', () => {
      console.log('Connected to server');
    });

    socket.current.on('message', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.current.on('users', (updatedUsers: User[]) => {
      setUsers(updatedUsers);
    });

    // Очистка при размонтировании
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Прокрутка к последнему сообщению
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== '' && user.name !== '') {
      const messageData: Message = {
        sender: user.name,
        content: newMessage.trim(),
        timestamp: Date.now(),
      };

      socket.current?.emit('message', messageData);
      setNewMessage('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userName = e.target.value;
    setUser({ ...user, name: userName });
    socket.current?.emit('user joined', { ...user, name: userName });
  };

  return (
    <MainLayout header={<Typography.Title level={3}>ЧАТ</Typography.Title>}>
        <Row justify="center" align="middle" style={{ height: '80vh' }}>
      <Col span={24}>
        <Card title="Чат" bordered={true}>
          <Space direction="vertical" style={{width: "18vw"}}>
            {!user.name && (
              <Input.Search 
                placeholder="Введите ваше имя"
                onSearch={handleUserChange}
                enterButton
              />
            )}
          </Space>
          <Row gutter={[16, 16]} style={{marginTop: "20px"}}>
            <Col span={6}>
              {/* Список пользователей */}
              <Card title="Пользователи" size="small">
                <List
                  itemLayout="horizontal"
                  dataSource={users}
                  renderItem={(userItem) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={userItem.name}
                        description={
                          <Tag color={userItem.role === 'employee' ? 'green' : 'blue'}>
                            {userItem.role}
                          </Tag>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={24}>
              {/* Список сообщений */}
              <List
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<UserOutlined />}
                          style={{
                            backgroundColor:
                              item.sender === user.name ? '#87d068' : '#1890ff', 
                          }}
                        />
                      }
                      title={item.sender}
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
              <div ref={messageEndRef} /> 
            </Col>
          </Row>
          {/* Поле ввода сообщения */}
          <Row>
            <Col span={24}>
              <Input.TextArea
                value={newMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="Введите сообщение..."
              />
              <Button
                type="primary"
                onClick={sendMessage}
                style={{ marginTop: '8px' }}
                disabled={!user.name}
              >
                Отправить
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    </MainLayout>
  
  );
};

