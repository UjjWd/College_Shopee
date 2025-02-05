import {Link,useNavigate} from 'react-router-dom'
import { useEffect,useState } from 'react'
import './Home.css'
import Header from './Header'
import axios from 'axios';
import Categories from './Categories.jsx';
import {FaHeart,FaRegHeart} from 'react-icons/fa'
import Footer from './Footer.jsx';

function LikedProducts()
{
    // const navigate=useNavigate();
    const [products,setproducts]=useState([]);
    const [cproducts,setcproducts]=useState([]);
    const [search,setsearch]=useState('');

    
    useEffect(()=>{
        const url="http://localhost:8001/liked-product"
        const data={userId:localStorage.getItem('userId')}
        axios.post(url,data)
        .then((res)=>{
            console.log(res);
            if(res.data.products)
            {
                setproducts(res.data.products);
            }
        })
        .catch((err)=>{console.log(err)
        alert('Server err')})
    },[])

    const handleSearch=(value)=>{
        setsearch(value);
    }
    const handleClick=()=>{
        console.log('products',products)
        const filterProducts=products.filter((product)=>{
            if(product.pname.toLowerCase().includes(search) || product.pdesc.toLowerCase().includes(search) || product.category.toLowerCase().includes(search))
            {
                return product;
            }
        })
        setproducts(filterProducts);
    }
    const handleCategory=(value)=>{
     
        console.log('value',value)
        const filterProducts=products.filter((product)=>{
            if(product.category === value) 
            {
                return product;
            }
        })
        setcproducts(filterProducts);
    }
    // const handleLike=(productId)=>{
    //     let userId=localStorage.getItem('userId')
    //    // console.log(productId,userId)
    //     const url="http://localhost:8001/liked-product";
    //     const data={userId:userId,productId:productId}
    //     axios.post(url,data)
    //     .then((res)=>{
    //         if(res.data.message)
    //         alert("Liked");
            
    //     })
    //     .catch((err)=>{console.log(err)
    //     alert('Server err')})
        
    // }
    return (
        <div>
            <Header search={search} handleSearch={handleSearch} handleClick={handleClick}/>
            <Categories handleCategory={handleCategory}/>
           
         

            <div className='ftfix'>
            
            <div className="d-flex justify-content-center flex-wrap">
            { products && products.length>0 &&
                products.map((product,index)=>{
                   return (
                    <div key={product._id} className="card m-3 p-2" >
                        <img width="300px" height="200px" src={"http://localhost:8001/"+product.pimage} alt="img" />
                        <div onClick={()=>handleLike(product._id)} className="icon-con">
                        <FaHeart className='red-icons'/>
                        </div>
                       
                       
                    <p className=''>{product.pname} | {product.category}</p>
                    <h3 className="text-danger">{product.price}</h3>
                    <p className="text-success">{product.pdesc.substring(0, 30)}...</p>

                    </div>
                   )
                    
                })
            }
            </div>
            </div>
           <Footer/>
           
        </div>
      
    )
}
export default LikedProducts;