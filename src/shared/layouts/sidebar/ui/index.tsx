import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SelectOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Divider, Menu, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AccountBookFilled, CalendarFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}



const Sidebar: React.FC = () => {
    const [theme, setTheme] = useState<MenuTheme>('dark');
    const [current, setCurrent] = useState('1');
    const [key, setKey] = useState<string>('booking')
    const navigate = useNavigate()

    return (
        <>
            <Menu style={{padding: "20px 20px"}}
                theme={'dark'}
                mode='inline'
                onClick={(e) => {
                    setKey(e.key)
                    navigate(`/${e.key}`)
                }}
                onChange={(e) => {
                    e.persist()
                }}
                items={[
                    {
                    
                        key: 'booking',
                        icon: <CalendarFilled />,
                        label: "Бронь"
                    },
                    {
                        key: 'room',
                        icon: <CalendarFilled />,
                        label: "Номера"
                    },
                    {
                        key: "hotel",
                        icon: <CalendarFilled />,
                        label: "Отель"
                    },
                    {
                        key: "account",
                        icon: <UserOutlined />,
                        label: "Аккаунт"
                    },

                    { type: "divider" },

                    {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: "Выйти"
                    },
                ]}
            ></Menu>
        </>
    );
};

export default Sidebar;


