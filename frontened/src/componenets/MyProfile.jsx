
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import './profile.css'
import './Home.css'
import Footer from "./Footer";
function MyProfile(){
    const [user,setuser]=useState({});

    useEffect(()=>  {

    const url = "http://localhost:8001/my-profile/"+localStorage.getItem('userId');
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        if(res.data.user)
        setuser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        alert("Server err");
      });
  }, []);

    
    return (
        <div>
            <Header/>
            <div className="ftfix">
            <div className="m-3 p-3">
            <h3 className="text-center mt-4 prof">USER PROFILE</h3>
        
            <div className="profile-container">
                <img className="profile-img" src='../user-profile-front-side_187299-39595.avif' alt="" />
                <p className="profile-p">Username : {user.Username}</p>
                <p className="profile-p">Enrolment No. : {user.EnrollNo}</p>
                <p className="profile-p">Email : {user.email}</p>
                <p className="profile-p">Phone No. : {user.mobile}</p>
            </div>

            </div>
            </div>
            <Footer/>
        </div>
    )
}
export default MyProfile;