
import React, { useEffect } from 'react';
import HeaderBar from '../Header';
import { useSelector } from 'react-redux';
const Home = () =>{
    const socket = useSelector(state=>state.socket)
    useEffect(()=>{
        
    },[])
    return (
        <div>
            <HeaderBar></HeaderBar>
            Home
        </div>
    )
}
export default Home