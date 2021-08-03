import "./App.css";

import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

function Login({ setToken }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  function signinAttempt(event) {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      password: password,
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/auth/token/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result["auth_token"]) {
          //set token
          //and route to a different page
          setToken(result["auth_token"]);
          console.log("signed in");
        } else {
          //route to a login page
          console.log("bad");
          setError("username and/or password is incorrect");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function handleChange(event) {
    if (event.target.id === "emailInput") {
      setEmail(event.target.value);
    } else if (event.target.id === "passwordInput") {
      setPassword(event.target.value);
    }
  }

  return (
    <Container>
      <p>Hello</p>
      <form>
        <Row>
          <Col xs={2} md={2}>
            <label>Email: </label>
          </Col>
          <Col xs={8} md={8}>
            <input
              type="text"
              value={email}
              id="emailInput"
              onChange={handleChange}
            ></input>
          </Col>
        </Row>
        <Row>
          <Col xs={2} md={2}>
            <label>Password: </label>
          </Col>
          <Col xs={8} md={8}>
            <input
              type="password"
              value={password}
              id="passwordInput"
              onChange={handleChange}
            ></input>
          </Col>
          <p id="error-message">{error}</p>
        </Row>
        <Button onClick={signinAttempt}>Sign In</Button>
        <a href="/sign-up"> sign up </a>
      </form>
    </Container>
  );
}

export default Login;
