import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import './Home.css'
import Footer from "./Footer";

function Signup() {
  // const history=useHistory();
  const [username, setusername] = useState("");
  const [EnrollNo, setEnrollNo] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleApi = () => {
    const url = "http://localhost:8001/signup";
    EnrollNo.toUpperCase();
    const start = "IIT2023001";
    const end = "IIT2023273";

    if (
      !(EnrollNo >= start && EnrollNo <= end) &&
      !(email >= "iit2023001@iiita.ac.in" && email <= "iit2023273@iiita.ac.in")
    )
      alert("Please enter valid enrolment number and email");
    else if (!(EnrollNo >= start && EnrollNo <= end))
      alert("Please enter valid enrolment number");
    else if (
      !(email >= "iit2023001@iiita.ac.in" && email <= "iit2023273@iiita.ac.in")
    )
      alert("Please enter valid email");
    else {
      const data = {
        username: username,
        EnrollNo: EnrollNo,
        mobile: mobile,
        email: email,
        password: password,
      };
      axios
        .post(url, data)
        .then((res) => {
            console.log(res)
          // history.push('/');
          window.location.href = "/login";
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <Header />
      <div className="p-3 m-3 ftfix">
        <h2 className="text-center">
          Welcome to <Link to="/">CAMPUS BAZAAR</Link>
        </h2>
        <h4 className="text-center">Please signup to continue</h4>
        <br />
        USERNAME
        <input
          type="text"
          value={username}
          className="form-control"
          name="username"
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <br />
        ENROLMENT NUMBER
        <input
          type="text"
          value={EnrollNo}
          className="form-control"
          name="EnrollNo"
          onChange={(e) => {
            setEnrollNo(e.target.value);
          }}
        />
        <br />
        PHONE NO.
        <input
          type="text"
          value={mobile}
          className="form-control"
          name="mobile"
          onChange={(e) => {
            setmobile(e.target.value);
          }}
        />
        <br />
        EMAIL
        <input
          type="text"
          value={email}
          className="form-control"
          name="email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <br />
        PASSWORD
        <input
          type="password"
          value={password}
          className="form-control"
          name="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <br />
        <button onClick={handleApi} className="btn btn-primary">
          SIGNUP
        </button>
        <Link className="m-3" to="/login">
          LOGIN
        </Link>
      </div>
      <Footer/>
    </div>
  );
}
export default Signup;
