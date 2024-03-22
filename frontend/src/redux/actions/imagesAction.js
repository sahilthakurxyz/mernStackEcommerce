import { BACKEND_URL, BACKEND_URL_PROD } from "../../constants";
import {
  imageRequest,
  imageSuccess,
  imageFail,
  getImageRequest,
  getImageSuccess,
  getImageFail,
} from "../reducers/imagesReducer";
import axios from "axios";
export const getImages = () => async (dispatch) => {
  try {
    dispatch(getImageRequest());
    const { data } = await axios.get(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/background/images`
    );
    dispatch(getImageSuccess(data.images));
  } catch (error) {
    dispatch(getImageFail(error.response.data.message));
  }
};
export const createImages = (imageData) => async (dispatch) => {
  try {
    dispatch(imageRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${BACKEND_URL_PROD}/api/ecommerce/v1/admin/background/images/create/new`,
      imageData,
      config
    );
    dispatch(imageSuccess(data));
  } catch (error) {
    dispatch(imageFail(error.response.data.message));
  }
};
