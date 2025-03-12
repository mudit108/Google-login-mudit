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
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Dashboard</h2>
          <button className="btn btn-danger" onClick={handleLogout}>
            <LogOut size={20} className="me-2" /> Logout
          </button>
        </div>
        <div className="text-center">
          <User size={80} className="text-primary" />
          <h4 className="mt-3">Welcome, {currentUser?.email}</h4>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
