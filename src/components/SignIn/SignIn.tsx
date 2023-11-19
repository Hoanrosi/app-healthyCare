import React, { useState } from "react";
import backgroundFirst from "../image/background-2.png";
import backgroundSecond from "../image/background-1.png";
import icon_email from "../image/Message.png";
import icon_look from "../image/Lock.png";
import icon_Show from "../image/Show.png";
import icon_google from "../image/google.png";
import icon_facebook from "../image/Facebook.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./sign-in.scss";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/signin", { email, password })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          localStorage.setItem("authToken", result.data.authToken);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="sign-in-layout">
      <div className="sign-in-header">
        <div className="sign-in-image">
          <img src={backgroundFirst} className="image-background-first" />
          <img src={backgroundSecond} className="image-background-second" />
        </div>
      </div>
      <div className="sign-in-form">
        <div className="sign-in-form-heading">Sign in</div>
        <div className="sign-in-form-description">Welcome back</div>
        <form className="sign-in-form-info" onSubmit={onSubmit}>
          <div className="sign-in-form-item">
            <div className="form-item-suffix">
              <img src={icon_email} className="icon-form" />
            </div>
            <input
              type="email"
              className="form-input"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="sign-in-form-item">
            <div className="form-item-suffix">
              <img src={icon_look} className="icon-form" />
            </div>

            {!showPassword ? (
              <input
                type="password"
                className="form-input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="form-input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
            <img
              src={icon_Show}
              className="icon-form"
              onClick={handleShowPassword}
            />
          </div>

          <div className="forgot-password-des">Forgot Password?</div>

          <button className="sign-in-form-btn">
            <div className="sign-in-form-btn-text">Sign in</div>
          </button>
        </form>

        <div className="sign-in-footer">
          <div className="sign-in-footer-choose">
            <div className="sign-in-footer-choose-title">OR</div>
          </div>
          <div className="sign-in-social-network">
            <div className="sign-in-social-icon">
              <img src={icon_google} className="icon-google" />
            </div>
            <div className="sign-in-social-title">Login with Gmai</div>
          </div>
          <div className="sign-in-social-network">
            <div className="sign-in-social-icon">
              <img src={icon_facebook} className="icon-facebook" />
            </div>
            <div className="sign-in-social-title">Login with Facebook</div>
          </div>

          <div className="new-user">
            <div className="title">
              New member?{" "}
              <Link to="sign-up" className="title-sign-up">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
