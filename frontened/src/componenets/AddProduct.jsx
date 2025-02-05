import {Link,useNavigate} from 'react-router-dom'
import { useEffect,useState } from 'react'
import Header from './Header'
import axios from 'axios'
import categories from './CategoriesList'
import Footer from './Footer'
function AddProduct()
{
    const navigate=useNavigate();
    const [pname,setpname]=useState('');
    const [pdesc,setpdesc]=useState('');
    const [price,setprice]=useState('');
    const [category,setcategory]=useState('');
    const [pimage,setpimage]=useState('')
    const [pimage1,setpimage1]=useState('');
    const [pimage2,setpimage2]=useState('');
    const [QR,setQR]=useState('');
    useEffect(()=>{
        if(!localStorage.getItem('token')){
         navigate('/login');
        }
    },[]);
     
    const handleApi=()=>{
        const formData=new FormData();
        formData.append('pname',pname)
        formData.append('pdesc',pdesc)
        formData.append('price',price)
        formData.append('category',category)
        formData.append('pimage',pimage);
        formData.append('userId',localStorage.getItem('userId'))
        formData.append('pimage1',pimage1);
        formData.append('pimage2',pimage2);
        formData.append('QR',QR)
        const url='http://localhost:8001/add-product';
        axios.post(url,formData)
        .then((res)=>{
          
            if(res.data.message)
            {
               
                navigate('/');
            }
        })
        .catch((err)=>{
            alert('Server error')
        });

        
    };
    return (
        <div>
            <Header/>
            <div className='container mt-3'>
           <h2>ADD PRODUCT HERE :</h2>
           
           <label htmlFor="">Product Name</label>
           <input className="form-control" type="text" value={pname}
           onChange={(e)=>{setpname(e.target.value)}}/>
           <label htmlFor="">Product description</label>
           <input className="form-control" type="text" value={pdesc}
           onChange={(e)=>{setpdesc(e.target.value)}} />
           <label htmlFor="">Price</label>
           <input className="form-control" type="text" value={price} 
           onChange={(e)=>{setprice(e.target.value)}}/>
           <label htmlFor="">Category</label>
           <select name="" id="" class="form-control" value={category}
           onChange={(e)=>{setcategory(e.target.value)}}>
            <option key='option'>Select product category</option>
            {
                categories && categories.length>0 &&
                categories.map((item,index)=>{
                    return (
                        
                       <option key={'option'+index} >
                            {item}</option>
                    )
                  })
            }
           </select>
           <label htmlFor="">Product Image 1</label>
           <input className="form-control" type="file" 
           onChange={(e)=>{setpimage(e.target.files[0])}}/>
           <label htmlFor="">Product Image 2</label>
           <input className="form-control" type="file" 
           onChange={(e)=>{setpimage1(e.target.files[0])}}/>
           <label htmlFor="">Product Image 3</label>
           <input className="form-control" type="file" 
           onChange={(e)=>{setpimage2(e.target.files[0])}}/>
          <label htmlFor=""> QR for Payment</label>
           <input className="form-control" type="file" 
           onChange={(e)=>{setQR(e.target.files[0])}}/>

           <button class="btn btn-primary m-3" onClick={handleApi}>Submit</button>
           </div>
           <Footer/>
        </div>
    )
}
export default AddProduct