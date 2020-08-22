import React, { useState, useEffect } from "react";
import HeaderBar from "../Header";
import {Space , Spin } from "antd";
import TranscationDetailForm from "./TranscationDetailForm";
import { Table ,Button } from "antd";
import { useSelector } from "react-redux";
import transcation from "../../API/transcation";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";

const Tracker = () => {
  console.log("Inside Tracker");
  const [form, setForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state.userId);
  const socket = useSelector((state) => state.socket);
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState({});
  const [hasMore,setHasMore] = useState(true)
  const [pageNo,setPageNo] = useState(1)
  const [filter,setFilter] = useState({})
  function handleCancel() {
    setForm(false);
  }
  function handleEditCancel() {
    setEdit(false);
  }

 
  function handleInfiniteOnLoad(){
   setLoading(true)

    
    transcation.get({userId,filter,pageNo}).then((d) => {
      if ((d.statusText = "OK")) {

        console.log(d.data);
        const list = data.concat(d.data)
        setData(list);
        setLoading(false);
        setLoading(false)
        setPageNo(pageNo+1)
        if(d.data.length<10){
          setHasMore(false)
        }
      }
    });
  }

  useEffect(() => {
    console.log(userId);
    transcation.get({userId,pageNo}).then((d) => {
      if ((d.statusText = "OK")) {
        console.log(d.data);
        setData(d.data);
        setLoading(false);
        setPageNo(pageNo+1)
      }
    });

    socket.on("transcation", function (d) {   
     if(d.name==='UPDATE'){
   
      setData(data=>{


        return  data.map(da=>{
           if(da.id===d.data.id){
             return d.data
           }
           else{
             return da 
           }
         })
 
       })
     }
     else if(d.name==='ADD'){
       setData(data=>{
         let list = [d.data,...data]
         return list
       })
     }
     else{
       setData(data=>{
         return data.filter(da=>{
           if(da.id!==d.data.id){return d}

         })
       })
     }
   
  
     
  
    });
    console.log("DASDADA",data)
   
  }, []);

  const columns = [
    {
      title: 'Id',
      key: 'index',
      render : (text, record, index) => index+1,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <p>{moment(text).format("DD/MM/YYYY")}</p>,
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
    },

    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "From/To",
      key: "amount",
      dataIndex: "fromaccount",
      render: (text) => <p>{text.name}</p>,
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (text) => {
        return text === "debit" ? (
          <p style={{ color: "red" }}>Debit</p>
        ) : (
          <p style={{ color: "green" }}>Credit</p>
        );
      },
    },
    {
      title: "For",
      key: "fortype",
      dataIndex: "fortype",
      render: (text) => {
        return <p style={{ textTransform: "capitalize" }}>{text}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setRecord(record, setEdit(true));
            }}
          >
            Edit{" "}
          </a>
          <a
            onClick={() => {
              // setLoading(true)
              console.log(record.id);
              transcation.delete(record.id).then((data) => {
                if ((data.statusText = "OK")) {
                }
              });
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div>
 
        <HeaderBar></HeaderBar>
        <br></br>
        <Button onClick={() => setForm(true)} type="primary">
          Add{" "}
        </Button>
        {form ? (
          <TranscationDetailForm
            edit={false}
            userId={userId}
            handleCancel={handleCancel}
          />
        ) : null}
        {edit && (
          <TranscationDetailForm
            edit={true}
            formData={record}
            edit={true}
            handleCancel={handleEditCancel}
          ></TranscationDetailForm>
        )}

        <InfiniteScroll
            initialLoad={false}
            loadMore={handleInfiniteOnLoad}
            hasMore={ !loading &&  hasMore}
          >
            <Spin spinning={loading}>
        <Table pagination={false} columns={columns} dataSource={data} 
        // pagination={{
        //   current: pageNo,
        //   total: 20,
        //   pageSize: 10,
        
        // }}
        
        ></Table>
        </Spin>
        </InfiniteScroll>
 
    </div>
  );
};
export default Tracker;
