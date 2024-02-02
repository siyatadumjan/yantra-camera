import {
  Banner,
  DiscountArea,
  Footer,
  HomeBanner,
  Products,
  ProtectedArea,
} from "../../components";

const Home = () => (
  <div style={{ marginTop: "5rem" }}>
    <Banner />
    <HomeBanner />
    <ProtectedArea />
    <Products />
    {/*<DiscountArea />*/}


    <Footer />
  </div>
);

export default Home;
