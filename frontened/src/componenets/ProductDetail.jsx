import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./product.css";
import Header from "./Header";
import Footer from "./Footer";
import './Home.css'
function ProductDetail() {
  const p = useParams();
  console.log(p.productId);
  const [product, setProduct] = useState();
  const [user, setuser] = useState();
  useEffect(() => {
    const url = "http://localhost:8001/get-product/" + p.productId;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        if (res.data.product) setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
        alert("Server err");
      });
  }, []);

  const handleContact = (addedBy) => {
    const url = "http://localhost:8001/get-user/" + addedBy;
    axios
      .get(url)
      .then((res) => {
        if (res.data.user) setuser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        alert("Server err");
      });
  };
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Header />
      <div className="ftfix">
      <h3>PRODUCT DETAILS :</h3>
      {product && (
        <>
          <div className="d-flex justify-content-center flex-wrap m-3 p-3">
            <div className="card p-3 m-3 card-box">
            <img
              className="pd-img"
              src={"http://localhost:8001/" + product.pimage}
              alt=""
            />
            </div>
           
            {product.pimage1 && (
               <div className="card m-3 p-3 card-box">
              <img
                className="pd-img"
                src={"http://localhost:8001/" + product.pimage1}
                alt=""
              />
                </div>
            )}
          
            
            {product.pimage2 && (
              <div className="card m-3 p-3 card-box">
              <img
               className="pd-img"
                src={"http://localhost:8001/" + product.pimage2}
                alt=""
              />
               </div>
            )}
           
          </div>
          <div className="det-box">
            <h3 className="m-2 price-text det-price">Price: ₹ {product.price}/-</h3>
            <p className="m-2 det-p">
              Product name:{product.pname}
            </p>
            <p className="m-2 det-p">
              Category:{product.category}
            </p>

            <p className="m-2 text-success det-p">Desription:{product.pdesc}</p>

            <button className='button' onClick={() => handleContact(product.addedBy)}>
              SHOW CONTACT DETAILS
            </button>
            {user && user.Username && <h4 className="det">Seller : {user.Username}</h4>}
            {user && user.EnrollNo && <h4 lassName="det">Enrolment No. : {user.EnrollNo}</h4>}
            {user && user.email && <h4 lassName="det">Email : {user.email}</h4>}
            {user && user.mobile && <h4 lassName="det">Phone No. : {user.mobile}</h4>}
            {user && product.QR && (
              <div className="QR-box">
                <h3>Seller's QR</h3>
              <img 
               className="pd-img"
                src={"http://localhost:8001/" + product.QR}
                alt=""
              />
               </div>
            )}
          </div>
        </>
      )}
      </div>
      <Footer/>
    </div>
  );
}
export default ProductDetail;
