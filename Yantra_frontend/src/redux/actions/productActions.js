// productActions.js

import axios from "axios";
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_BY_ID_REQUEST,
  PRODUCT_BY_ID_SUCCESS,
  PRODUCT_BY_ID_FAIL,
  ALL_PRODUCTS_LOADING,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
} from "../constants/productConstants";

export const createProduct = (product, navigate, addToast) => async (dispatch, getState) => {
  const token = getState().userLogin?.userInfo?.access_token;
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.post(
        "http://localhost:8080/product/save", // Update the endpoint
        product,
        config
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    addToast(data?.message, {
      appearance: "success",
      autoDismiss: true,
    });

    navigate("/shop");
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    });
  }
};

export const updateProduct = (product, id, addToast) => async (dispatch, getState) => {
  const token = getState().userLogin?.userInfo?.access_token;
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.put(
        `http://localhost:8080/product/update`, // Update the endpoint
        product,
        config
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    addToast(data?.message, {
      appearance: "success",
      autoDismiss: true,
    });

    dispatch({
      type: CREATE_PRODUCT_RESET,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    });
  }
};

export const deleteProduct = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.delete(
        `http://localhost:8080/product/delete/${id}`, // Update the endpoint
        config
    );

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_BY_ID_REQUEST,
    });

    const { data } = await axios.get(
        `http://localhost:8080/product/getById/${id}` // Update the endpoint
    );

    dispatch({
      type: PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_BY_ID_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    });
  }
};

export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_LOADING });

    const { data } = await axios.get(
        "http://localhost:8080/product/getAll"
    );

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    });
  }
};
