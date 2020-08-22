import React, { useEffect, useState } from "react";
import HeaderBar from "../Header";
import { useSelector } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons';
import balance from "../../API/balance";
import { Card, Statistic, Spin } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
const Home = () => {
  const userId = useSelector((state) => state.userId);
  const [loading,setLoading] = useState(false)
  const [account, setAccount] = useState([]);
  useEffect(() => {
      setLoading(true)
    balance.getBalance(userId).then((data) => {
        if(data.statusText==="OK"){
            setAccount(data.data)
        }else{
            alert('Something went wrong')
        }
            setLoading(false)
       
    }).catch(error=>alert('Something went wrong'),setLoading(false))
  }, []);
  return (
    <div>
     <HeaderBar></HeaderBar>
      
     
      <div className="site-statistic-demo-card">
        {account.map((data) => {
          <p>{data}</p>;
        })}
        {account.map((data) => {
          if (data.balance > 0) {
            return (
              <Card>
                <Statistic
                  title={data.name}
                  value={data.balance}
                  // precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="RS"
                />
              </Card>
            );
          } else {
            return (
              <Card>
                <Statistic
                  title={data.name}
                  value={data.balance}
                  // precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<ArrowDownOutlined />}
                  suffix="RS"
                />
              </Card>
            );
          }
        })}
      </div>
      <Spin  spinning={loading}>
      </Spin>
    </div>
  );
};
export default Home;
