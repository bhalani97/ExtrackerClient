
import React, { useState, useEffect } from 'react';
import HeaderBar from '../Header';
import { Button } from 'antd';
import TranscationDetailForm from './TranscationDetailForm';
import { Table, Space } from 'antd'
import { useSelector } from 'react-redux';
import transcation from '../../API/transcation';
import moment from 'moment'
const Tracker = () =>{
  console.log('Inside Tracker')
    const [form,setForm] = useState(false)
    const [data,setData] = useState([])
    const userId = useSelector(state=>state.userId)
    const socket = useSelector(state=>state.socket)
function handleCancel(){
    setForm(false)
}


useEffect(()=>{
    console.log(userId)
    transcation.get(userId).then(data=>{
        if(data.statusText="OK"){
            console.log(data.data)
            setData(data.data)
        }
    })
    socket.on('transcation',function(data){
        setData(data.data)
    })
},[])


const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <p>{moment(text).format('L')}</p>,
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
    },
    
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
     
    },
    {
      title: 'From/To',
      key: 'amount',
      dataIndex: 'fromaccount',
    render:text=><p>{text.name}</p>
     
    },{
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
     
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
    return (
        <div>
            <HeaderBar></HeaderBar>
            <br></br>
            <Button onClick={()=>setForm(true)} type="primary">Add </Button>
            {form ? <TranscationDetailForm userId={userId} handleCancel={handleCancel} /> : null}
            <Table columns={columns} dataSource={data}></Table>
        </div>
    )
}
export default Tracker