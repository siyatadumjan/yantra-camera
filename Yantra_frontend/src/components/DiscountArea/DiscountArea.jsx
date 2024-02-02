import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DiscountArea = () => (
  <motion.div className="discount-section">
    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className="discount"
    >
      <div className="discount__overlay"></div>
      <div className="discount__content container-div">

        <h2>Discount For All Orders Over 15000</h2>

        <Link to="/shop">
          <button className="button">Shop Now</button>
        </Link>
      </div>
    </motion.div>

  </motion.div>
);

export default DiscountArea;