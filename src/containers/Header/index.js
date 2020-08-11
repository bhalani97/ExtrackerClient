import { Layout, Menu, Breadcrumb } from 'antd';

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SocketApi from '../../API/socketApi';
const { Header, Content, Footer } = Layout;

 const HeaderBar = (props)=>{
  const socket = useSelector(state=>state.socket)
  const dispatch = useDispatch()
  console.log('Outside Socket')
  if(!socket){
  console.log('Inside Socket')
console.log(localStorage.getItem('token'))
    const socket = SocketApi(localStorage.getItem('token'))
    dispatch({type:'SET_SOCKET',payload:socket})
  }
    function manageNav(){
        props.history.push('/home')
    }
    return(
<div>
<Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to={"/home"}>Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to={"/tracker"}>Tracker</Link></Menu.Item>
        <Menu.Item key="3" ><Link to={"/account"}>Account</Link></Menu.Item>
      </Menu>
    </Header>
   
   
  </Layout>
  </div>
    )

}
 export default HeaderBar