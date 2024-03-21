import React, { useRef, useEffect } from "react";
import styles from "./OpenUserProfile.module.css";
import { GoSignIn } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
const OpenUserProfile = ({ onClose, user, isAuthenticated }) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const alert = useAlert();
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  const handleLogOut = () => {
    if (!user) {
      alert.error("You're not logged In");
      return;
    }
    dispatch(logout());
    alert.success("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/account");
      onClose();
    } else {
      navigate("/login");
    }
  };
  return (
    <div className={styles["open"]} ref={containerRef}>
      <div className={styles["close-container"]} onClick={onClose}></div>
      <div className={styles["manage-account-container"]}>
        <span className={styles["close-icon"]} onClick={onClose}>
          &#10006;
        </span>
        {isAuthenticated ? (
          <div className={styles["user-container"]}>
            {user && user.avatar && user.avatar.url ? (
              <img src={user.avatar.url} alt="user-profile" />
            ) : (
              <img src={"userprofile.png"} alt="user-profile" />
            )}
            <div className={styles["user-details"]}>
              <p>{user && user.name}</p>
              <p>{user && user.email}</p>
            </div>
          </div>
        ) : (
          <div className={styles["user-container"]}>
            <img src={"userprofile.png"} alt="user-profile" />
            <div className={styles["user-details"]}>
              <p>Sign in</p>
            </div>
          </div>
        )}
        <div className={styles["account-container"]}>
          <div className={styles["account-feature-container"]}>
            <div onClick={handleLogin}>
              <IoIosLogOut />

              <p>Log In</p>
            </div>
            <div onClick={handleLogOut}>
              <GoSignIn />
              <p>Sign out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenUserProfile;
