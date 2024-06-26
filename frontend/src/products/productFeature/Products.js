import React, { Fragment, useEffect, useState } from "react";
import styles from "./Products.module.css";
import Loader from "../../components/layout/Loader.js";
import SearchProducts from "../filterProducts/SearchProducts.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {
  clearAllErrors,
  getProducts,
} from "../../redux/actions/productAction.js";
import NoProductMessage from "../filterProducts/NoProductMessage.js";
import MetaData from "../../components/layout/MetaData.js";
import ScreenVisual from "../../ScreenVisual.js";

const Products = () => {
  const { keyword } = useParams();
  const [ratings, setRatings] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 600000]);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, error, productsPerPage, filterProductsCount } =
    useSelector((state) => state.products);
  const handlePageChange = (page) => {
    console.log(page, "pages");
    console.log(typeof page);
    setCurrentPage(page);
  };
  const handlePriceChangeCommitted = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);

      dispatch(clearAllErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [
    dispatch,
    keyword,
    currentPage,
    error,
    alert,
    price,
    filterProductsCount,
    category,
    ratings,
  ]);
  const categoryArray = [
    "Phone",
    "Laptop",
    "Footwear",
    "Backpack",
    "Headphones",
    "Jeans",
  ];
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles["products-main-container"]}>
          <ScreenVisual />
          <MetaData title="Get Ready to Shop the Coolest Stuff!" />
          <div className={styles["product-details-container"]}>
            <div className={styles["products-left-conatainer"]}>
              <div className={styles["heading-filter"]}>Filters</div>
              <div className={styles["filter-container"]}>
                <Typography>price</Typography>
                <Slider
                  value={price}
                  // onChange={handlePriceChange}
                  min={0}
                  max={600000}
                  aria-labelledby="range-slider"
                  className={styles["slider-main"]}
                  valueLabelDisplay="auto"
                  onChangeCommitted={handlePriceChangeCommitted}
                />
                <Typography>Category</Typography>
                <ul className={styles["category-container"]}>
                  {categoryArray.map((category) => (
                    <li
                      key={category}
                      className={styles["category-link"]}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <fieldset>
                  <Typography component="legend">Rating Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => setRatings(newRating)}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>
            </div>
            <div className={styles["products-center-container"]}>
              <h3 className={styles["result-heading"]}>Results</h3>
              <div className={styles["products-details-search-result"]}>
                {products.length === 0 ? (
                  <NoProductMessage result={keyword} />
                ) : (
                  products.map((product) => (
                    <SearchProducts key={product._id} product={product} />
                  ))
                )}
              </div>

              {filterProductsCount > productsPerPage && (
                <div className={styles["pagination-container"]}>
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={productsPerPage}
                    totalItemsCount={filterProductsCount}
                    onChange={handlePageChange}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    // hideFirstLastPages={true}
                    hideDisabled={true} //hide  based on where currenty you are
                    itemClass={styles.page_item}
                    linkClass={styles.page_link}
                    activeClass={styles.pageItemActive}
                    activeLinkClass={styles.pageLinkActive}
                  />
                </div>
              )}
            </div>
            {/* <div className={styles["products-right-container"]}>sub-stotal</div> */}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Products;
