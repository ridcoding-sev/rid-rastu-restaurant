import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";

const Login = () => {
  const navigate = useNavigate();

  const { setToken, setRole, token } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // LOGIN HANDLER
  // =========================
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendUrl + "/api/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        setToken(response.data.token);
        setRole(response.data.role);

        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // LOAD ADMIN DATA
  // =========================
  const loadAdminData = () => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedRole) {
      setRole(savedRole);
    }
  };

  // =========================
  // CHECK EXISTING LOGIN
  // =========================
  useEffect(() => {
    loadAdminData();
  }, []);

  // =========================
  // REDIRECT IF TOKEN EXISTS
  // =========================
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
