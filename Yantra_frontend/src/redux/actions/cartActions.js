import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";

// Add to Cart
export const addItemsToCart =
    (id, quantity, addToast) => async (dispatch, getState) => {
      try {
        const { data } = await axios.get(
            `http://localhost:8080/product/getById/${id}`
        );

        dispatch({
          type: ADD_TO_CART,
          payload: {
            id: data.id,
            description: data.description,
            itemName: data.name,
            price: data.price,
            image: data.image,
            availableQuantity: data.Stock,
            quantity,
          },
        });

        if (addToast) {
          addToast("Added To Cart", { appearance: "success", autoDismiss: true });
        }

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );

      } catch (error) {
        addToast(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            { appearance: "error", autoDismiss: true }
        );
      }
    };

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
