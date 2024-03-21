import axios from "axios";
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearErrors,
  myOrdersRequest,
  myOrdersSuccess,
  myOrdersFail,
  clearErrors2,
  orderDetailsRequest,
  orderDetailssSuccess,
  orderDetailsFail,
  clearErrors3,
  adminAllOrdersRequest,
  adminAllOrdersSuccess,
  adminAllOrdersFail,
  adminOrdersClearError,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderSuccess,
  updateOrderFail,
  updateOrderRequest,
} from "../reducers/orderReducer";

//create new order
export const createNewOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/ecommerce/v1/order/new`,
      order,
      config
    );
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};
export const clearError = () => (dispatch) => {
  dispatch(clearErrors());
};
// get All orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch(myOrdersRequest());
    const { data } = await axios.get(`/api/ecommerce/v1/orders/me`);
    dispatch(myOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(myOrdersFail(error.response.data.message));
  }
};
export const clearError2 = () => (dispatch) => {
  dispatch(clearErrors2());
};
// Get Single Order Detail
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailsRequest());
    const { data } = await axios.get(`/api/ecommerce/v1/order/${id}`);
    dispatch(orderDetailssSuccess(data.order));
  } catch (error) {
    dispatch(orderDetailsFail(error.response.data.message));
  }
};

export const clearError3 = () => (dispatch) => {
  dispatch(clearErrors3());
};
// Get All Orders only Asmin can Access
export const adminOrders = () => async (dispatch) => {
  try {
    dispatch(adminAllOrdersRequest());
    const { data } = await axios.get("/api/ecommerce/v1/admin/orders");
    dispatch(adminAllOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(adminAllOrdersFail(error.response.data.message));
  }
};

export const adminOrdersClear = () => (dispatch) => {
  dispatch(adminOrdersClearError());
};

// Delete the Order Only Admin can Access
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    const { data } = await axios.delete(`/api/ecommerce/v1/admin/order/${id}`);
    dispatch(deleteOrderSuccess(data.success));
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};
// Update the Order Status
export const updateOrder = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/ecommerce/v1/admin/order/${id}`,
      productData,
      config
    );
    dispatch(updateOrderSuccess(data.success));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};
// Update the Order Only Admin can Access
