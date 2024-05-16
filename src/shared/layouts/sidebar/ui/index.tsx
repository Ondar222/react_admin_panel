import { FC, useState } from 'react';
import { Menu as AntdMenu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useOnboarding } from '@/processes/onboarding/api/onboardingProvider';
import styled from 'styled-components';
import * as icons from "@ant-design/icons"
import { useAuth } from '@/app/providers/auth/authProvider';

const { CalendarFilled, UserOutlined, LogoutOutlined } = icons


const Menu = styled(AntdMenu)`
  height: 100%;

  .submenu-account .ant-menu-submenu {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const menuItems: ItemType[] = [
  {
    type: "group",
    children: [
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
    ]
  },
  {
    type: "group",
    className: "submenu-account",
    children: [
      {
        key: "account-group",
        icon: <UserOutlined />,
        label: "Аккаунт",
        children: [
          {
            key: '/account',
            icon: <UserOutlined />,
            label: "Профиль"
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: "Выйти"
          },
        ]
      }
    ]
  }
]

export const Sidebar: FC = () => {
  const { logout } = useAuth()
  const [selectedKey, setSelectedKey] = useState('/hotel')
  const { onboardingStatus } = useOnboarding()
  const navigate = useNavigate();

  return (
    <Menu
      disabled={onboardingStatus != "finish"}
      selectedKeys={[`${window.location.pathname}`]}
      defaultSelectedKeys={[selectedKey]}
      onClick={({ key }) => {
        if (key === "logout") {
          logout()
          navigate("/auth")
          return
        }

        setSelectedKey(key)
        navigate(key)
      }}
      items={menuItems}

    >
    </Menu>
  )
}