import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const AdminLogin = ({ onLogin, onLogout, isAdminLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      onLogin();
      router.push("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-end mb-2">
      {isAdminLoggedIn ? (
        <button onClick={onLogout} className="button">
          Logout
        </button>
      ) : (
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mr-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mr-2"
          />
          <Link href="/dashboard">Login</Link>
          <button onClick={handleLogin} className="button">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
