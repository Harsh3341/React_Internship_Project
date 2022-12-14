import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

const Signup = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = credentials;

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify({
        name,
        email,
        password,
      }),
      url: "http://localhost:5000/api/register",
    };

    const response = await fetch(options.url, options);
    const data = await response.json();

    if (data.success) {
      alert("User registered successfully");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <Container>
      <CenterBox>
        <LoginPanel>
          <h3>Signup</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleChange}
            />
            <input
              value={email}
              onChange={handleChange}
              type="email"
              placeholder="email"
              name="email"
            />
            <input
              value={password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
            />
            <button type="submit">Register</button>
          </form>
        </LoginPanel>
      </CenterBox>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: skyblue;
`;

const CenterBox = styled.div`
  margin: 10vw;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  background-color: skyblue;
  align-items: center;
`;

const LoginPanel = styled.div`
  height: 70vh;
  width: 55rem;
  border-radius: 20px;
  border: 2px solid black;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 2rem;
    margin: 10px;
    margin-bottom: 9rem;
  }
  form {
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 1rem;
      border-radius: 5px;
      padding: 9px;
      border-style: none;
      border: 2px solid black;
    }
    button {
      background-color: red;
      border-style: none;
      border: 2px solid black;
      border-radius: 10px;
      padding: 7px;
      cursor: pointer;
      font-weight: bold;
      &:hover {
        background-color: #ff5b5b;
      }
    }
  }
`;

export default Signup;
