import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setcredentials] = useState({name : "", email : "", password : "", cnfpassword : ""})
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {name, email, password, cnfpassword} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({name, email, password})
    });
      const json = await response.json()
      console.log(json);
      if(json.success){
          //redirect
          localStorage.setItem('token', json.authToken);
            navigate("/", {replace : true});
        props.showAlert("Account Created Successfully", "success")

      }
      else{
        props.showAlert("Invalid Credentials", "danger")
      }
}

const onChange = (e)=>{
    setcredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name" onChange={onChange}
            name = "name"
            aria-describedby="emailHelp"
          />
          </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email" 
            name = "email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"  
            name = "password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cnfpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cnfpassword" 
            name = "cnfpassword"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
