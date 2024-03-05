// import './App.css';
import { FC, useEffect, useState } from 'react';
import "../../../../app/styles/sidebar.css";
import { Menu } from 'antd';
import {  useNavigate } from 'react-router-dom';
import { CalendarFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";


const Sidebar: FC = () => {
  return (
 
        <div style={{width: "100%"}}>
            <SideMenu />
            </div>
      )
  
};


function SideMenu<FC>(){
  const [selected, setSelected] = useState('/booking')
  const navigate = useNavigate();

  useEffect(() => {
    setSelected(`/${window.location.pathname.split("/")[2]}`)
  },[])

  return (
    
    <Menu 
    
      style={{
        padding: "20px 20px", 
        // background: "#2c94f5"
      }}
      theme='dark'
      selectedKeys={[`/${window.location.pathname.split("/")[2]}`]}
      defaultSelectedKeys={[selected]}
      onClick={({ key }) => {
        
          setSelected(key)
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
                        icon: <CalendarFilled/>,
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

















// import React, { FC, useState } from 'react';
// import { CalendarFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
// import type { MenuProps } from 'antd';
// import { Menu } from 'antd';
// import { useNavigate } from 'react-router-dom';


// type MenuItem = Required<MenuProps>['items'][number];

// function getItem(
//     label: string,
//     key: string,
//     icon: React.ReactNode,
// ): MenuItem {
//     return {
//         key,
//         icon,
//         label,
//     } as MenuItem;
// }

// const items:  MenuItem[] = [
//     getItem('Бронь', 'booking', <CalendarFilled />),
//     getItem('Номера', 'room', <CalendarFilled />),
//     getItem('Отель', 'hotel', <CalendarFilled />),
//     getItem('Аккаунт', 'account', <UserOutlined />),
//     { type: "divider" },
//     getItem('Выйти', 'logout', <LogoutOutlined />),
// ];

// const Sidebar: FC = () => {
//     const [collapsed, setCollapsed] = useState(false);
//     const [key, setKey] = useState<string>('booking')
//     const navigate = useNavigate()

//     return (
//         <div style={{ padding: "20px 20px" }}>

//             <Menu
//                 defaultSelectedKeys={['key']}
//                 defaultOpenKeys={['key']}
//                 mode="inline"
//                 theme="dark"
//                 inlineCollapsed={collapsed}
//                 onClick={(e) => {
//                     setKey(e.key)
//                     navigate(`/${e.key}`)
//                 }}
//                 onChange={(e) => {
//                     e.persist()
//                 }}
                
//                 items={[
                
//                     {

//                         key: 'booking',
//                         icon: <CalendarFilled />,
//                         label: "Бронь",

//                     },
//                     {
//                         key: 'room',
//                         icon: <CalendarFilled />,
//                         label: "Номера"
//                     },
//                     {
//                         key: "hotel",
//                         icon: <CalendarFilled />,
//                         label: "Отель"
//                     },
//                     {
//                         key: "account",
//                         icon: <UserOutlined />,
//                         label: "Аккаунт"
//                     },

//                     { type: "divider" },

//                     {
//                         key: 'logout',
//                         icon: <LogoutOutlined />,
//                         label: "Выйти"
//                     },
                
//                 ]}
              
              
//             />
//              <>

//     </>
//         </div>
        
//     );
// };

// export default Sidebar;


