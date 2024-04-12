import { FC, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CalendarFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useOnboarding } from '@/processes/onboarding/api/onboardingProvider';
import { useAuth } from '@/features/auth';

const menuItems: ItemType[] = [
  {

    key: '/booking',
    icon: <CalendarFilled />,
    label: "Бронь"
  },
  {
    key: '/room',
    icon: <CalendarFilled />,
    label: "Номера"
  },
  {
    key: "/hotel",
    icon: <CalendarFilled />,
    label: "Отель"
  },
  {
    key: "/account",
    icon: <UserOutlined />,
    label: "Аккаунт"
  },

  { type: "divider" },

  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: "Выйти"
  },
]

export const Sidebar: FC = () => {
  const { logout } = useAuth()
  const [selectedKey, setSelectedKey] = useState('/hotel')
  const { onboardingStatus } = useOnboarding()
  const navigate = useNavigate();


  useEffect(() => {
    setSelectedKey(`/${window.location.pathname.split("/")[2]}`)
  }, [])

  return (
    <Menu
      disabled={onboardingStatus != "finish"}
      theme='dark'
      selectedKeys={[`/${window.location.pathname.split("/")[2]}`]}
      defaultSelectedKeys={[selectedKey]}
      onClick={({ key }) => {
        if (key === "logout") {
          logout()
          navigate("/auth")
          return
        }

        setSelectedKey(key)
        navigate(`/${key}`)
      }}
      items={menuItems}>
    </Menu>
  )
}