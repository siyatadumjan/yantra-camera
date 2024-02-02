import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { ProductRating } from "../../../components";
import { addItemsToCart } from "../../../redux/actions/cartActions";

const SingleItem = ({ product }) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const addOrNot = cartItems?.find((item) => item.product === product.id);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(product?.id, 1, addToast));
  };

  return (
      <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 1 }}
          className="products__container__item"
      >
        <Link to={`/product/${product.id}`}>
          {/* Use product.image instead of product?.images?.url */}
          <img width={450} src={'data:image/jpg;base64,'+ product.image} alt="" />
        </Link>
        <div>
          <Link to={`/product/${product.id}`}>
            <h3>{product.itemName}</h3>
          </Link>
          <h5>Rs.{product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</h5>
          <p>Items in Stock: {product.availableQuantity}</p>
          {/*<ProductRating ratingValue={product.price} />*/}
          <div>
            {/* Use product.availableQuantity instead of product?.Stock */}
            {product.availableQuantity && product.availableQuantity > 0 ? (
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

export default SingleItem;
