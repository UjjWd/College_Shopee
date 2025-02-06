import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { useState ,useEffect} from "react";
function Header(props) {
  const navigate = useNavigate();
  const [showOver, setshowOver] = useState(false);
  function handleLogout() {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  }
  return (
    <div className="header-container d-flex justify-content-between ">
      <div className="header">
        <Link to="/" className="home-link" >
          CAMPUS BAZAAR
        </Link>
        <input
          className="search"
          type="text"
          value={props && props.search}
          onChange={(e) =>
            props.handleSearch && props.handleSearch(e.target.value)
          }
        />
        <button
          className="search-btn"
          onClick={() => props.handleClick && props.handleClick()}
        >
          <FaSearch className="search-icon" />
        </button>
      </div>
   
      {!localStorage.getItem('token') && (
        <div>
          <Link to="/login">
            <button className="btn btn-primary m-3">LOGIN</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-primary m-3">SIGNUP</button>
          </Link>
        </div>
      )}
      {localStorage.getItem('token') && <div 
        onClick={() => {
          setshowOver(!showOver);
        }}
       className="circle"
      > </div>}

      {showOver && (
        <div
          className="circle-items"
        >
          <div>
            {!!localStorage.getItem("token") && (
              <Link to="/add-product">
                <button className="circle-btn">ADD PRODUCT </button>
              </Link>
            )}
          </div>
          <div>
            {!!localStorage.getItem("token") && (
              <Link to="/liked-product">
                <button className="circle-btn"> FAVOURITES </button>
              </Link>
            )}
          </div>
          <div>
            {!!localStorage.getItem("token") && (
              <Link to="/my-products">
                <button className="circle-btn">MY ADS </button>
              </Link>
            )}
          </div>
          <div>
            {!!localStorage.getItem("token") && (
              <Link to="/my-profile">
                <button className="circle-btn">PROFILE </button>
              </Link>
            )}
          </div>
          <div>
            {!localStorage.getItem("token") ? (
              <Link to="/login"> LOGIN </Link>
            ) : (
              <button className="circle-btn" onClick={handleLogout}>
                {" "}
                LOGOUT{" "}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
