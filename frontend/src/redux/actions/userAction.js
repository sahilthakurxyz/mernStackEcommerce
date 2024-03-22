import {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  clearErrors,
  logoutSuccess,
  logoutFail,
  // Admin
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  updateUserRequest,
  deleteUserRequest,
  updateUserSuccess,
  deleteUserSuccess,
  updateUserFail,
  deleteUserFail,
} from "../reducers/UserReducer";
import {
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updateClearError,
  forgetPasswordRequest,
  forgetPasswordFail,
  forgetPasswordSuccess,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} from "../reducers/ProfileReducer";
import axios from "axios";
import { BACKEND_URL_PROD } from "../../constants";
// login User
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/loginuser`,
      { email, password },
      config
    );
    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};
// Register the user

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/register`,
      userData,
      config
    );
    dispatch(registerSuccess(data.user));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};
// get user if user is login
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/profile`
    );
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};
// logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${BACKEND_URL_PROD}/api/ecommerce/v1/logoutuser`);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/profile/update`,
      userData,
      config
    );

    dispatch(updateProfileSuccess(data.success));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};
// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/password/update`,
      passwords,
      config
    );

    dispatch(updatePasswordSuccess(data.success));
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};
// Clear Error for Update
export const updateClearErrors = () => async (dispatch) => {
  dispatch(updateClearError());
};
// Clear Errors for User
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};

//  Forget Password Actions

export const forgetPassword = (email) => async (dispatch) => {
  // console.log("FormData Entries:", Array.from(email.entries()));
  try {
    dispatch(forgetPasswordRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/password/forgot`,
      email,
      config
    );

    dispatch(forgetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgetPasswordFail(error.response.data.message));
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  // console.log("FormData Entries:", Array.from(passwords.entries()));
  try {
    dispatch(resetPasswordRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/reset/password/${token}`,
      passwords,
      config
    );

    dispatch(resetPasswordSuccess(data.success));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};

// Get All Users in Database Only Admin Can  Access

export const adminAllUsersAction = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());
    const { data } = await axios.get(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/admin/users`
    );
    dispatch(getAllUsersSuccess(data.users));
  } catch (error) {
    dispatch(getAllUsersFail(error.response.data.message));
  }
};
// get User Details Only Admin Can Acess
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(userDetailsRequest());
    const { data } = await axios.get(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/admin/user/${id}`
    );
    dispatch(userDetailsSuccess(data.user));
  } catch (error) {
    dispatch(userDetailsFail(error.response.data.message));
  }
};
// Update User Only Admin can Access
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/admin/user/${id}`,
      userData,
      config
    );
    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(updateUserFail(error.response.data.message));
  }
};
// Delete User  Only Admin Can Access
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    const { data } = await axios.delete(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/admin/user/${id}`
    );
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};
