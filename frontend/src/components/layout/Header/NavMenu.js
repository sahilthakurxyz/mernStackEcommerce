import React, { useState } from "react";
import styles from "./NavMenu.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import UserProfile from "./UserProfile.js";
import { useSelector } from "react-redux";
import { RiProductHuntLine } from "react-icons/ri";
const NavMenu = () => {
  const [keyword, setKeyword] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles.navmenu_container}>
        <div className={styles.navmanu_products}>
          <div className={styles.navmenu_sameClass_name}>
            <Link to="/products">
              <div className={styles["products-menu"]}>
                <RiProductHuntLine />
                <p>roducts</p>
              </div>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmitSearch} className={styles.navmenu_search}>
          <div className={styles.search_container}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className={styles.search_button}>
              <FaSearch className={styles.search_icon} />
            </button>
          </div>
        </form>

        <Link style={{ textDecoration: "none" }} to="/Cart">
          <div className={styles.navmenu_cart}>
            <div className={styles.navmenu_sameClass_name}>
              <MdOutlineLocalGroceryStore />
            </div>
            <p className={styles["navmenu-cart-title"]}>{cartItems.length}</p>
          </div>
        </Link>
        <div className={styles.account_dropdown}>
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
