import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Login.jsx";
import { login } from "../services/api.js";

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (username, password) => {
    if (login(username, password)) {
      localStorage.setItem("isAuthenticated", "true");
      setError("");
      navigate("/dashboard");
    } else {
      setError("Incorrect username or password.");
    }
  };

  return <LoginForm onSubmit={handleSubmit} error={error} />;
}
