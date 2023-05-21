import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  getToken,
} from "../../utills/storage-utills";
import { useNavigate } from "react-router-dom";
import {
  passwordReset,
  secretCheck,
} from "../../utills/api-utill";
import "../../styles/loginForm.css";

export default function PasswordResetForm({ setIsreset }) {
  const navigate = useNavigate();
  const [option, setOption] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const optionCSS = {
    fontWeight: "bold",
    color: "#4E94F4",
  };
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [boo, setBoo] = useState(true);
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (getToken() && getCurrentUser().isVendor) {
      return navigate("/vendor/proposals");
    }
    if (getToken() && getCurrentUser().isUser) {
      return navigate("/user/proposals");
    }
  }, []);

  function onFormSubmit(e) {
    e.preventDefault();

    setBoo(false);
    secretCheck(loginUser, option ? "vendor" : "user").then((res) => {
      if (res.status === "Success") {
        setBoo(true);
        setIsCheck(true);
      } else {
        setBoo(true);
        if (res.field) {
          setError((ex) => ({ ...ex, [res.field]: res.message }));
        } else {
          alert("Failed to check, try again!!");
        }
      }
    });
  }

  function onPasswordResetSubmit(e) {
    e.preventDefault();
    if (loginUser.password !== loginUser.confirmPassword) {
      return setError((ex) => ({
        ...ex,
        password: "Password & confirm password don't match!",
      }));
    }
    setBoo(false);
    passwordReset(loginUser, option ? "vendor" : "user").then((res) => {
      if (res.status === "Success") {
        alert("Password reset successful");
        setLoginUser({
          email: "",
          password: "",
          confirmPassword: "",
        });

        setBoo(true);
        setIsCheck(false);
        setIsreset(true);
      } else {
        setBoo(true);
        if (res.field) {
          setError((ex) => ({ ...ex, [res.field]: res.message }));
        } else {
          alert("Failed to reset, try again!!");
        }
      }
    });
  }

  return (
    <>
      {!isCheck ? (
        <div className="signin-form-container">
          <div className="option">
            <p
              className="vendor"
              style={option ? optionCSS : {}}
              onClick={() => setOption(true)}
            >
              Vendor
            </p>
            <p
              className="user"
              style={!option ? optionCSS : {}}
              onClick={() => setOption(false)}
            >
              User
            </p>
          </div>
          <form onSubmit={onFormSubmit}>
            <p className="heading">Reset your password</p>
            <div className="field-container margin">
              <input
                type="email"
                id="email"
                placeholder="Email"
                style={error.email ? { border: "1px solid red" } : {}}
                required
                onChange={(e) => {
                  setLoginUser((ex) => ({ ...ex, email: e.target.value }));
                  setError((ex) => ({ ...ex, email: "" }));
                }}
              />
            </div>
            {error.email && <span className="error">*{error.email}</span>}
            <div className="field-container">
              <input
                type="password"
                id="password"
                placeholder="Password"
                minLength={8}
                style={error.password ? { border: "1px solid red" } : {}}
                required
                onChange={(e) => {
                  setLoginUser((ex) => ({ ...ex, password: e.target.value }));
                  setError((ex) => ({ ...ex, password: "" }));
                }}
              />
            </div>
            {error.password && <span className="error">*{error.password}</span>}
            <div className="field-container">
              <input
                type="password"
                id="confirmpassword"
                placeholder="Confirm password"
                minLength={8}
                style={error.password ? { border: "1px solid red" } : {}}
                required
                onChange={(e) => {
                  setLoginUser((ex) => ({
                    ...ex,
                    confirmPassword: e.target.value,
                  }));
                  setError((ex) => ({ ...ex, password: "" }));
                }}
              />
            </div>
            <div className="btn-link-container margin">
              <p className="createLink" onClick={() => setIsreset(true)}>
                Sign In
              </p>
              <button type="submit">
                {boo ? "NEXT" : <span className="loader"></span>}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="signin-form-container">
          <form onSubmit={onPasswordResetSubmit}>
            <p className="heading">Reset your password</p>
            <div className="field-container margin">
              <input
                type="password"
                id="password"
                placeholder="New password"
                minLength={8}
                style={error.password ? { border: "1px solid red" } : {}}
                required
                onChange={(e) => {
                  setLoginUser((ex) => ({ ...ex, password: e.target.value }));
                  setError((ex) => ({ ...ex, password: "" }));
                }}
              />
            </div>
            {error.password && <span className="error">*{error.password}</span>}
            <div className="field-container margin">
              <input
                type="password"
                id="confirmpassword"
                placeholder="Confirm password"
                minLength={8}
                style={error.password ? { border: "1px solid red" } : {}}
                required
                onChange={(e) => {
                  setLoginUser((ex) => ({
                    ...ex,
                    confirmPassword: e.target.value,
                  }));
                  setError((ex) => ({ ...ex, password: "" }));
                }}
              />
            </div>
            <div className="btn-link-container margin">
              <p className="createLink" onClick={() => setIsreset(true)}>
                Sign In
              </p>
              <button type="submit">
                {boo ? "SAVE" : <span className="loader"></span>}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
