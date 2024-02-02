import { motion } from "framer-motion";
import { useToasts } from "react-toast-notifications";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../../redux/actions/cartActions";
import ProductRating from "../../ProductRating/ProductRating";

const SingleProduct = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { addToast } = useToasts();
  const addOrNot = cartItems?.find((item) => item.product === product._id);
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addItemsToCart(product?._id, 1, addToast));
  };
  return (
    <motion.div
      // whileInView={{ opacity: [0, 1] }}
      // transition={{ duration: 1 }}
      className="products__container__item"
    >
      <Link to={`/product/${product.id}`}>
        <img width={450} src={'data:image/jpg;base64,'+ product.image} alt="" />
      </Link>
      <div>
        <Link to={`/product/${product.id}`}>
          <h3>{product.itemName}</h3>
        </Link>
        <h5>Rs. {product.price}</h5>
        {/*<ProductRating ratingValue={product.price} />*/}
        <div>
          {product?.Stock && product?.Stock > 0 ? (
            <button
              className="button"
              disabled={addOrNot?.quantity > 0}
              onClick={addToCartHandler}
            >
              <FiShoppingCart />
              {addOrNot?.quantity > 0 ? "Added" : "Buy Now"}
            </button>
          ) : (
            <button disabled className="button">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SingleProduct;
