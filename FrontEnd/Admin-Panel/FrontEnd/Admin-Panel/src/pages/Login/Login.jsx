/*import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className="login-container">
            <div className="left-section">
                <p>Always stocked</p>
                <p>for your</p>
                <p>needs...</p>
            </div>
            <div className="right-section">
                <div className="login-card">
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <div className="remember-section">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
*/
import {
  MDBBtn,
  MDBCard,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000); // 2 seconds delay
  };

  /*
  const handleButtonClick = () => {
    // Create the request body
    const requestBody = {
      email: email,
      password: password,
    };

    // Make the HTTP POST request
    fetch("http://localhost:5000/users/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Admin logged in successfully") {
          setLoading(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000); // 2 seconds delay
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError("Server error");
      });
  };*/

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center"
      style={{
        backgroundImage: `url("/loginBackground.svg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity: 0.8,
        height: "100vh",
        width: "100vw",
        marginLeft: "-250px",
      }}
    >
      <MDBRow
        style={{
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          alignItems: "center",
          width: "100%",
        }}
      >
        <MDBCol style={{ paddingLeft: "50px" }}>
          <h1
            className="display-1"
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Always stocked
          </h1>
          <h1
            className="display-1"
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            for your needs...
          </h1>
        </MDBCol>

        <MDBCol
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "15%",
          }}
        >
          <MDBCard
            className="p-5"
            style={{ maxWidth: "500px", minWidth: "400px" }}
          >
            <h2 className="mb-4" style={{ textAlign: "center" }}>
              Login
            </h2>
            <MDBInput
              wrapperClass={`mb-4 ${email ? "has-text" : ""}`}
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-1"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-end mb-4">
              <a href="!#">Forgot password?</a>
            </div>

            <div>
              {loading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "3rem" }}
                >
                  <div
                    className="spinner-border text-success"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                  ></div>
                </div>
              ) : (
                <MDBBtn
                  className="mb-2 w-100"
                  color="success"
                  size="lg"
                  onClick={handleButtonClick}
                >
                  Sign in
                </MDBBtn>
              )}
            </div>
            <div className="d-flex justify-content-center mt-1">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
