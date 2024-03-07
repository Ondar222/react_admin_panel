import { FC, useEffect, useState } from 'react';
import "../../../../app/styles/sidebar.css";
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CalendarFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";


const Sidebar: FC = () => {

  return (
    <div className='sidebar_class'>
      <SideMenu />
    </div>
  )

};



function SideMenu<FC>() {
  const [state, setState] = useState('/booking')
  const navigate = useNavigate();


  useEffect(() => {
    setState(`/${window.location.pathname.split("/")[2]}`)
  }, [])

  return (

    <Menu className='menu_sidebar'
      theme='dark'
      selectedKeys={[`/${window.location.pathname.split("/")[2]}`]}
      defaultSelectedKeys={[state]}
      onClick={({ key }) => {

        setState(key)
        navigate(`/${key}`)

      }}

      items={[
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

      ]}>
    </Menu>
  )
}


export default Sidebar;