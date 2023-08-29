import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import companyLogo from "../../assets/BraneLogo.png";
import showIcon from "../../assets/visible.png";
import hideIcon from "../../assets/hide.png";
import { setAdmin, getAdmin } from "../../utils/localstorage";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("operations_admin"); // Default role
  const [showPassword, setShowPassword] = useState(false);
  const [focusField, setFocusField] = useState(null);

  useEffect(()=>{
    const {token, role} = getAdmin();
    if(token && role){
      navigate("/");
    }
  },[])

  const handleEmailChange = (event) => {
    const enteredValue = event.target.value;
    setEmail(enteredValue);

    if (enteredValue.includes("\n")) {
      setFocusField("password");
      document.getElementById("password-input").focus();
    } else {
      setFocusField(null);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setFocusField(null);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!email || !password) {
      if (!email) {
        setFocusField("email");
      } else {
        setFocusField("password");
      }
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      setAdmin(data.token, data.role)

      // Redirect based on role using navigate
      if (data.role === "operations_admin") {
        navigate("/"); // Redirect to operational admin dashboard
      } else if (data.role === "super_admin") {
        navigate("/"); // Redirect to super admin dashboard
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const handleEmailKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("password-input").focus();
    }
  };

  return (
    <div className="admin-login-container">
      <div className="company-logo">
        <img src={companyLogo} alt="Company Logo" />
      </div>
      <div className="admin-login-form">
        <div className="admin-login-title">
          <span className="admin-login-title-head">Admin Login</span>
          <span>
            Hello, enter your details here to login into the dashboard.
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleEmailKeyDown}
            />
            {focusField === "email" && (
              <div className="popover red">Email is mandatory</div>
            )}
          </div>

          <div className="form-group">
            <div className="password-input">
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {password && (
                <button
                  type="button"
                  className="password-toggle"
                  onClick={handleShowPasswordToggle}
                >
                  <img
                    src={showPassword ? showIcon : hideIcon}
                    alt={showPassword ? "Hide" : "Show"}
                  />
                </button>
              )}
            </div>
            {focusField === "password" && (
              <div className="popover red">Password is mandatory</div>
            )}
          </div>

          <div className="form-group">
            <label className="role-label">Role:</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="role-dropdown"
            >
              <option value="operations_admin">Operations Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
