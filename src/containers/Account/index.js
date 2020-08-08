
import React, { useState } from 'react';
import HeaderBar from '../Header';
import { Button } from 'antd';
import AccountDetailForm from './AccountDetailForm';

const Acount = () =>{
    const [form,setForm] = useState(false)
function handleCancel(){
    setForm(false)
}
    return (
        <div>
            <HeaderBar></HeaderBar>
            <Button onClick={()=>setForm(true)} type="primary">Add Account</Button>
            {form ? <AccountDetailForm handleCancel={handleCancel} /> : null}
        </div>
    )
}
export default Acount