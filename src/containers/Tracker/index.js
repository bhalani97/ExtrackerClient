
import React, { useState, useEffect } from 'react';
import HeaderBar from '../Header';
import { Button, Spin } from 'antd';
import TranscationDetailForm from './TranscationDetailForm';
import { Table, Space } from 'antd'
import { useSelector } from 'react-redux';
import transcation from '../../API/transcation';
import moment from 'moment'
const Tracker = () =>{
  console.log('Inside Tracker')
    const [form,setForm] = useState(false)
    const [edit,setEdit] = useState(false)
    const [data,setData] = useState([])
    const userId = useSelector(state=>state.userId)
    const socket = useSelector(state=>state.socket)
    const [loading,setLoading] = useState(true)
    const [record,setRecord] = useState({})
function handleCancel(){
    setForm(false)
}
function handleEditCancel(){
  setEdit(false)
}


useEffect(()=>{
    console.log(userId)
    transcation.get(userId).then(data=>{
        if(data.statusText="OK"){
            console.log(data.data)
            setData(data.data)
            setLoading(false)
        }
    })
    socket.on('transcation',function(data){
      setLoading(false)
        setData(data.data)
    })
},[])


const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <p>{moment(text).format('DD/MM/YYYY')}</p>,
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
      render:text=> {return text==='debit' ? <p style={{color:"red"}}>Debit</p>: <p  style={{color:"green"}}>Credit</p> }
     
    },
    {
      title: 'For',
      key: 'fortype',
      dataIndex: 'fortype',
      render:text=> {return <p style={{textTransform:"capitalize"}}>{text}</p> }

     
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>{
            setRecord(record,setEdit(true))
                      }}>Edit </a>
          <a onClick={()=>{
            // setLoading(true)
console.log(record.id)
            transcation.delete(record.id).then(data=>{
              if(data.statusText="OK"){
                
              }
            })
          }}>Delete</a>
        </Space>
      ),
    },
  ];
    return (
        <div>
          <Spin spinning={loading}>
            <HeaderBar></HeaderBar>
            <br></br>
            <Button onClick={()=>setForm(true)} type="primary">Add </Button>
            {form ? <TranscationDetailForm edit={false} userId={userId} handleCancel={handleCancel} /> : null}
          {edit && <TranscationDetailForm edit={true} formData = {record} edit={true} handleCancel={handleEditCancel}></TranscationDetailForm>}

            <Table columns={columns} dataSource={data}></Table>
            </Spin>
        </div>
    )
}
export default Tracker