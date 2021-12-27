import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

    const [credentials, setcredentials] = useState({email : "", password : ""})
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email : credentials.email, password: credentials.password})
        });
          const json = await response.json()
          console.log(json);
          if (json.success){
              //redirect
              localStorage.setItem('token', json.authToken);
              props.showAlert("Logged In Successfully", "success")
              navigate("/");

          }
          else{
            props.showAlert("Invalid Credentials", "danger")
          }
    }

    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <h1 className="my-2">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name = "email"
            value = {credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value = {credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
