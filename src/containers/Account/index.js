
import React, { useState, useEffect } from 'react';
import HeaderBar from '../Header';
import { Button } from 'antd';
import AccountDetailForm from './AccountDetailForm';
import { Table, Tag, Space } from 'antd'
import { useSelector } from 'react-redux';

import account from '../../API/account';

const Acount = () =>{
    const [form,setForm] = useState(false)
    const [data,setData] = useState([])
    const userId = useSelector(state=>state.userId)
    const socket = useSelector(state=>state.socket)
function handleCancel(){
    setForm(false)
}
console.log('accountemit')

useEffect(()=>{
    console.log(userId)
    account.get(userId).then(data=>{
        if(data.statusText="OK"){
            console.log(data.data)
            setData(data.data)
        }
    })
    socket.on('account',function(data){
        setData(data.data)
    })
},[])


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
     
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
    return (
        <div>
            <HeaderBar></HeaderBar>
            <Button onClick={()=>setForm(true)} type="primary">Add Account</Button>
            {form ? <AccountDetailForm handleCancel={handleCancel} /> : null}
            <Table columns={columns} dataSource={data}></Table>
        </div>
    )
}
export default Acount