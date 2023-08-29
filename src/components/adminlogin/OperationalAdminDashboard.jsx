import React from 'react';

const OperationalAdminDashboard = () => {
  const role = localStorage.getItem('role'); // Get role from local storage
  const avatar = localStorage.getItem('avatar'); // Get avatar from local storage

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('role'); // Remove role from local storage
    localStorage.removeItem('avatar'); // Remove avatar from local storage
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div>
      <h1>Operational Admin Dashboard</h1>
      <p>Role: {role}</p>
      <img src={avatar} alt="Avatar" />
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      {/* Your operational admin dashboard content */}
    </div>
  );
};

export default OperationalAdminDashboard;
