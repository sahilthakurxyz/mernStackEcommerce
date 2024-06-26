import React from "react";
import styles from "./Payment.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const OrderSuccess = () => {
  return (
    <div className={styles["order-main-container"]}>
      <div>
        <FaCheckCircle />
        <p>
          Your order has been successfully placed! Thank you for shopping with
          us.
        </p>
        <Link to="/orders">
          <button>View Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
