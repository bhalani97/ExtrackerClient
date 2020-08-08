import { Layout, Menu, Breadcrumb } from 'antd';

import React from 'react';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const HeaderBar = (props)=>{
    function manageNav(){
        props.history.push('/main')
    }
    return(
<div>
<Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1"><Link to={"/home"}>Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to={"/tracker"}>Tracker</Link></Menu.Item>
        <Menu.Item key="3" ><Link to={"/account"}>Account</Link></Menu.Item>
      </Menu>
    </Header>
   
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  </div>
    )

}
 export default HeaderBar