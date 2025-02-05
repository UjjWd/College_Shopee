import {Link,useNavigate} from 'react-router-dom'
import Header from "./Header";
import {useState} from 'react'
import axios from 'axios'
import Footer from './Footer';
import './Home.css'
function Login(){

    const navigate=useNavigate();
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');

    const handleApi=()=>{
       
        const url='http://localhost:8001/login'
        const data={username:username,password:password};
        axios.post(url,data)
        .then((res)=>{
           if(res.data.message)
           {
            if(res.data.message==='User not found' || res.data.message==='password wrong')
            {
                    setusername('');
                    setpassword('');
                    alert('Invalid username or password');
           
            }
           else if(res.data.token){
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('userId',res.data.userId)
                navigate('/');
            }
            
           }

        })
        .catch((err)=>{
        alert("Invalid username or password")});
    }
    return (
        <div>
            <Header/>
            <div className='ftfix'>
            <div className='p-3 m-3'>
           <h3> Welcome to login</h3>
            <br />
            
            USERNAME
           <input className='form-control' type="text" value={username}  name="username" onChange={(e)=>{
               setusername(e.target.value)}}/>
           <br />
           PASSWORD
           <input className='form-control' type="password" value={password} name="password" onChange={(e)=>{
               setpassword(e.target.value) }}/>
           <br />
           <button className='btn btn-primary' onClick={handleApi}>LOGIN</button>
           <Link to="/signup">SIGNUP</Link>
           </div>
           </div>
           <Footer/>
           
        </div>
    )
}
export default Login;