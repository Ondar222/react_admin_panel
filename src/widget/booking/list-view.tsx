import React, { FC, useEffect, useState } from "react"
import { Space, Table, Divider } from 'antd';
import type { TableProps } from 'antd';
import { V2_Booking } from "@/entities/booking";
import { RoomLock } from "@/entities/room/model/interface";
import moment from "moment-timezone";
import { Link } from "react-router-dom";




const columns: TableProps<{
  type: string;
  item: V2_Booking | RoomLock;
}>['columns'] = [
    
    {
      title: 'Идентификатор',
      dataIndex: 'item',
      key: 'item',
      render: (item) => <a>{JSON.stringify(item.id)}</a>,
    },
    {
      title: 'Типы',
      dataIndex: 'type',
      key: 'type',
      render: (item) => <a>{item}</a>,
    },
    {
      title: 'Начало',
      dataIndex: 'item',
      key: 'date',
      render: (item) => {
        if (new Object(item).hasOwnProperty('check_in')) {
          return <a>{moment(item.check_in*1000).toString()}</a>
        }
        return <a>{moment(item.start*1000).toString()}</a>
      },
    },
    {
      title: 'Конец',
      dataIndex: 'item',
      key: 'date',
      render: (item) => {
        if (new Object(item).hasOwnProperty('check_out')) {
          return <a>{moment(item.check_out*1000).toString()}</a>
        }
        return <a>{moment(item.end*1000).toString()}</a>
      },
    },
    {
      title: 'Статус',
      dataIndex: 'item',
      key: 'date',
      render: (item) => <a>{item.status}</a>,
    },
    {
     
      render: (_, record) => (
        <Space size="middle" style={{ background: "#7B68EE", width: "75px", display: "flex", justifyContent: "center", borderRadius: "0.1rem" }}>
          <Link style={{ color: "#fff" }} to={`/booking/${record.item.id}`}>Изменить</Link>
        </Space>
      ),
    },
  ];

const BookingList: FC<any> = (props) => {
  const data = useBookingList(props.data)

  return <BookingListUI data={props.data} />
}


const useBookingList = (props) => {
  const [data, setData] = useState<{
    type: string;
    item: V2_Booking | RoomLock;
  }[]>([])

  useEffect(() => {
    setData(props.brm)
  }, [])

  useEffect(() => {
    setData(props.brm)
  }, [props.brm])

  return data
}

const BookingListUI: FC<any> = (props) =>

<>
<Divider />
<Table  columns={columns} dataSource={props.data} />
</>
    




export { BookingList };









// import { SearchOutlined } from '@ant-design/icons';
// import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
// import { Button, Input, Space, Table } from 'antd';
// import type { FilterDropdownProps } from 'antd/es/table/interface';
// import Highlighter from 'react-highlight-words';

// type InputRef = GetRef<typeof Input>;

// interface DataType {
//   key: string;
//   id: number;
//   name: string;
//   date: number;
//   amount: string;
//   status: string;
// }

// type DataIndex = keyof DataType;

// const data: DataType[] = [
//   {
//     key: '1',
//     id: '123',
//     name: 'John Brown',
//     date: 32,
//     amount: 'New York No. 1 Lake Park',
//     status: 'Delivered',
//   },
//   {
//     key: '2',
//     id: '345',
//     name: 'Joe Black',
//     date: 42,
//     amount: 'London No. 1 Lake Park',
//     status: 'Pending',
//   },
//   {
//     key: '3',
//     id: '678',
//     name: 'Jim Green',
//     date: 32,
//     amount: 'Sydney No. 1 Lake Park',
//     status: 'Delivered',
//   },
//   {
//     key: '4',
//     id: '890',
//     name: 'Jim Red',
//     date: 32,
//     amount: 'London No. 2 Lake Park',
//     status: 'Cancel',
//   },
// ];

// const TableApp: React.FC = () => {
//   const [searchText, setSearchText] = useState('');
//   const [searchedColumn, setSearchedColumn] = useState('');
//   const searchInput = useRef<InputRef>(null);

//   const handleSearch = (
//     selectedKeys: string[],
//     confirm: FilterDropdownProps['confirm'],
//     dataIndex: DataIndex,
//   ) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters: () => void) => {
//     clearFilters();
//     setSearchText('');
//   };

//   const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
//       <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//           style={{ marginBottom: 8, display: 'block' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText((selectedKeys as string[])[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered: boolean) => (
//       <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         .toString()
//         .toLowerCase()
//         .includes((value as string).toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });

//   const columns: TableColumnsType<DataType> = [
//     {
//       title: 'Id',
//       dataIndex: 'id',
//       key: 'id',
//       width: '30%',
//       ...getColumnSearchProps('id'),
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       width: '30%',
//       ...getColumnSearchProps('name'),
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//       width: '20%',
//       ...getColumnSearchProps('date'),
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//       ...getColumnSearchProps('amount'),
//       sorter: (a, b) => a.amount.length - b.amount.length,
//       sortDirections: ['descend', 'ascend'],
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       ...getColumnSearchProps('status'),
//       sorter: (a, b) => a.amount.length - b.amount.length,
//       sortDirections: ['descend', 'ascend'],
//     },
//   ];

//   return <Table className='table_list_view' columns={columns} dataSource={data} />;
// };

// export default TableApp;
