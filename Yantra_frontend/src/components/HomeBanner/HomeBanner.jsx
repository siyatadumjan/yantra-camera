import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomeBanner = () => (
  <section className="section homeBanner container-div">
    <motion.div className="homeBanner__container grid">
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="homeBanner__container__left"
      >
        <div className="homeBanner__container__left__overlay"></div>
        <div>

          <h1>Click, Capture, Create: Unleash Your Imagination.</h1>
          <Link to="/shop">
            <button className="button">Shop Now</button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="homeBanner__container__left right"
      >
        <div className="homeBanner__container__left__overlay"></div>
        <div>

          <h1>See the World Through Our Lens Collection</h1>
          <Link to="/shop">
            <button className="button">Shop Now</button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default HomeBanner;
