import { AccountBookFilled, CalendarFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Flex, List, Menu } from "antd";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const menu_items = {

}

const Sidebar: FC = () => {
    const [key, setKey] = useState<string>('booking')
    const navigate = useNavigate()
    return (
        <Menu
            style={{
                position: "sticky",
                top: 0,
            }}
            
            selectedKeys={[key]}
            onClick={(e) => {
                setKey(e.key)
                navigate(`/${e.key}`)
            } }
            onChange={(e) => {
                e.persist()
            }}
            theme="dark"
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
        />
    )
}

export default Sidebar