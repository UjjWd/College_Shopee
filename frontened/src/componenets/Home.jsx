import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";
import Header from "./Header";
import axios from "axios";
import Categories from "./Categories.jsx";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Footer from "./Footer.jsx";

function Home() {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [likedproducts, setlikedproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [issearch, setissearch] = useState(false);
  const [refresh,setrefresh]=useState(false)

  useEffect(() => {
    const url = "http://localhost:8001/get-products";
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Server err");
      });

      const url2="http://localhost:8001/liked-product";
      const data1={userId:localStorage.getItem('userId')}
      axios
      .post(url2,data1)
      .then((res) => {
        console.log(res);
        if (res.data.products) {
          setlikedproducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Server err");
      });
  }, [refresh]);

  const handleSearch = (value) => {
    setsearch(value);
  };
  const handleClick = () => {

    const url = "http://localhost:8001/search?search="+search;
    
    axios
      .get(url)
      .then((res) => {
        setcproducts(res.data.product);
        setissearch(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Server err");
      });




    // console.log("products", products);
    // const filterProducts = products.filter((product) => {
    //   if (
    //     product.pname.toLowerCase().includes(search) ||
    //     product.pdesc.toLowerCase().includes(search) ||
    //     product.category.toLowerCase().includes(search)
    //   ) {
    //     return product;
    //   }
    // });
    //setproducts(filterProducts);
  };
  const handleCategory = (value) => {
    console.log("value", value);
    const filterProducts = products.filter((product) => {
      if (product.category === value) {
        return product;
      }
    });
    setcproducts(filterProducts);
  };
  const handleLike = (productId,e) => {
     e.stopPropagation();
    let userId = localStorage.getItem("userId");
    if(!userId)
    {
      alert('Please Login first');
      return;
    }

    // console.log(productId,userId)
    const url = "http://localhost:8001/like-product";
    const data = { userId: userId, productId: productId };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) 
        alert("Liked");
      setrefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
        alert("Server err");
      });

    
    
  };

  const handleDislike = (productId,e) => {
    e.stopPropagation();
   let userId = localStorage.getItem("userId");
   if(!userId)
   {
     alert('Please Login first');
     return;
   }
   
   // console.log(productId,userId)
   const url = "http://localhost:8001/dislike-product";
   const data = { userId: userId, productId: productId };
   axios
     .post(url, data)
     .then((res) => {
       if (res.data.message) 
       alert("Disliked");
     setrefresh(!refresh);
     })
     .catch((err) => {
       console.log(err);
       alert("Server err");
     });

   
   
 };
  const handleProduct = (id) => {
    navigate("/product/" + id);}
  return (
    <>
    <div>
      <Header
        search={search}
        handleSearch={handleSearch}
        handleClick={handleClick}
      />
      <div className="ftfix">
      <Categories handleCategory={handleCategory} />
      <h3 className="m-3 home-h">Welcome to  <Link to="/" className="home-link" >
          CAMPUS BAZAAR
        </Link></h3>
      {issearch && cproducts && <h5>SEARCHED RESULTS    <button className="clear-btn"  onClick={()=>setissearch(false)}>CLEAR</button></h5> }
      
      {issearch && cproducts && cproducts.length==0 &&<h5>NO RESULT FOUND</h5>}
      {issearch && <div className="d-flex justify-content-center flex-wrap">
        {cproducts &&
          cproducts.length > 0 &&
          cproducts.map((product, index) => {
            return (
              <>
                <div key={index} className="card m-3 p-2">
                  <div
                    onClick={() => handleLike(product._id)}
                    className="icon-con"
                  >
                    <FaHeart className="icons" />
                  </div>
                  <img
                    width="300px"
                    height="200px"
                    src={"http://localhost:8001/" + product.pimage}
                    alt="img"
                  />

                  <h3 className="m-2 price-text ">{product.price}</h3>
                  <p className="m-2">
                    {product.pname} | {product.category}
                  </p>
                  <p className="m-2 text-success">{product.pdesc.substring(0, 30)}...</p>
                </div>
              </>
            );
          })}
      </div>}
     
      {!issearch &&<div className="d-flex justify-content-center flex-wrap">
        {products &&
          products.length > 0 &&
          products.map((product, index) => {
            return (
              <div
                key={product._id}
                className="card m-3 p-2"
                onClick={() => handleProduct(product._id)}
              >
                <div
                   
                  className="icon-con"
                >
                  { likedproducts.find((likedItem)=>(likedItem._id===product._id))?
                  <FaHeart onClick={(e) => handleDislike(product._id,e)} className="red-icons" />:
                  <FaHeart onClick={(e) => handleLike(product._id,e)}  className="icons" />
                  }
                  
                </div>

                <img
                  width="300px"
                  height="200px"
                  src={"http://localhost:8001/" + product.pimage}
                  alt="img"
                />

                <h3 className="m-2 price-text">Rs. {product.price}/-</h3>
                <p className="m-2">
                  {product.pname} | {product.category}
                </p>
                <p className="m-2 text-success ">{product.pdesc.substring(0, 30)}...</p>
              </div>
            );
          })}
      </div>
      }
      </div>
      <Footer/>
    </div>
    
   </>
  );
}
export default Home;
