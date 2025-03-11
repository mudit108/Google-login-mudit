import React from "react";
import { handleAuthError, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert(handleAuthError(error));
    }
  }

  return (
    <div>
      <h1>My Website</h1>

      <LogOut size={32} />
      <button onClick={handleLogout}>Logout</button>

      <User size={48} />
      <div>
        <p>{currentUser?.email}</p>
      </div>
    </div>
  );
}

export default Dashboard;
