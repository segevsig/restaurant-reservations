import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearToken, getUser } from "../utils/authToken";

export default function Dashboard() {
  const [userName, setUserName] = useState<string>("User");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    // Get user info from localStorage
    const user = getUser();
    if (user && user.name) {
      setUserName(user.name);
    }
  }, [navigate]);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="page-container">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome to Your Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        
        <div className="dashboard-content">
          <div className="welcome-card">
            <h2>Hello, {userName}! 👋</h2>
            <p>You have successfully logged in to the Restaurant Reservation System.</p>
          </div>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>📅 My Reservations</h3>
              <p>View and manage your restaurant reservations</p>
              <button className="card-button">View Reservations</button>
            </div>

            <div className="dashboard-card">
              <h3>➕ New Reservation</h3>
              <p>Book a new table at your favorite restaurant</p>
              <button className="card-button">Book Now</button>
            </div>

            <div className="dashboard-card">
              <h3>⚙️ Settings</h3>
              <p>Manage your account settings and preferences</p>
              <button className="card-button">Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

